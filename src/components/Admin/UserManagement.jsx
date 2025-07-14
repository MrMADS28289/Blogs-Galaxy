import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAllUsersAdmin, deleteUserAdmin, updateUserRoleAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

import ErrorMessage from "../UI/ErrorMessage";

const UserManagement = () => {
  const [user] = useAtom(userAtom);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAllUsersAdmin(user.token);
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  const handleDelete = async (userId) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserAdmin(userId, user.token);
        toast.success("User deleted successfully!");
        // Refresh the list after deletion
        getUsers();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }

    const newRole = currentRole === "admin" ? "user" : "admin";

    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await updateUserRoleAdmin(userId, newRole, user.token);
        toast.success(`User role updated to ${newRole} successfully!`);
        getUsers(); // Refresh the list
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <p className="text-white">Loading users...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (users.length === 0) return <p className="text-white">No users found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Users</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {users.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{u.name || u.email}</h3>
              <p className="text-sm text-gray-300">{u.email}</p>
              <p className="text-sm text-gray-300">Role: {u.role}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleRoleChange(u._id, u.role)}
                className={`px-4 py-2 rounded-md ${u.role === "admin" ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
              >
                {u.role === "admin" ? "Make User" : "Make Admin"}
              </button>
              <button
                onClick={() => handleDelete(u._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;