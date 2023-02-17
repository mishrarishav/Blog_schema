const Blog = require('../models/Blog');
const fs = require('fs');

exports.createBlog = (req, res) => {
  const { title, slug, authorName, authorDescription, content } = req.body;

  Blog.findOne({ slug }).then((blog) => {
    if (blog) {
      return res.status(400).json({ message: 'Slug already exists' });
    }

    const newBlog = new Blog({
      title,
      slug,
      coverImage: req.file.filename,
      authorName,
      authorDescription,
      content,
    });

    newBlog.save().then((blog) => {
      res.status(201).json(blog);
    }).catch((err) => {
      fs.unlinkSync(`public/uploads/${req.file.filename}`);
      res.status(500).json({ message: err.message });
    });
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

exports.getBlogBySlug = (req, res) => {
  const { slug } = req.params;

  Blog.findOne({ slug }).then((blog) => {
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

exports.updateBlogBySlug = (req, res) => {
  const { slug } = req.params;

  Blog.findOneAndUpdate({ slug }, req.body, { new: true }).then((blog) => {
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

exports.deleteBlogBySlug = (req, res) => {
  const { slug } = req.params;

  Blog.findOneAndDelete({ slug }).then((blog) => {
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    fs.unlinkSync(`public/uploads/${blog.coverImage}`);
    res.json(blog);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

exports.getAllBlogs = (req, res) => {
  Blog.find().then((blogs) => {
    res.json(blogs);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};
