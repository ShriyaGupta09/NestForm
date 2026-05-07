import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    LayoutDashboard,
    FileText,
    Eye,
    Menu,
    X,
} from 'lucide-react';

const Sidebar = () => {

    const location = useLocation();

    const [open, setOpen] = useState(false);

    const navItems = [
        {
            name: 'Builder',
            path: '/',
            icon: <LayoutDashboard size={18} />,
        },
        {
            name: 'User Form',
            path: '/form',
            icon: <FileText size={18} />,
        },
        {
            name: 'Preview',
            path: '/preview',
            icon: <Eye size={18} />,
        },
    ];

    return (
        <>

            {/* TOP NAVBAR */}
            <div
                className="
                    fixed
                    top-0
                    left-0
                    right-0
                    h-16
                    bg-white
                    border-b
                    border-slate-300
                    flex
                    items-center
                    justify-between
                    px-6
                    z-50
                "
            >

                {/* LEFT SIDE */}
                <div className="flex items-center">

                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(true)}
                        className="
                            p-2
                            hover:bg-slate-100
                            rounded-md
                            transition
                        "
                    >
                        <Menu size={26} />
                    </button>

                    {/* Logo */}
                    <h1
                        className="
                            ml-4
                            text-2xl
                            font-semibold
                            text-slate-800
                            tracking-tight
                        "
                    >
                        FormFlow
                    </h1>

                </div>

                {/* RIGHT SIDE NAVIGATION */}
                <div className="flex items-center gap-8">

                    {navItems.map((item) => (

                        <Link
                            key={item.name}
                            to={item.path}
                            className={`
                                text-sm
                                font-medium
                                transition
                                flex
                                items-center
                                gap-2
                                ${location.pathname === item.path
                                    ? 'text-blue-700 underline'
                                    : 'text-slate-700 hover:text-blue-700 hover:underline'
                                }
                            `}
                        >

                            {item.icon}

                            {item.name}

                        </Link>

                    ))}

                </div>

            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/30
                        z-40
                    "
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
                    fixed
                    top-0
                    left-0
                    h-full
                    w-72
                    bg-white
                    border-r
                    border-slate-300
                    p-6
                    z-50
                    flex
                    flex-col
                    transform
                    transition-transform
                    duration-300
                    ${open
                        ? 'translate-x-0'
                        : '-translate-x-full'
                    }
                `}
            >

                {/* Sidebar Header */}
                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-semibold
                                text-slate-800
                                tracking-tight
                            "
                        >
                            FormFlow
                        </h1>

                        <p className="text-slate-500 text-sm mt-1">
                            Nested Form Builder
                        </p>

                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="
                            p-2
                            hover:bg-slate-100
                            rounded-md
                            transition
                        "
                    >
                        <X size={24} />
                    </button>

                </div>

                {/* Sidebar Navigation */}
                <div className="flex flex-col gap-6">

                    {navItems.map((item) => (

                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={`
                                flex
                                items-center
                                gap-3
                                transition
                                font-medium
                                text-base
                                ${location.pathname === item.path
                                    ? 'text-blue-700 underline'
                                    : 'text-slate-700 hover:text-blue-700 hover:underline'
                                }
                            `}
                        >

                            {item.icon}

                            <span>
                                {item.name}
                            </span>

                        </Link>

                    ))}

                </div>

            </div>

        </>
    );
};

export default Sidebar;