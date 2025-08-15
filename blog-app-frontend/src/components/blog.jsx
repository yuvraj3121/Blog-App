import Navbar from "./navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6";
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import CommentSection from "./commentSection";
import { useRef } from "react";

const Blog = () => {
  const [userId, setUserId] = useState(null);
  const [blog, setBlog] = useState(null);
  const blogId = localStorage.getItem("blog-id");
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(null);
  const [sideAd1, setSideAd1] = useState(null);
  const [sideAd2, setSideAd2] = useState(null);
  const [selectAd, setSelectAd] = useState(null);
  const [commentSelected, setCommentSelected] = useState(false);
  const [totalcomments, setTotalComments] = useState([]);
  const commentRef = useRef(null);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `https://minddrop.onrender.com/api/like/createLike/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );
      console.log(res.data);
      setLiked(true);
    } catch (error) {
      console.log("Error liking blog", error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.delete(
        `https://minddrop.onrender.com/api/like/removeLike/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );
      console.log(res.data);
      setLiked(false);
    } catch (error) {
      console.log("Error disliking blog", error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `https://minddrop.onrender.com/api/save/createSave/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );
      console.log(res.data);
      setSaved(true);
    } catch (error) {
      console.log("Error saving blog", error);
    }
  };

  const handleRemoveSaved = async () => {
    try {
      const res = await axios.delete(
        `https://minddrop.onrender.com/api/save/removeSaved/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );
      console.log(res.data);
      setSaved(false);
    } catch (error) {
      console.log("Error removing blog from saved", error);
    }
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
          setUserId(res.data.user._id);
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://minddrop.onrender.com/api/blog/getBlogById/${blogId}`
        );
        setBlog(res.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();

    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `https://minddrop.onrender.com/api/like/getAllLikes/${blogId}`
        );
        setLikes(res.data.count);
        const likedByUser = res.data.likes.some(
          (like) => like.userId._id === userId
        );
        setLiked(likedByUser);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();

    const checkSaved = async () => {
      try {
        const res = await axios.get(
          `https://minddrop.onrender.com/api/save/isSaved/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
            },
          }
        );
        setSaved(res.data.saved);
      } catch (error) {
        console.error("Error checking:", error);
      }
    };
    checkSaved();
  }, [blogId, liked, saved]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/ad/getAllAds"
        );
        const side = res.data.ads.filter(
          (ad) => ad.status == "active" && ad.position == "side"
        );
        if (side.length < 2) {
          setSideAd1(side[0] || null);
          setSideAd2(null);
          return;
        }

        let n1 = Math.floor(Math.random() * side.length);
        let n2;
        do {
          n2 = Math.floor(Math.random() * side.length);
        } while (n2 === n1);

        setSideAd1(side[n1]);
        setSideAd2(side[n2]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`relative bg-white ${
          selectAd ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex justify-center gap-4">
          <div className="w-[20%] px-2 py-4">
            <img
              src={sideAd1?.adImage}
              alt="ad1"
              className="object-contain bg-gray-100 cursor-pointer"
              onClick={() => handleClick(sideAd1)}
            />
          </div>
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
                <div className="flex gap-6 items-center">
                  {liked ? (
                    <div className="flex items-center gap-2">
                      <FaHeart
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={handleDislike}
                      />
                      <p className="text-lg">{likes}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaRegHeart
                        className="cursor-pointer text-gray-700 hover:text-black"
                        onClick={handleLike}
                      />
                      <p className="text-lg">{likes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FaRegComment
                      className="cursor-pointer text-gray-700 hover:text-black"
                      onClick={() => {
                        setCommentSelected(true);
                        commentRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    />
                    <p className="text-lg">{totalcomments}</p>
                  </div>
                </div>
                {saved ? (
                  <MdBookmarkAdded
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={handleRemoveSaved}
                  />
                ) : (
                  <MdOutlineBookmarkAdd
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={handleSave}
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
            <CommentSection
              setTotalComments={setTotalComments}
              commentRef={commentRef}
            />
          </div>
          <div className="w-[20%] px-2 py-4">
            <img
              src={sideAd2?.adImage}
              alt="ad2"
              className="object-contain bg-gray-100 cursor-pointer"
              onClick={() => handleClick(sideAd2)}
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
  );
};

export default Blog;
