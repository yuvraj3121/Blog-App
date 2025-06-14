import React, { useEffect, useState } from "react";
import Auth from "./auth";
import Navbar from "./navbar";

const Home = () => {
  const [user, setUser] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const sampleBlogs = [
      {
        id: 1,
        title: "Understanding React Hooks",
        description:
          "Hooks let you use state and other React features without writing a class...",
        author: "Yuvraj Singh",
      },
      {
        id: 2,
        title: "10 Tips for Writing Clean JavaScript",
        description:
          "Writing clean code is essential for readability and maintenance...",
        author: "random user1",
      },
    ];
    setBlogs(sampleBlogs);
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
                    key={blog.id}
                    className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{blog.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        By {blog.author}
                      </span>
                      <a
                        href={`/blog/${blog.id}`}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Read More →
                      </a>
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
        <Auth />
      )}
    </>
  );
};

export default Home;
