"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    // Derive page title from route
    const getPageTitle = () => {
        const segment = pathname.split("/").filter(Boolean).pop();
        if (!segment) return "Dashboard";
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left — Page Title & Breadcrumb */}
            <div className="flex flex-col">
                <h1 className="text-[17px] font-semibold text-gray-900 leading-tight">
                    {getPageTitle()}
                </h1>
                <p className="text-[12px] text-gray-400 leading-tight mt-0.5">
                    {pathname
                        .split("/")
                        .filter(Boolean)
                        .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
                        .join(" / ")}
                </p>
            </div>

            {/* Right — Actions */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-56 h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 cursor-pointer">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200" />

                {/* Profile */}
                <button className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-all duration-200 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center text-white text-xs font-bold">
                        A
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-[13px] font-medium text-gray-800 leading-tight">
                            Admin
                        </span>
                        <span className="text-[11px] text-gray-400 leading-tight">
                            admin@api.io
                        </span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 ml-1" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;