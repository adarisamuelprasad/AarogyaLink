import React from 'react';
import { Link } from 'react-router-dom';
import { IconHome, IconAdmin, IconSearch } from './Icons';

function Navbar() {
    return (
        <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <img src="/aarogyalink_logo.png" alt="AarogyaLink Logo" className="h-8 w-8 rounded-full" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg">AarogyaLink</span>
                    <span className="text-xs text-gray-500">Your Healthcare Connection</span>
                </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium flex items-center"><IconHome className="mr-1" /> Home</Link>
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium flex items-center"><IconAdmin className="mr-1" /> Admin Panel</Link>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center">
                <IconSearch className="mr-1" /> Find Healthcare
            </button>
        </nav>
    );
}

export default Navbar;