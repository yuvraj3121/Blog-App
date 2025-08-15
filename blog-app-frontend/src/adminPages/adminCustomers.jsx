import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/user/allUsers"
        );
        const usersOnly = res.data.users?.filter(
          (user) => user.role === "user"
        );
        setUsers(usersOnly || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">All Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Id
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fullname
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone no.
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {user._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
