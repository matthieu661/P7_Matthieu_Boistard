const express = require('express');
const router = express.Router();

const userLiked = require('../controllers/Like/like');
const userDisliked = require('../controllers/Like/dislike');

//like
router.post('/:id/like', userLiked.like );






module.exports = router;