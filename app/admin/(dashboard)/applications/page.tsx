"use client";

import React, { useEffect, useState } from "react";
import {
    ClipboardList,
    Calendar,
    Mail,
    Phone,
    Briefcase,
    Loader2,
    ExternalLink,
    Trash2,
    Eye,
    Search,
    User,
    MapPin,
    FileText,
    Github,
    Globe,
    ChevronLeft,
    ChevronRight,
    Download,
    X
} from "lucide-react";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

interface Application {
    _id: string;
    job?: {
        _id: string;
        title: string;
    };
    jobTitle: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    workExperience: string;
    expectedSalary?: string;
    portfolioLink?: string;
    githubLink?: string;
    cvUrl: string;
    coverLetter?: string;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
    createdAt: string;
}

const statusConfig = {
    pending: { label: "Pending", color: "text-blue-500 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/50" },
    reviewed: { label: "Reviewed", color: "text-purple-500 bg-purple-50/50 dark:bg-purple-900/20 border-purple-200/50 dark:border-purple-800/50" },
    shortlisted: { label: "Shortlisted", color: "text-orange-500 bg-orange-50/50 dark:bg-orange-900/20 border-orange-200/50 dark:border-orange-800/50" },
    rejected: { label: "Rejected", color: "text-red-500 bg-red-50/50 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/50" },
    hired: { label: "Hired", color: "text-green-500 bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50" },
};

