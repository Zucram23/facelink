const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Post routes
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.put('/:post_id/like', postController.likePost);
router.delete('/:post_id', postController.deletePost);

// Aggregation routes
router.get('/aggregation/most-liked', postController.getMostLikedPosts);
router.get('/aggregation/users-most-posts', postController.getUsersWithMostPosts);

module.exports = router;