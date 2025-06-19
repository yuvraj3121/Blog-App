import axios from "axios";
import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";

const AdminAdDetails = ({ selectedAd, setComponentSelect }) => {
  const [selectUpdate, setSelectUpdate] = useState(false);
  const [position, setPosition] = useState(selectedAd.position);
  const [adImageFile, setAdImageFile] = useState(null);
  const [adImage, setAdImage] = useState(selectedAd.adImage);
  const totalRevenue = selectedAd.totalClicks * 100;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setAdImageFile(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("position", position);

    if (adImageFile) formData.append("adImage", adImageFile);
    console.log(selectedAd._id);

    try {
      await axios
        .post(
          `http://localhost:8000/api/ad/updateAd/${selectedAd._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Ad Updated.");
          setComponentSelect("main");
        });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className=" bg-white p-6 rounded-xl shadow">
      {selectUpdate == false ? (
        <div>
          <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
            <h2 className="text-3xl font-bold">Ad Details</h2>
            <button
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setComponentSelect("main")}
            >
              {"< "}Back
            </button>
          </div>
          <div className="flex flex-row">
            <div className="w-[70%]">
              <img className="object-contain" src={adImage} alt="" />
            </div>
            <div className="ml-2 bg-gray-200 w-[30%] p-5  text-left flex flex-col gap-2">
              <p
                className={`${
                  selectedAd.status == "active"
                    ? "bg-green-300 text-green-600"
                    : "bg-red-300 text-red-600"
                } w-[100px] p-2 rounded-xl text-2xl text-center`}
              >
                {selectedAd.status}
              </p>
              <p className="text-lg">Position : {selectedAd.position}</p>
              <p className="text-lg">Total Revenue : {totalRevenue}</p>
              <button
                className="w-[100px] text-sm text-blue-400 hover:bg-blue-200 p-2 flex justify-center items-center gap-1 mt-4"
                onClick={() => setSelectUpdate(true)}
              >
                <GrUpdate /> Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
            <h1 className="text-3xl font-bold">Update Product</h1>
            <button
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setComponentSelect("main")}
            >
              {"< "}Back
            </button>
          </div>

          <div className=" p-4 rounded w-[600px] text-left">
            <form onSubmit={handleClick} className="space-y-6">
              <div>
                {!adImage && (
                  <div>
                    <label className="block text-lg font-medium mb-2">
                      Ad Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-600 border rounded-md p-2 cursor-pointer"
                    />
                  </div>
                )}
                {adImage && (
                  <div>
                    <div className="mt-4 relative w-fit">
                      <img
                        src={adImage}
                        alt="Preview"
                        className="h-[200px] w-[200px] object-contain rounded border"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        onClick={() => {
                          setAdImage(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
                {adImageFile && (
                  <div className="mt-4 relative w-fit">
                    <img
                      src={URL.createObjectURL(adImageFile)}
                      alt="Preview"
                      className="h-[200px] w-[200px] object-contain rounded border"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm"
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
                <label className="block text-lg font-medium mb-2">
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full border rounded-md p-2 text-gray-700 cursor-pointer"
                >
                  <option value="top">Top</option>
                  <option value="side">Side</option>
                </select>
              </div>

              <div className="text-right flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold"
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold"
                  onClick={() => setSelectUpdate(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdDetails;
