import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaPlus, FaRegComment, FaRegHeart } from "react-icons/fa6";
import Navbar from "../components/navbar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ViewBlog = () => {
  const navigate = useNavigate();
  const blogId = localStorage.getItem("userblog-id");
  const [blog, setBlog] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [blogImage, setBlogImage] = useState(null);
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [likes, setLikes] = useState(null);

  const handleEdit = async () => {
    if (!blog.title || !blog.content || !blog.category) {
      alert("Please fill in all fields before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("category", blog.category);
    if (blogImageFile) {
      formData.append("blogImage", blogImageFile);
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/blog/editBlog/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Blog published successfully:", res.data);
      alert("Blog updated successfully!");
      setIsEdit(!isEdit);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/blog/deleteBlog/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );

      console.log("Blog deleted successfully:", res.data);
      alert("Blog deleted successfully!");
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/blog/getBlogById/${blogId}`
        );
        setBlog(res.data.blog);
        setBlogImage(res.data.blog.blogImage);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();

    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/like/getAllLikes/${blogId}`
        );
        setLikes(res.data.count);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [isEdit]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [blog?.title, blog?.content]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-[60%] mt-2">
          {isEdit ? (
            <div className="flex gap-2">
              <select
                value={blog?.category}
                onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                className="p-1 rounded-lg bg-gray-100 cursor-pointer"
              >
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
              </select>
              <button
                className="bg-green-300 hover:bg-green-400 h-50px"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="bg-red-300 hover:bg-red-400 h-50px"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="bg-green-300 hover:bg-green-400 h-50px"
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </button>
              <button
                className="bg-red-300 hover:bg-red-400 h-50px"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="w-[60%] mt-2 bg-gray-50">
          <textarea
            ref={titleRef}
            type="text"
            placeholder="Title"
            value={blog?.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            disabled={!isEdit}
            className="bg-gray-50 w-full h-fit mt-2 p-4 text-5xl font-semibold rounded-t-lg outline-none resize-none"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <div className="p-2 my-2 bg-gray-50">
            <p className="text-lg text-gray-700 mb-2">
              {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <hr />
            <div className="flex justify-between items-center text-2xl p-3">
              <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <FaHeart className="cursor-pointer text-red-500 hover:text-red-700" />
                  <p className="text-lg">{likes}</p>
                </div>
                <FaRegComment className="cursor-pointer text-gray-700 hover:text-black" />
              </div>
            </div>
            <hr />
          </div>
          <div className="p-2 mt-4">
            {blogImage ? (
              <div className=" relative flex flex-col items-center">
                {isEdit && (
                  <button
                    onClick={() => setBlogImage(null)}
                    className="absolute top-1 right-2 text-red-300 rounded-full w-[10px] h-[10px] flex items-center justify-center hover:text-red-500 z-10"
                  >
                    ✖
                  </button>
                )}
                <img
                  src={blogImage}
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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setBlogImage(URL.createObjectURL(file));
                      setBlogImageFile(file);
                    }
                  }}
                />
              </div>
            )}
            <textarea
              ref={contentRef}
              name="content"
              disabled={!isEdit}
              placeholder="Write your blog content here..."
              value={blog?.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="bg-gray-50 w-full mt-4 p-4 text-lg rounded-b-lg outline-none text-justify"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
