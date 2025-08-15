import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const AdminNewAd = ({ setComponentSelect }) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [adImage, setAdImage] = useState(null);
  const [adImageFile, setAdImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdImageFile(file);
      setAdImage(URL.createObjectURL(file));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!adImageFile || !position) {
      alert("Please select an image and position.");
      return;
    }

    const formData = new FormData();
    formData.append("position", position);
    formData.append("adImage", adImageFile);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/ad/createAd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Ad added successfully!");
      console.log(res.data);
      setComponentSelect("main");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Ad upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Advertisement</h2>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setComponentSelect("main")}
        >
          {"<"} Back
        </button>
      </div>

      <form onSubmit={handleClick} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Ad Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-600 border rounded-md p-2 cursor-pointer"
          />
          {adImage && (
            <div className="mt-4 relative w-fit">
              <img
                src={adImage}
                alt="Preview"
                className="h-[200px] w-[200px] object-contain rounded border"
              />
              <button
                type="button"
                className="absolute top-1 right-1 text-white bg-red-500 hover:bg-red-600 rounded-full w-2 h-6 flex items-center justify-center text-sm"
                onClick={() => {
                  setAdImage(null);
                  setAdImageFile(null);
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border rounded-md p-2 text-gray-700 cursor-pointer"
          >
            <option value="">Select Position</option>
            <option value="top">Top</option>
            <option value="side">Side</option>
          </select>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-white" />
                Uploading...
              </>
            ) : (
              "Add Ad"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewAd;
