import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [component, setComponent] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (component === "login") {
      if (!formData.email || !formData.password) {
        alert("Please fill in all fields for login.");
        return;
      }

      try {
        const res = await axios.post("http://localhost:8000/api/user/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(res.data);
        setUser(res.data.user);
        localStorage.setItem("blog-app-token", res.data.token);
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    } else {
      if (
        !formData.username ||
        !formData.fullName ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.password
      ) {
        alert("Please fill in all fields for sign up.");
        return;
      }
      try {
        const res = await axios.post("http://localhost:8000/api/user/signUp", {
          userName: formData.username,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        });
        console.log(res.data);
        setComponent("login");
      } catch (error) {
        console.error("Sign Up error:", error);
        alert("Sign up failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-[206vh]">
      <h1 className="p-4 mb-4">Blog App</h1>
      <hr />
      <div className="bg-[url('/bg1.jpg')] h-full w-full flex justify-center items-center">
        <div className="text-black bg-gray-200 w-[500px] h-[450px] mt-4 rounded-2xl p-2">
          <div className="text-2xl font-bold px-2 pt-2 flex gap-3">
            <span
              className={`cursor-pointer hover:text-blue-600 p-1 ${
                component == "login"
                  ? "bg-gray-300 rounded-t-md"
                  : "bg-gray-200"
              }`}
              onClick={() => setComponent("login")}
            >
              Login
            </span>
            <span
              className={`cursor-pointer hover:text-blue-600 p-1 ${
                component == "signUp"
                  ? "bg-gray-300 rounded-t-md"
                  : "bg-gray-200 "
              }`}
              onClick={() => setComponent("signUp")}
            >
              Sign Up
            </span>
          </div>
          {component === "login" ? (
            <form className="flex flex-col p-4 bg-gray-300 rounded-b-lg mx-2 h-[375px]">
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </button>
            </form>
          ) : (
            <form className="flex flex-col p-4 bg-gray-300 rounded-b-lg mx-2 h-[375px]">
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <input
                name="fullName"
                type="text"
                placeholder="Enter your fullname"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <input
                name="phoneNumber"
                type="number"
                placeholder="Enter your phone number"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mb-4 p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
