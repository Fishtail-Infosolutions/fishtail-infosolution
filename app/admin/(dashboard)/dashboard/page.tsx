"use client";
import React, { useEffect, useState } from "react";
import {
    Users,
    Briefcase,
    Layers,
    FileText,
    TrendingUp,
    MousePointerClick,
    Mail,
    RefreshCw,
    AlertCircle,
    ShieldCheck
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from "recharts";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    subtitle?: string;
    color: string;
    isLoading?: boolean;
    href?: string;
    isForbidden?: boolean;
}

const StatsCard = ({ title, value, icon, subtitle, color, isLoading, href, isForbidden }: StatsCardProps) => {
    const handleForbiddenClick = (e: React.MouseEvent) => {
        if (isForbidden) {
            e.preventDefault();
            toast.error("Access Denied: Only Super Admins can manage team accounts");
        }
    };

    const CardContent = (
        <div
            className={`bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full group
                ${isForbidden ? "cursor-not-allowed opacity-80" : "hover:shadow-xl hover:-translate-y-1 cursor-pointer"}
            `}
            onClick={isForbidden ? handleForbiddenClick : undefined}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {/* Title */}
                    {isLoading ? (
                        <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
                    ) : (
                        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider line-clamp-1">{title}</p>
                    )}

                    {/* Value */}
                    {isLoading ? (
                        <div className="h-8 w-1/2 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mt-3" />
                    ) : (
                        <h3 className="text-3xl font-black mt-2 text-gray-900 dark:text-white">{value}</h3>
                    )}
                </div>

                {/* Icon Box */}
                <div className={`p-4 rounded-2xl shrink-0 transition-all duration-300 flex items-center justify-center ${isLoading
                    ? 'w-[60px] h-[60px] bg-gray-100 dark:bg-gray-800 animate-pulse shadow-sm'
                    : `${color} shadow-lg shadow-current/20 dark:shadow-none`
                    }`}>
                    {!isLoading && icon && React.isValidElement(icon) && (
                        React.cloneElement(icon as React.ReactElement<any>, { className: "text-white", size: 28 })
                    )}
                </div>
            </div>

            {/* Subtitle / Pending info */}
            <div className="mt-4">
                {isLoading ? (
                    <div className="h-3 w-3/4 bg-gray-50 dark:bg-gray-800/50 animate-pulse rounded-sm" />
                ) : subtitle && (
                    <div className="flex items-center gap-1">
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center">
                            {subtitle}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    if (href && !isLoading && !isForbidden) {
        return <Link href={href} className="block h-full">{CardContent}</Link>;
    }
    return CardContent;
};

interface DashboardData {
    stats: {
        applications: { total: number; pending: number };
        contacts: { total: number; unread: number };
        quotes: { total: number; pending: number };
        admins: { total: number; subAdmins: number };
    };
    charts: {
        daily: { name: string; applications: number; contacts: number }[];
        distribution: { name: string; value: number }[];
    };
    recentActivity: {
        type: 'application' | 'contact' | 'blog' | 'quote';
        title: string;
        subtitle: string;
        date: string;
    }[];
    userRole?: 'admin' | 'super-admin' | 'user';
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch("/api/admin/dashboard/stats");
            if (!res.ok) throw new Error();
            const stats = await res.json();
            setData(stats);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (error) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
                    <AlertCircle size={48} />
                </div>
                <h2 className="text-xl font-bold">Failed to load dashboard data</h2>
                <button
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                    <RefreshCw size={18} /> Retry
                </button>
            </div>
        );
    }

    const getActivityHref = (type: string) => {
        switch (type) {
            case 'application': return '/admin/applications';
            case 'contact': return '/admin/contacts';
            case 'blog': return '/admin/blog';
            case 'quote': return '/admin/quotes';
            case 'admin': return '/admin/admins';
            default: return '#';
        }
    };

    const cards = [
        {
            title: "Total Applications",
            value: data?.stats?.applications?.total ?? "0",
            icon: <Users />,
            subtitle: `${data?.stats?.applications?.pending ?? 0} pending review`,
            color: "bg-blue-600",
            href: "/admin/applications"
        },
        {
            title: "Inquiries",
            value: data?.stats?.contacts?.total ?? "0",
            icon: <Mail />,
            subtitle: `${data?.stats?.contacts?.unread ?? 0} unread messages`,
            color: "bg-indigo-600",
            href: "/admin/contacts"
        },
        {
            title: "Quote Requests",
            value: data?.stats?.quotes?.total ?? "0",
            icon: <MousePointerClick />,
            subtitle: `${data?.stats?.quotes?.pending ?? 0} pending review`,
            color: "bg-emerald-600",
            href: "/admin/quotes"
        },
        {
            title: "Total Admins",
            value: data?.stats?.admins?.total ?? "0",
            icon: <ShieldCheck />,
            subtitle: `${data?.stats?.admins?.subAdmins ?? 0} subadmins`,
            color: "bg-orange-600",
            href: "/admin/admins"
        },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-tight">{label}</p>
                    <div className="space-y-2">
                        {payload.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex justify-between flex-1 gap-8">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{item.name}</span>
                                    <span className="text-sm font-black text-gray-900 dark:text-white">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Hub</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 italic">Real-time pulse of Fishtail Infosolutions.</p>
                </div>
                <button
                    onClick={fetchStats}
                    disabled={loading}
                    className="p-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <StatsCard key={i} isLoading={true} title="" value="" color="" />
                    ))
                ) : (
                    cards.map((stat, i) => {
                        const isForbidden = stat.title === "Total Admins" && data?.userRole !== 'super-admin';
                        return (
                            <StatsCard
                                key={i}
                                {...stat}
                                isForbidden={isForbidden}
                            />
                        );
                    })
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Engagement Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Website Engagement</h2>
                        <div className="text-xs text-gray-400 font-bold uppercase">7 Day Trend</div>
                    </div>
                    <div className="h-[300px] w-full">
                        {loading ? (
                            <div className="w-full h-full bg-gray-50 dark:bg-gray-800/20 animate-pulse rounded-lg" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.charts.daily}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" name="Applications" dataKey="applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                                    <Area type="monotone" name="Inquiries" dataKey="contacts" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorContacts)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Application Status</h2>
                    <div className="h-[250px] w-full">
                        {loading ? (
                            <div className="w-full h-full bg-gray-50 dark:bg-gray-800/20 animate-pulse rounded-lg" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.charts.distribution}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {(data?.charts.distribution || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--tw-bg-opacity)',
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                        }}
                                        content={({ active, payload }: any) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
                                                            <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">{payload[0].name}: {payload[0].value}</span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="space-y-3 mt-4">
                        {(data?.charts.distribution || []).map((entry, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="capitalize font-medium text-gray-600 dark:text-gray-300">{entry.name}</span>
                                </div>
                                <span className="font-black text-gray-900 dark:text-white">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 pb-20 lg:pb-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activities</h2>
                <div className="space-y-1">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800" />
                                <div className="space-y-2">
                                    <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
                                    <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                                </div>
                            </div>
                        ))
                    ) : data && data.recentActivity.length > 0 ? (
                        data.recentActivity.map((item, i) => (
                            <Link
                                key={i}
                                href={getActivityHref(item.type)}
                                className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${item.type === 'application' ? 'bg-blue-600 text-white' :
                                    item.type === 'contact' ? 'bg-indigo-600 text-white' :
                                        'bg-orange-600 text-white'
                                    }`}>
                                    {item.type === 'application' ? <Users size={20} /> :
                                        item.type === 'contact' ? <Mail size={20} /> :
                                            <FileText size={20} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{item.title}</p>
                                        <p className="text-[10px] text-gray-400 italic">
                                            {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize font-medium">{item.subtitle}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Layers className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={48} />
                            <p className="text-gray-500 dark:text-gray-400">No activity yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
