const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');
const commentController = require('../controllers/commentController');

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.post('/:blogId/comments', commentController.createComment);

module.exports = router;