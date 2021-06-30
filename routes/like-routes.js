const express = require('express');
const router = express.Router();

const userLiked = require('../controllers/Like/like');
const userDisliked = require('../controllers/Like/dislike');
// Authentification
const Auth = require('../utils/jwt.utils');
//like
router.post('/:id/like', Auth.authRoutes, userLiked.like );
router.post('/:id/dislike', Auth.authRoutes, userDisliked.dislike);






module.exports = router;