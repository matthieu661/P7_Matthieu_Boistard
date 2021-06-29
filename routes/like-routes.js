const express = require('express');
const router = express.Router();

const userLiked = require('../controllers/Like/like');
const userDisliked = require('../controllers/Like/dislike');

//like
router.post('/:id/like', userLiked.like );
router.post('/:id/dislike', userDisliked.dislike);






module.exports = router;