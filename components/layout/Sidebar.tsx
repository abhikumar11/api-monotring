"use client";

import { sidebarItems } from "@/app/constants/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LogOut, ChevronRight } from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0f1117] border-r border-white/[0.06] flex flex-col z-40">
          
            <div className="flex items-center gap-3 px-5 pt-6 pb-5 border-b border-white/[0.06]">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] shrink-0">
                    <Activity size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-white tracking-tight">
                        API Monitor
                    </span>
                    <span className="text-[11px] text-[#8b8fa3] tracking-wide">
                        Monitoring Suite
                    </span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">
                {sidebarItems.map((section, idx) => (
                    <div key={idx} className="mb-2">
                        {section.title && (
                            <p className="text-[10.5px] font-semibold uppercase tracking-[1.2px] text-[#8b8fa3]/60 px-3 pt-3 pb-2">
                                {section.title as string}
                            </p>
                        )}
                        <ul className="flex flex-col gap-0.5">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.label as string}>
                                        <Link
                                            href={item.href as string}
                                            className={`
                                                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium
                                                transition-all duration-200 ease-out
                                                ${isActive
                                                    ? "bg-indigo-500/[0.12] text-white"
                                                    : "text-[#8b8fa3] hover:text-[#c9cdd8] hover:bg-white/[0.04]"
                                                }
                                            `}
                                        >
                                            <item.icon
                                                size={18}
                                                className={`
                                                    shrink-0 transition-all duration-200
                                                    ${isActive
                                                        ? "text-indigo-400 opacity-100"
                                                        : "opacity-60 group-hover:opacity-100"
                                                    }
                                                `}
                                            />
                                            <span className="flex-1">
                                                {item.label as string}
                                            </span>
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)] shrink-0" />
                                            )}
                                            {!isActive && (
                                                <ChevronRight
                                                    size={14}
                                                    className="opacity-0 group-hover:opacity-40 transition-opacity duration-200 shrink-0"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="border-t border-white/[0.06] p-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                        A
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[13px] font-semibold text-[#e2e4ea] truncate">
                            Admin
                        </span>
                        <span className="text-[11px] text-[#8b8fa3]">
                            Administrator
                        </span>
                    </div>
                    <button
                        className="w-[30px] h-[30px] flex items-center justify-center rounded-md text-[#8b8fa3] hover:bg-red-500/[0.12] hover:text-red-400 transition-all duration-200 shrink-0 cursor-pointer"
                        title="Logout"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;