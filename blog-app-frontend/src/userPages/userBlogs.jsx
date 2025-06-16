import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleViewBlog = (blogId) => {
    localStorage.setItem("userblog-id", blogId);
    navigate("/my-blog");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/blog/getUserBlogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
            },
          }
        );
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[70%] p-6">
          <p className="font-semibold text-3xl p-4">My Blogs</p>
          <hr />
          <div className="space-y-6 mt-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition flex gap-6 items-center h-[100px] cursor-pointer"
                onClick={() => handleViewBlog(blog._id)}
              >
                <div className="w-[85%] ">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      <p>
                        {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[15%]">
                  <img
                    src={blog.blogImage}
                    className="object-contain rounded-md h-[80px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBlogs;
