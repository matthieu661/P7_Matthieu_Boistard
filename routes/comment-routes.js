const express = require('express');
const router = express.Router();

const createComment = require('../controllers/Comment/createCommentCTRL');
const deleteComment = require('../controllers/Comment/deleteCommentCTRL');
const modifyComment = require('../controllers/Comment/modifyCommentCTRL');


router.post('/createComment/:idPost', createComment.createCom );

router.delete('/deleteComment/:idComment', deleteComment.deleteCom);

router.put('/modifyComment/:idComment', modifyComment.modifyCom);

module.exports = router;