import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { username, fullName, email, phoneNumber } = formData;

    if (!username || !fullName || !email || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.patch(
        "https://minddrop.onrender.com/api/user/updateProfile",
        {
          userName: username,
          fullName,
          email,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("blog-app-token")}`,
          },
        }
      );
      console.log(res.data);
      setIsEdit(false);
    } catch (error) {
      console.error("Updating error:", error);
      alert("Update failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("blog-app-token");
        if (token) {
          const res = await axios.get(
            "https://minddrop.onrender.com/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const u = res.data.user;
          setUser(u);
          setFormData({
            email: u.email,
            username: u.userName,
            fullName: u.fullName,
            phoneNumber: u.phoneNumber,
          });
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    fetchProfile();
  }, [isEdit]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          User Profile
        </h2>
        <table className="w-full table-auto text-lg">
          <tbody className="divide-y divide-gray-300">
            {[
              { label: "Username", name: "username" },
              { label: "Full Name", name: "fullName" },
              { label: "Email", name: "email" },
              { label: "Phone No.", name: "phoneNumber" },
            ].map(({ label, name }) => (
              <tr key={name} className="text-gray-700">
                <td className="py-3 font-medium text-center w-1/3 pr-6">
                  {label}
                </td>
                <td className="w-1/12 text-center">:</td>
                <td className="w-1/3 ">
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    disabled={!isEdit}
                    onChange={handleChange}
                    className={`w-full p-2 rounded-md border text-center ${
                      isEdit
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white border-transparent"
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          {isEdit ? (
            <div className="flex gap-2">
              <button
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
