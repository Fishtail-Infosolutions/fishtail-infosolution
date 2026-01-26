import React from "react";
import {
    Users,
    Briefcase,
    Layers,
    FileText,
    TrendingUp,
    Eye,
    MousePointerClick
} from "lucide-react";

const StatsCard = ({ title, value, icon, trend, color }: any) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center gap-1">
            <span className="text-green-500 text-xs font-bold flex items-center">
                <TrendingUp size={14} className="mr-1" />
                {trend}
            </span>
            <span className="text-gray-400 text-xs text-nowrap">vs last month</span>
        </div>
    </div>
);

export default function AdminDashboard() {
    const stats = [
        { title: "Active Applications", value: "124", icon: <Users className="text-blue-600" size={24} />, trend: "12%", color: "bg-blue-500" },
        { title: "Job Openings", value: "8", icon: <Briefcase className="text-purple-600" size={24} />, trend: "5%", color: "bg-purple-500" },
        { title: "Project Views", value: "12.4k", icon: <Eye className="text-emerald-600" size={24} />, trend: "18%", color: "bg-emerald-500" },
        { title: "Inquiries", value: "45", icon: <MousePointerClick className="text-orange-600" size={24} />, trend: "24%", color: "bg-orange-500" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 italic">Welcome back to Fishtail Infosolutions Dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatsCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20 lg:pb-0">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <FileText className="text-gray-500" size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">New blog post created: "Digital Marketing Trends 2026"</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                    <Layers className="text-blue-500 mb-4 opacity-20" size={64} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resource Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
                        Manage your company's digital presence from team members to active projects and career opportunities.
                    </p>
                    <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                        View All Projects
                    </button>
                </div>
            </div>
        </div>
    );
}
