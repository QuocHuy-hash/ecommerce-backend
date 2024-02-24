'use strict';
const { Model, DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize) => {
    class Comment extends Model {
        static associate(models) {

        }
    }
    Comment.init({
        comment_productId: { type: DataTypes.INTEGER },
        comment_userId: { type: DataTypes.INTEGER },
        comment_content: { type: DataTypes.STRING },
        comment_left: { type: DataTypes.NUMBER, defaultValue: 0 },
        comment_right: { type: DataTypes.NUMBER, defaultValue: 0 },
        comment_parentId: { type: DataTypes.INTEGER },
        isDelete: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        sequelize,
        modelName: 'Comment',
    });

    return Comment;
};
