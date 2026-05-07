import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-md px-6 py-4 mb-6 rounded-xl">

            <div className="flex items-center justify-between">

                {/* Logo / Title */}
                <h1 className="text-2xl font-bold text-blue-600">
                    NestForm
                </h1>

                {/* Navigation Links */}
                <div className="flex gap-4">

                    <Link
                        to="/"
                        className={`px-4 py-2 rounded-lg transition ${location.pathname === '/'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Edit Form
                    </Link>

                    <Link
                        to="/form"
                        className={`px-4 py-2 rounded-lg transition ${location.pathname === '/form'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        User Form
                    </Link>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;