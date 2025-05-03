import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("Profile");
    if (!profile) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 bg-gray-900">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <ul className="flex-1 space-y-4 p-4">
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaHome />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
        </ul>
        <footer className="p-4 bg-gray-900 text-center text-sm">
          © 2023 Your Company
        </footer>
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-700">This is your main content area.</p>
      </main>
    </div>
  );
};

export default Dashboard;
