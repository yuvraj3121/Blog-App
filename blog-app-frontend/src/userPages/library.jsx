import { useState } from "react";
import Navbar from "../components/navbar";
import UserBlogs from "./userBlogs";
import SavedBlogs from "./savedBlogs";

const Library = () => {
  const [component, setComponent] = useState("my-blogs");

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[70%] p-6">
          <div className="flex gap-2 mb-1">
            <p
              className={`font-semibold text-xl p-4 cursor-pointer rounded-md hover:bg-gray-100 ${
                component == "my-blogs" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setComponent("my-blogs")}
            >
              My Blogs
            </p>
            <p
              className={`font-semibold text-xl p-4 cursor-pointer rounded-md hover:bg-gray-100 ${
                component == "saved" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setComponent("saved")}
            >
              Saved
            </p>
          </div>
          <hr />
          {component == "my-blogs" ? <UserBlogs /> : <SavedBlogs />}
        </div>
      </div>
    </>
  );
};

export default Library;
