const Blog = require('../models/Blog');
const Comment = require('../models/comment');

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: Comment, attributes: ['id', 'content'] }]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};