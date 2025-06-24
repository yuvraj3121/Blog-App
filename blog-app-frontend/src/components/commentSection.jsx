import axios from "axios";
import { useState, useEffect } from "react";

const CommentSection = ({ setTotalComments, commentRef }) => {
  const blogId = localStorage.getItem("blog-id");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyInput, setReplyInput] = useState({});
  const [replies, setReplies] = useState({});
  const [currentUserId, setCurrentUserId] = useState("");

  const token = localStorage.getItem("blog-app-token");

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
          setCurrentUserId(res.data.user._id);
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    checkAuth();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/comment/getAllComments/${blogId}`
      );
      setComments(res.data.comments);
      setTotalComments(res.data.comments.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchAllReplies = async () => {
    const allReplies = {};
    for (const comment of comments) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/reply/getAllReplies/${comment._id}`
        );
        allReplies[comment._id] = res.data.replies;
      } catch (err) {
        console.error("Failed fetching replies", err);
      }
    }
    setReplies(allReplies);
  };

  const handleComment = async () => {
    if (content.trim() === "") return;
    try {
      await axios.post(
        `http://localhost:8000/api/comment/createComment/${blogId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent("");
      fetchComments();
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  const handleReply = async (commentId) => {
    const text = replyInput[commentId];
    if (!text || text.trim() === "") return;
    try {
      await axios.post(
        `http://localhost:8000/api/reply/createReply/${commentId}`,
        { replyText: text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReplyInput((prev) => ({ ...prev, [commentId]: "" }));
      fetchAllReplies();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/comment/deleteComment/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/reply/deleteReply/${replyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAllReplies();
    } catch (err) {
      console.error("Delete reply error:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  useEffect(() => {
    if (comments.length > 0) fetchAllReplies();
  }, [comments]);

  return (
    <div ref={commentRef} className="p-6 mt-2">
      <h2 className="font-bold text-2xl">Comments</h2>

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="bg-gray-100 w-full p-2 border rounded-lg mt-4"
        />
        <div className="flex justify-end mt-2">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      </div>

      {comments?.map((comment) => (
        <div
          key={comment._id}
          className="bg-gray-100 mb-6 p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-xl">
                {comment.userId?.userName || "User"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-base mb-2">{comment.commentText}</p>
            </div>

            {comment.userId?._id === currentUserId && (
              <button
                onClick={() => deleteComment(comment._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Reply..."
            value={replyInput[comment._id] || ""}
            onChange={(e) =>
              setReplyInput((prev) => ({
                ...prev,
                [comment._id]: e.target.value,
              }))
            }
            className="mt-2 mb-2 w-full p-2 bg-gray-200 rounded"
          />
          <div className="flex justify-end mb-2">
            <button
              onClick={() => handleReply(comment._id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reply
            </button>
          </div>

          {replies[comment._id]?.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-gray-300">
              {replies[comment._id]?.map((reply) => (
                <div key={reply._id} className="mb-2 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {reply.userId?.userName || "User"}
                    </p>
                    <p className="text-sm text-gray-700">{reply.replyText}</p>
                  </div>
                  {reply.userId?._id === currentUserId && (
                    <button
                      onClick={() => deleteReply(reply._id)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
