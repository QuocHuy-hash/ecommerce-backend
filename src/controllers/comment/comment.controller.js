// controllers/OrdersController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { createComment, getCommentByParentId, deleteComment } = require("../../services/comment.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class CommentController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }

    createComment = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'create new Comment successfully',
            metadata: await createComment(this.userId, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    deleteComment = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'delete Comment successfully',
            metadata: await deleteComment(req.body, this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    getCommentByParentId = async (req, res, next) => {
        new SuccessResponse({
            message: 'getCommentByParentId successfully',
            metadata: await getCommentByParentId(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}
module.exports = new CommentController();