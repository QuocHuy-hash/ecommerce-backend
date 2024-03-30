const { Comment, sequelize } = require('../models');
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { Op } = require('sequelize');

/**
 * features : Comment Service
 *  1. add comments 
 *  2. get list of comment [All Rule]
 *  3. delete a comment  
 */

const createComment = async (userId, body) => {
    const { productId, content, parentCommentId = null } = body;
    if (!productId) {
        throw new BadRequestError('productId is required');
    }
    const comment = new Comment({
        comment_productId: productId,
        comment_userId: userId,
        comment_content: content,
        comment_parentId: parentCommentId,
    });
    if (!comment.comment_content) throw new BadRequestError('comment content is not emty')
    let rightValue;
    if (parentCommentId) {

        //reply comment
        const parentComment = await Comment.findOne({ where: { id: parentCommentId } });
        if (!parentComment) throw new NotFoundError('not found parent comment ');

        // Lấy giá trị right của parent comment
        rightValue = parentComment.comment_right;

        // Cập nhật các comment nằm phía bên phải của parent comment
        await sequelize.transaction(async (t) => {
            await Comment.update({
                comment_right: sequelize.literal('comment_right + 2')
            }, {
                where: {
                    comment_productId: productId,
                    comment_right: { [Op.gte]: rightValue }
                },
                transaction: t
            });

            await Comment.update({
                comment_left: sequelize.literal('comment_right + 2')
            }, {
                where: {
                    comment_productId: productId,
                    comment_left: { [Op.gt]: rightValue }
                },
                transaction: t
            });
        });



    } else {

        const maxRightComment = await Comment.findOne({
            where: { comment_productId: productId },
            order: [['comment_right', 'DESC']]
        });
        if (maxRightComment) {
            rightValue = maxRightComment.comment_right + 1;
        } else {
            rightValue = 1;

        }
    }

    //add comment into db
    comment.comment_right = parseInt(rightValue) + 1;
    comment.comment_left = parseInt(rightValue);
    return await comment.save();

}
const getCommentByParentId = async (body) => {
    const { productId, parentCommentId, limit = 10, offset = 0 } = body;
    try {

        if (parentCommentId) {
            const parent = await Comment.findOne({ where: { id: parentCommentId } });
            if (!parent) throw new NotFoundError('not found comments for product')
            console.log("parent ::", parent);
            const comments = await Comment.findAll({
                where: {
                    comment_productId: productId,
                    comment_left: { [Op.gt]: parent.comment_left },
                    comment_right: { [Op.lt]: parent.comment_right }
                },
                attributes: ['id', 'comment_left', 'comment_right', 'comment_content', 'comment_parentId'],
                order: [['comment_left', 'ASC']],
                limit,
                offset
            });
            return comments;
        }
        const comment = await Comment.findAll({
            where: {
                comment_productId: productId,
                comment_parentId: null,
            },
            attributes: ['id', 'comment_left', 'comment_right', 'comment_content', 'comment_parentId'],
            order: [['comment_left', 'ASC']],
            limit,
            offset

        })
        return comment
    } catch (error) {
        console.log("error:: ", error);
    }
}

const deleteComment = async (body, userId) => {
    const { productId, commentId } = body;
    console.log({ productId, commentId });
    const comment = await Comment.findOne({ where: { comment_userId: userId, id: commentId } });
    if (!comment) throw new NotFoundError(`not found Comment with id ${commentId} and userID ${userId}`);
    //1 : get left and right values
    const rightValue = comment.comment_right;
    const leftValue = comment.comment_left;
    //2: set width value
    const width = rightValue - leftValue + 1;
    //3. delete all comment in parent comment
    await sequelize.transaction(async (t) => {
        await Comment.destroy({
            where: {
                comment_productId: productId,
                comment_right: { [Op.gte]: leftValue, [Op.lte]: rightValue }
            }
        });
        //4: update value left and right in dbs
        await Comment.update({
            comment_right: sequelize.literal(`comment_right - ${width}`),
        }, {
            where: {
                comment_productId: productId,
                comment_right: { [Op.gte]: rightValue }
            },
            transaction: t
        });
        await Comment.update({
            comment_left: sequelize.literal(`comment_left - ${width}`),
        }, {
            where: {
                comment_productId: productId,
                comment_left: { [Op.gte]: rightValue }
            },
            transaction: t
        });

    });

}
module.exports = {
    createComment,
    getCommentByParentId,
    deleteComment
}