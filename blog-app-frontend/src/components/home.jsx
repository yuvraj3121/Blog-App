import React, { useEffect, useState } from "react";
import Auth from "./auth";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleViewBlog = (blogId) => {
    localStorage.setItem("blog-id", blogId);
    navigate("/blog");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("blog-app-token");
        if (token) {
          const res = await axios.get(
            "http://localhost:8000/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);

          // console.log(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    checkAuth();

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/blog/getAllBlogs"
        );
        const acceptedBlogs = res.data.blogs.filter(
          (blog) => blog.status === "accepted"
        );
        setBlogs(acceptedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      {user ? (
        <div className="">
          <Navbar />
          <div className="flex">
            <div className="w-[70%] mx-auto px-4 py-8">
              <div className="bg-gray-400 h-[100px] w-full">Ad 1</div>
              <h1 className="text-3xl font-bold mb-6 text-blue-700">
                Latest Blogs
              </h1>
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition flex gap-6 items-center h-[150px] cursor-pointer"
                    onClick={() => handleViewBlog(blog._id)}
                  >
                    <div className="w-[80%] ">
                      <h2 className="text-4xl font-semibold text-gray-800">
                        {blog.title}
                      </h2>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                          <span>By {blog.author.fullName}</span>
                          <p>
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      <img
                        src={blog.blogImage}
                        className="object-contain rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-[20%] flex items-center justify-center p-2">
              <div className="bg-gray-400 h-full w-[200px]">ad 2</div>
            </div>
          </div>
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
    </>
  );
};

export default Home;
