import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 text-center p-5">
            <h1 className="text-6xl font-extrabold text-themeRed mb-4">404</h1>
            <h2 className="text-2xl text-gray-800 mb-6">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <Link to="/">
                <button className="bg-themeRed text-white hover:bg-themeRed py-3 px-6 rounded-lg text-lg transition-colors">
                    Go Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
