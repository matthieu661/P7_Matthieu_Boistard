const express = require('express');
const router = express.Router();

const createComment = require('../controllers/Comment/createCommentCTRL');
const deleteComment = require('../controllers/Comment/deleteCommentCTRL');
const modifyComment = require('../controllers/Comment/modifyCommentCTRL');
// Authentification
const Auth = require('../utils/jwt.utils');


router.post('/createComment/:idPost', Auth.authRoutes, createComment.createCom );

router.delete('/deleteComment/:idComment', Auth.authRoutes, deleteComment.deleteCom);

router.put('/modifyComment/:idComment', Auth.authRoutes, modifyComment.modifyCom);

module.exports = router;