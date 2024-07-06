const Blog = require('../models/Blog');
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const comment = await Comment.create({
      content: req.body.content,
      BlogId: blog.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};