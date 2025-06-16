import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    const blogImageLocalPath = req.files?.blogImage?.[0]?.path;

    const blogImage = await uploadOnCloudinary(blogImageLocalPath);

    const author = req.user._id;

    const newBlog = await Blog.create({
      title,
      content,
      blogImage: blogImage?.url || "",
      category,
      author,
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

const editBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const blogId = req.params.id;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imageUrl = existingBlog.blogImage;

    const blogImageLocalPath = req.files?.blogImage?.[0]?.path;
    if (blogImageLocalPath) {
      const blogImage = await uploadOnCloudinary(blogImageLocalPath);
      imageUrl = blogImage?.url || imageUrl;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        blogImage: imageUrl,
        category,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author").sort({ createdAt: -1 });
    res.status(200).json({
      message: "Blogs fetched successfully",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ author: userId })
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "User blogs fetched successfully",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user blogs", error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("author");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

export {
  createBlog,
  editBlog,
  getAllBlogs,
  getUserBlogs,
  getBlogById,
  deleteBlog,
};
