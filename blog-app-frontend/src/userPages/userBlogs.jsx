import axios from "axios";
import { useState, useEffect } from "react";
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
      <div className="space-y-6 mt-4">
        {blogs?.length == 0 && (
          <div className="bg-gray-50 flex flex-col justify-center items-center h-[400px] rounded-md">
            <p className="text-lg w-[300px">
              You haven’t written any blogs yet.
            </p>
            <p className="text-lg">
              Ready to share your thoughts with the world?
            </p>
          </div>
        )}
        {blogs?.map((blog) => (
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
    </>
  );
};

export default UserBlogs;
