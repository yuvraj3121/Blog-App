import React, { useState } from "react";

const Auth = () => {
  const [component, setComponent] = useState("login");

  return (
    <div className="flex flex-col h-[100vh] w-[206vh]">
      <h1 className="p-4 mb-4">Blog App</h1>
      <hr />
      <div className="bg-[url('/bg1.jpg')] h-full w-full flex justify-center items-center">
        <div className="text-black bg-gray-200 w-[500px] h-[500px] mt-4 rounded-2xl p-2">
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
            <form className="flex flex-col p-4 bg-gray-300 rounded-b-lg mx-2 h-[425px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="flex flex-col p-4 bg-gray-300 rounded-b-lg mx-2 h-[425px]">
              <input
                type="username"
                placeholder="Enter your username"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="fullName"
                placeholder="Enter your fullname"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="phoneNumber"
                placeholder="Enter your phone number"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="mb-4 p-2 border border-gray-400 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
