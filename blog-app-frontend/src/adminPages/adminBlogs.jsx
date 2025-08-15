import { useEffect, useState } from "react";
import { SiHatenabookmark } from "react-icons/si";
import AdminBlogDetails from "./adminBlogDetails";
import axios from "axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [componentSelect, setComponentSelect] = useState("main");
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/blog/getAllBlogs"
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [componentSelect]);

  return (
    <>
      {componentSelect === "main" && (
        <div>
          <div className="mb-4 flex flex-row justify-between items-center">
            <div className="flex justify-evenly items-start bg-white p-6 rounded-xl shadow w-[300px]">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <SiHatenabookmark size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Blogs</p>
                <p className="text-2xl font-bold mt-1">{blogs?.count}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">All Blogs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs?.blogs?.map((blog) => (
                    <tr key={blog._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.author.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p
                          className={`${
                            blog.status == "accepted"
                              ? "text-green-500 bg-green-200"
                              : blog.status == "rejected"
                              ? "text-red-500 bg-red-200"
                              : "text-yellow-500 bg-yellow-200"
                          } p-1 w-fit rounded-md`}
                        >
                          {blog?.status}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p
                          className="text-blue-400 cursor-pointer hover:text-blue-600"
                          onClick={() => {
                            setComponentSelect("details");
                            setSelectedBlog(blog);
                          }}
                        >
                          view details{" "}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {componentSelect == "details" && (
        <div>
          <AdminBlogDetails
            selectedBlog={selectedBlog}
            setComponentSelect={setComponentSelect}
          />
        </div>
      )}
    </>
  );
};

export default AdminBlogs;
