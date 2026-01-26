"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Layers,
    FileText,
    LogOut,
    User,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import toast from "react-hot-toast";

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

const SidebarItem = ({ href, icon, label, active }: SidebarItemProps) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
            active
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
        )}
    >
        <span className={cn(
            "transition-transform duration-200 group-hover:scale-110",
            active ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500"
        )}>
            {icon}
        </span>
        <span className="font-medium">{label}</span>
    </Link>
);

export function AdminSidebar({ user }: { user: { email: string; role: string } }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/admin/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { href: "/admin/team", icon: <Users size={20} />, label: "Team Members" },
        { href: "/admin/jobs", icon: <Briefcase size={20} />, label: "Jobs" },
        { href: "/admin/projects", icon: <Layers size={20} />, label: "Projects" },
        { href: "/admin/blog", icon: <FileText size={20} />, label: "Blog" },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                toast.success("Logged out successfully");
                router.push("/admin/login");
                router.refresh();
            }
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <>
            {/* Mobile Navbar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logos/fishtail-logo-blue.svg" alt="Fishtail Logo" className="h-8 w-auto block dark:hidden" />
                    <img src="/logos/fishtail-logo-white.svg" alt="Fishtail Logo" className="h-8 w-auto hidden dark:block" />
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-[70] transition-transform duration-300 transform lg:translate-x-0 overflow-y-auto flex flex-col shadow-xl lg:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo & Close Button */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/logos/fishtail-logo-blue.svg"
                                alt="Fishtail Logo"
                                className="h-9 w-auto block dark:hidden"
                            />
                            <img
                                src="/logos/fishtail-logo-white.svg"
                                alt="Fishtail Logo"
                                className="h-9 w-auto hidden dark:block"
                            />
                        </Link>
                        <div className="hidden lg:block">
                            <ThemeToggle />
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            {...item}
                            active={pathname === item.href}
                        />
                    ))}
                </nav>

                {/* Footer / User Info */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {user.email.split("@")[0]}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-md shadow-blue-500/10"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
