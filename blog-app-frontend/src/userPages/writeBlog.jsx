import React, { useState } from "react";
import Navbar from "../components/navbar";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const navigate = useNavigate();
  const [blogImage, setBlogImage] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handlePublish = async () => {
    if (!blog.title || !blog.content || !blog.category) {
      alert("Please fill in all fields before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("category", blog.category);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/blog/createBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Blog published successfully:", res.data);
      console.log("Blog published successfully:", {
        title: blog.title,
        content: blog.content,
        category: blog.category,
        blogImage: blogImage ? URL.createObjectURL(blogImage) : null,
      });
      alert("Blog published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-2">
        <div className="flex justify-end p-1 w-[800px] gap-2">
          <select
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
            className="p-1 rounded-lg bg-gray-100 cursor-pointer"
          >
            <option value="">Category</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
            <option value="culture">Culture</option>
            <option value="tourism">Tourism</option>
          </select>
          <button
            className="bg-green-400 hover:bg-green-500 hover:border-green-700 h-[30px] w-[70px] text-xl flex justify-center items-center "
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-2 mb-10">
        <textarea
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="bg-gray-100 w-[800px] resize-none text-5xl font-semibold p-2 rounded-t-lg outline-none overflow-hidden leading-tight"
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <div className="bg-gray-100 w-[800px] min-h-[40px] text-xl p-2">
          {blogImage ? (
            <div className=" relative flex flex-col items-center">
              <button
                onClick={() => setBlogImage(null)}
                className="absolute top-1 right-2 text-red-300 rounded-full w-[10px] h-[10px] flex items-center justify-center hover:text-red-500 z-10"
              >
                ✖
              </button>
              <img
                src={URL.createObjectURL(blogImage)}
                alt="Blog"
                className="w-full h-[300px] mr-2 object-contain"
              />
            </div>
          ) : (
            <div className="w-[40px] h-[40px] flex items-center">
              <label
                htmlFor="blog-image"
                className=" text-white text-lg border-1 border-gray-500 font-bold w-[25px] h-[25px] flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200"
              >
                <FaPlus className="text-gray-500" />
              </label>
              <input
                id="blog-image"
                type="file"
                className="hidden"
                onChange={(e) => setBlogImage(e.target.files[0])}
              />
            </div>
          )}
        </div>
        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          className="bg-gray-100 w-[800px] min-h-[400px] text-base p-2 rounded-b-lg outline-none"
        />
      </div>
    </>
  );
};

export default WriteBlog;
