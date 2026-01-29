"use client";

import React, { useEffect, useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Search,
    Calendar
} from "lucide-react";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Job {
    _id: string;
    title: string;
    category: string | {
        _id: string;
        name: string;
    };
    icon?: string;
    type: string;
    location: string;
    description: string;
    salary?: string;
    deadline?: string;
    openings?: number;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchJobs = async (page: number = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/jobs?page=${page}&limit=10`);
            if (!res.ok) throw new Error("Failed to fetch jobs");
            const data = await res.json();
            setJobs(data.jobs);
            setPagination(data.pagination);
        } catch (error) {
            toast.error("Error loading jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async () => {
        if (!jobToDelete) return;

        try {
            const res = await fetch(`/api/jobs/${jobToDelete._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete job");

            setJobs(jobs.filter(j => j._id !== jobToDelete._id));
            setIsDeleteModalOpen(false);
            setJobToDelete(null);
            toast.success("Job deleted successfully");

            // Refresh if we deleted the last item on the page
            if (jobs.length === 1 && pagination.page > 1) {
                fetchJobs(pagination.page - 1);
            }
        } catch (error) {
            toast.error("Error deleting job");
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchJobs(newPage);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = (typeof job.category === 'object' && job.category !== null)
            ? job.category.name.toLowerCase().includes(searchQuery.toLowerCase())
            : "not specified".includes(searchQuery.toLowerCase());
        return titleMatch || categoryMatch;
    });

    if (loading && pagination.page === 1) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Job Openings ({pagination.total})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your job vacancies and recruitment listings.
                    </p>
                </div>
                <Link href="/admin/jobs/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-6 h-11 rounded-xl font-semibold gap-2">
                        <Plus size={18} />
                        Add Job
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    type="text"
                    placeholder="Search jobs by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                />
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Job Title</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Deadline</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Openings</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <Briefcase size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No jobs found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {job.icon ? (
                                                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                                                        <Image
                                                            src={job.icon}
                                                            alt={job.title}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm uppercase shrink-0">
                                                        {job.title.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{job.title}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-100 tracking-wide dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[13px] font-semibold">
                                                {(typeof job.category === 'object' && job.category !== null) ? job.category.name : "Not Specified"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500" />
                                                {job.deadline || "Until Filled"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold min-w-[40px]">
                                                {job.openings || 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" align="end">
                                                    <div className="flex flex-col gap-1">
                                                        <Link href={`/career/${job._id}`} target="_blank">
                                                            <Button
                                                                variant="ghost"
                                                                className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 hover:text-green-600 dark:hover:text-green-400"
                                                            >
                                                                <Eye size={16} />
                                                                View
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/admin/jobs/${job._id}/edit`}>
                                                            <Button
                                                                variant="ghost"
                                                                className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                            >
                                                                <Pencil size={16} />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setJobToDelete(job);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">{((pagination.page - 1) * pagination.limit) + 1}</span> to{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                                </span> of{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">{pagination.total}</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1 || loading}
                                    className="h-9 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 disabled:opacity-50"
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                        .filter(page => {
                                            // Show first page, last page, current page, and pages around current
                                            return page === 1 ||
                                                page === pagination.pages ||
                                                Math.abs(page - pagination.page) <= 1;
                                        })
                                        .map((page, index, array) => {
                                            // Add ellipsis
                                            const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                                            return (
                                                <React.Fragment key={page}>
                                                    {showEllipsisBefore && (
                                                        <span className="px-2 text-gray-400">...</span>
                                                    )}
                                                    <Button
                                                        variant={pagination.page === page ? "default" : "outline"}
                                                        onClick={() => handlePageChange(page)}
                                                        disabled={loading}
                                                        className={`h-9 w-9 p-0 ${pagination.page === page
                                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                                            }`}
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            );
                                        })}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.pages || loading}
                                    className="h-9 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <div className="p-6 pt-8 flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center">
                            <Trash2 size={32} className="text-red-500" />
                        </div>
                        <div className="space-y-2">
                            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                Confirm Deletion
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm">
                                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{jobToDelete?.title}"</span>?
                                This action cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1 bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none text-xs font-semibold"
                            onClick={handleDelete}
                        >
                            Delete Permanently
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
