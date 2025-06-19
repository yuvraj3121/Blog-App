import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { RiAdvertisementLine } from "react-icons/ri";

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/blog/getAllBlogs"
        );
        console.log(res.data.blogs);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();

    const fetchAds = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/ad/getAllAds");
        console.log(res.data.ads);
        setAllAds(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchAds();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹1000`,
      icon: <FaRupeeSign size={24} />,
      change: "+12%",
    },
    {
      title: "Ads",
      value: allAds?.count,
      icon: <RiAdvertisementLine size={24} />,
      change: "+3%",
    },
    {
      title: "Blogs",
      value: blogs?.count || 0,
      icon: <SiHatenabookmark size={24} />,
      change: "+3%",
    },
    {
      title: "Customers",
      value: 10,
      icon: <FiUsers size={24} />,
      change: "+8%",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-evenly items-start">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                {stat.icon}
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Latest Blogs</h3>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs?.blogs?.slice(0, 5).map((blog) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