export function ApplicationsList() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get('job');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const url = jobId ? `/api/applications?job=${jobId}` : "/api/applications";
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch applications");
            const data = await res.json();
            setApplications(data);
        } catch (error) {
            toast.error("Error loading applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const clearFilter = () => {
        router.push('/admin/applications');
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            // Since we don't have a specific PATCH endpoint for applications yet, 
            // I'll assume standard REST: PATCH /api/applications/[id]
            // Wait, I only created POST and GET in /api/applications/route.ts
            // I need to create /api/applications/[id]/route.ts for DELETE/PATCH logic.
            // For now, I will write the fetch logic, but I MUST implement the API route next.
            const res = await fetch(`/api/applications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            const updatedApps = applications.map(app => app._id === id ? { ...app, status: newStatus as any } : app);
            setApplications(updatedApps);

            if (selectedApplication?._id === id) {
                setSelectedApplication({ ...selectedApplication, status: newStatus as any });
            }

            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id: string) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!idToDelete) return;

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/applications/${idToDelete}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete application");

            setApplications(applications.filter(app => app._id !== idToDelete));
            if (selectedApplication?._id === idToDelete) {
                setSelectedApplication(null);
            }
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            toast.success("Application deleted successfully");
        } catch (error) {
            toast.error("Error deleting application");
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredApplications = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search term changes
    }, [searchTerm]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 lg:p-0 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                        {jobId && applications.length > 0 ? `Applications for ${applications[0].jobTitle}` : `Applications (${filteredApplications.length})`}
                    </h1>
                    {jobId && (
                        <div className="flex items-center gap-3 py-1">
                            <span className="text-[12px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800/50">
                                Filtered by Job
                            </span>
                            <button
                                onClick={clearFilter}
                                className="text-[12px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 px-2.5 py-1 rounded-full hover:bg-red-500/15 transition-all border border-transparent hover:border-red-500/20 flex items-center gap-1.5"
                            >
                                <X size={12} /> Clear Filter
                            </button>
                        </div>
                    )}
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage and review incoming job applications.
                    </p>
                </div>

                <div className="relative max-w-md w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input
                        type="text"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full max-w-full bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500/20">
                    <table className="w-full text-left border-collapse min-w-[1000px] table-auto">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applied Date</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applicant</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Job Position</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Experience</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {paginatedApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <ClipboardList size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No applications found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedApplications.map((app) => (
                                    <tr
                                        key={app._id}
                                        onClick={() => setSelectedApplication(app)}
                                        className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500" />
                                                {formatDate(app.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {app.fullName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white">{app.fullName}</span>
                                                    <a
                                                        href={`mailto:${app.email}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs text-gray-400 hover:text-blue-500 active:text-blue-600 transition-colors"
                                                    >
                                                        {app.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                {app.jobTitle}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            {app.workExperience}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border tracking-wider ${statusConfig[app.status || 'pending'].color}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                                {statusConfig[app.status || 'pending'].label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedApplication(app);
                                                }}
                                                variant="ghost"
                                                className="h-9 px-3 text-xs font-semibold gap-2 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all rounded-lg"
                                            >
                                                Review
                                                <Eye size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/30 dark:bg-gray-800/10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Showing <span className="font-bold text-gray-900 dark:text-white">{startIndex + 1}</span> to{" "}
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {Math.min(startIndex + itemsPerPage, filteredApplications.length)}
                                </span> of{" "}
                                <span className="font-bold text-gray-900 dark:text-white">{filteredApplications.length}</span> <span className="hidden sm:inline">results</span>
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-all shadow-none"
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
                                                        onClick={() => setCurrentPage(page)}
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
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-all shadow-none"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Application Detail Modal */}
            <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
                <DialogContent className="sm:max-w-[700px] w-[95vw] sm:w-full p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl max-h-[92vh] flex flex-col">
                    <DialogHeader className="p-6 pt-12 md:p-8 md:px-9 md:pr-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center text-center md:text-left gap-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                                    {selectedApplication?.fullName.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                        {selectedApplication?.fullName}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                                        Applied for <span className="font-bold text-gray-900 dark:text-white">{selectedApplication?.jobTitle}</span>
                                    </DialogDescription>
                                </div>
                            </div>
                            <div className={`w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-colors ${selectedApplication && statusConfig[selectedApplication.status || 'pending'].color}`}>
                                {selectedApplication && statusConfig[selectedApplication.status || 'pending'].label}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                        {/* Status Quick Update */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Mark Status As:</span>
                            <div className="flex flex-wrap gap-2 text-foreground">
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => selectedApplication && updateStatus(selectedApplication._id, key)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${selectedApplication?.status === key
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
                                            : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-500'
                                            }`}
                                    >
                                        {config.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Mail size={14} className="text-blue-500 shrink-0" />
                                    Email Address
                                </h3>
                                <a href={`mailto:${selectedApplication?.email}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm md:text-base block truncate transition-all">
                                    {selectedApplication?.email}
                                </a>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Phone size={14} className="text-blue-500 shrink-0" />
                                    Phone Number
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedApplication?.phone}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={14} className="text-blue-500 shrink-0" />
                                    Location
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedApplication?.address}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={14} className="text-blue-500 shrink-0" />
                                    Experience
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base">
                                    {selectedApplication?.workExperience}
                                </p>
                            </div>

                            {(selectedApplication?.portfolioLink) && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Globe size={14} className="text-blue-500 shrink-0" />
                                        Portfolio
                                    </h3>
                                    <div className="flex">
                                        <a
                                            href={selectedApplication.portfolioLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out group/dialog-link"
                                        >
                                            <span className="truncate max-w-[200px] md:max-w-[300px]">
                                                {selectedApplication.portfolioLink.replace(/^https?:\/\/(www\.)?/, '')}
                                            </span>
                                            <ExternalLink size={14} className="shrink-0 text-gray-400 group-hover/dialog-link:text-blue-600 dark:group-hover/dialog-link:text-blue-400 transition-all duration-200" />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {(selectedApplication?.githubLink) && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Github size={14} className="text-blue-500 shrink-0" />
                                        GitHub
                                    </h3>
                                    <a href={selectedApplication.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate block transition-all">
                                        {selectedApplication.githubLink.replace(/^https?:\/\/(www\.)?/, '')}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Resume Download */}
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-200 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Candidate Resume</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF / DOCX Format</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto"
                                onClick={() => window.open(selectedApplication?.cvUrl, '_blank')}
                            >
                                <Download size={14} />
                                View Resume
                            </Button>
                        </div>

                        {/* Cover Letter */}
                        {selectedApplication?.coverLetter && (
                            <div className="space-y-4 p-6 rounded-2xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText size={16} className="text-blue-500" />
                                    Cover Letter
                                </h3>
                                <div className="bg-white dark:bg-gray-900/60 p-5 rounded-xl border border-gray-100 dark:border-gray-800/50 text-gray-700 dark:text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                                    {selectedApplication.coverLetter}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                        <Button
                            variant="destructive"
                            className="bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none text-xs font-semibold gap-2 transition-all focus:ring-red-500/20"
                            onClick={() => selectedApplication && handleDeleteClick(selectedApplication._id)}
                        >
                            <Trash2 size={14} />
                            Delete
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold shadow-sm"
                            onClick={() => setSelectedApplication(null)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Application?"
                description="Are you sure you want to permanently delete this application? This action cannot be undone."
                loading={isDeleting}
            />

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3b82f633;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3b82f666;
                }
            `}</style>
        </div>
    );
}

export default function ApplicationsPage() {
    return (
        <Suspense fallback={<Loader />}>
            <ApplicationsList />
        </Suspense>
    );
}
