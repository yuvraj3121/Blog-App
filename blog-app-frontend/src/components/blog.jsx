import React from "react";
import Navbar from "./navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6";
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from "react-icons/md";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const blogId = localStorage.getItem("blog-id");
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/blog/getBlogById/${blogId}`
        );
        setBlog(res.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="bg-gray-50 w-[60%] mt-2">
          <h1 className="font-serif">{blog?.title}</h1>
          <div className="p-2 my-2">
            <p className="text-lg text-gray-700">{blog?.author.fullName}</p>
            <p className="text-lg text-gray-700 mb-2">
              {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <hr />
            <div className="flex justify-between items-center text-2xl p-3">
              <div className="flex gap-4">
                {liked ? (
                  <FaHeart
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => setLiked(false)}
                  />
                ) : (
                  <FaRegHeart
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={() => setLiked(true)}
                  />
                )}
                <FaRegComment className="cursor-pointer text-gray-700 hover:text-black" />
              </div>
              {saved ? (
                <MdBookmarkAdded
                  className="cursor-pointer text-gray-700 hover:text-black"
                  onClick={() => setSaved(false)}
                />
              ) : (
                <MdOutlineBookmarkAdd
                  className="cursor-pointer text-gray-700 hover:text-black"
                  onClick={() => setSaved(true)}
                />
              )}
            </div>
            <hr />
          </div>
          <div className="p-2 mt-4">
            <img
              src={blog?.blogImage}
              alt="Blog"
              className="w-full h-[300px] object-contain rounded-md"
            />
            <div className="mt-4 p-4 text-lg leading-7 space-y-4 text-justify">
              {blog?.content.split("\n").map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
