import axios from "axios";
import React, { useState } from "react";

const AdminBlogDetails = ({ selectedBlog, setComponentSelect }) => {
  const [status, setStatus] = useState(selectedBlog.status);

  const handleStatusChange = async (status) => {
    try {
      const res = await axios.patch(
        `https://minddrop.onrender.com/api/blog/updateStatus/${selectedBlog._id}`,
        {
          status,
        }
      );
      console.log(res.data);
      setStatus(res.data.blog.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white p-6 rounded-xl shadow">
      <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
        <button
          className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
          onClick={() => setComponentSelect("main")}
        >
          {"< "}Back
        </button>
        {status == "pending" && (
          <div className="flex gap-2">
            <button
              className="bg-green-200 text-green-600 hover:bg-green-300 py-2 px-4"
              onClick={() => handleStatusChange("accepted")}
            >
              Accept
            </button>
            <button
              className="bg-red-200 text-red-600 hover:bg-red-300 py-2 px-4"
              onClick={() => handleStatusChange("rejected")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-[70%] bg-gray-50 p-2">
          <p className="text-5xl font-semibold mb-4">{selectedBlog.title}</p>
          <img
            src={selectedBlog.blogImage}
            alt=""
            className="h-[300px] w-full mb-4 object-contain"
          />
          <p className="text-justify text-lg leading-7 space-y-4">
            {selectedBlog?.content.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogDetails;
