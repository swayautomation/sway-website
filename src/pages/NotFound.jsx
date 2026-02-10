import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Go Home
        </Link>
    </div>
);

export default NotFound;
