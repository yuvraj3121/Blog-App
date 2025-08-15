import React, { useEffect, useState } from "react";
import Auth from "./auth";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [topAd, setTopAd] = useState(null);
  const [sideAd, setSideAd] = useState(null);
  const [selectAd, setSelectAd] = useState(null);

  const handleViewBlog = (blogId) => {
    localStorage.setItem("blog-id", blogId);
    navigate("/blog");
  };

  const handleClick = async (ad) => {
    if (!ad?._id) return;
    setSelectAd(ad);
    try {
      const res = await axios.patch(
        `https://minddrop.onrender.com/api/ad/trackClick/${ad._id}`
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error tracking ad click:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("blog-app-token");
        if (token) {
          const res = await axios.get(
            "https://minddrop.onrender.com/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    checkAuth();

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/blog/getAllBlogs"
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

    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/ad/getAllAds"
        );
        console.log(res.data.ads);
        setAllAds(res.data);
        const top = res.data.ads.filter(
          (ad) => ad.status == "active" && ad.position == "top"
        );
        const side = res.data.ads.filter(
          (ad) => ad.status == "active" && ad.position == "side"
        );
        const n1 = Math.floor(Math.random() * (top.length - 1)) + 0;
        setTopAd(top[n1]);
        const n2 = Math.floor(Math.random() * (side.length - 1)) + 0;
        setSideAd(side[n2]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className={`${selectAd ? "blur-sm pointer-events-none" : ""}`}>
            <Navbar />
            <div className="flex">
              <div className="w-[75%] mx-auto px-4 py-2">
                <div className="bg-gray-100 h-[200px] w-full flex justify-center">
                  <img
                    src={topAd?.adImage}
                    alt="ad1"
                    className="object-contain cursor-pointer"
                    onClick={() => handleClick(topAd)}
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-black mt-4">
                  Latest Blogs
                </h2>
                <div className="space-y-6">
                  {blogs?.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition flex gap-6 items-center h-[150px] cursor-pointer"
                      onClick={() => handleViewBlog(blog._id)}
                    >
                      <div className="w-[80%] p-2">
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
              <div className="w-[20%] flex items-start p-2 bg-gray-100">
                <img
                  src={sideAd?.adImage}
                  alt="ad2"
                  className="object-contain cursor-pointer"
                  onClick={() => handleClick(sideAd)}
                />
              </div>
            </div>
          </div>
          {selectAd && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
              onClick={() => setSelectAd(null)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-[900px] h-[80%] flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectAd?.adImage}
                  alt="Ad"
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </>
  );
};

export default Home;
