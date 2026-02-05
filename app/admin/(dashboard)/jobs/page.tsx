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
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/self-made-ui/loader";
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
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

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
    applicationsCount?: number;
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/jobs`);
            if (!res.ok) throw new Error("Failed to fetch jobs");
            const data = await res.json();
            setJobs(data.jobs);
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
            setIsDeleting(true);
            const res = await fetch(`/api/jobs/${jobToDelete._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete job");

            setJobs(jobs.filter(j => j._id !== jobToDelete._id));
            setIsDeleteModalOpen(false);
            setJobToDelete(null);
            toast.success("Job deleted successfully");
        } catch (error) {
            toast.error("Error deleting job");
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const filteredJobs = jobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = (typeof job.category === 'object' && job.category !== null)
            ? job.category.name.toLowerCase().includes(searchQuery.toLowerCase())
            : "not specified".includes(searchQuery.toLowerCase());
        return titleMatch || categoryMatch;
    });

    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    // Reset page to 1 if search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Job Openings ({filteredJobs.length})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your job vacancies and recruitment listings.
                    </p>
                </div>
                <AddButton
                    href="/admin/jobs/new"
                    label="Add Job"
                />
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
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applications</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {paginatedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <Briefcase size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No jobs found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedJobs.map((job) => (
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
                                        <td className="px-6 py-5">
                                            <Link href={`/admin/applications?job=${job._id}`}>
                                                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold min-w-[40px] hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors cursor-pointer">
                                                    {job.applicationsCount || 0} Applications
                                                </span>
                                            </Link>
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
                {totalPages > 1 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/30 dark:bg-gray-800/10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Showing <span className="font-bold text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to{" "}
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {Math.min(currentPage * itemsPerPage, filteredJobs.length)}
                                </span> of{" "}
                                <span className="font-bold text-gray-900 dark:text-white">{filteredJobs.length}</span> <span className="hidden sm:inline">results</span>
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Previous</span>
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page => {
                                            return page === 1 ||
                                                page === totalPages ||
                                                Math.abs(page - currentPage) <= 1;
                                        })
                                        .map((page, index, array) => {
                                            const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                                            return (
                                                <React.Fragment key={page}>
                                                    {showEllipsisBefore && (
                                                        <span className="px-1 text-gray-400 select-none">...</span>
                                                    )}
                                                    <Button
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handlePageChange(page)}
                                                        disabled={loading}
                                                        className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm font-bold transition-all ${currentPage === page
                                                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                                                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-500"
                                                            }`}
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            );
                                        })}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={jobToDelete?.title}
                loading={isDeleting}
            />
        </div>
    );
}
