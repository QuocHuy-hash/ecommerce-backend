
const express = require('express');
const router = express.Router();
const CommentController = require('../../controllers/comment/comment.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.get('/list', asyncHandle(CommentController.getCommentByParentId));
router.use(authentication)
router.post('/create', asyncHandle(CommentController.createComment));
router.delete('/delete', asyncHandle(CommentController.deleteComment));
module.exports = router;