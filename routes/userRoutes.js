const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const {validateUser} = require("../validators/userValidator");
const {validatePost} = require("../validators/postValidator");

router.post('/', validateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/posts', userController.getUserPosts);


router.post('/:id/posts', validatePost, postController.createPost);

module.exports = router;