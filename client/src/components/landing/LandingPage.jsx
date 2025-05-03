import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Flock AI</h1>
          <nav>
            <button
              onClick={handleSignup}
              className="bg-white text-gray-600 px-4 py-2 rounded mr-2 hover:bg-gray-200 hover:text-red-600 hover:cursor-pointer"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="bg-white text-gray-600 px-4 py-2 rounded hover:bg-gray-200 hover:text-red-600 hover:cursor-pointer"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Flock AI</h2>
        <p className="text-lg mb-4">
          Your go-to platform for AI-driven solutions.
        </p>
        <p className="text-lg mb-4">
          Explore our features and discover how we can help you achieve your
          goals.
        </p>
        <p className="text-lg mb-4">Get started today and unlock the power of AI!</p>
        <p className="text-lg">Contact us for more information.</p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Flock AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
