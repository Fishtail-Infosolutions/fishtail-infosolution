"use client";

import React, { useEffect, useState } from "react";
import {
    MessageSquareQuote,
    Calendar,
    Mail,
    Globe,
    Loader2,
    ExternalLink,
    Clock,
    Trash2,
    Eye,
    Search,
    User,
    Building,
    MessageSquareText,
    ChevronLeft,
    ChevronRight,
    Phone
} from "lucide-react";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Quote {
    _id: string;
    websiteUrl: string;
    seoGoals?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: 'pending' | 'reviewed' | 'responded' | 'completed';
    createdAt: string;
}

const statusConfig = {
    pending: { label: "Not Responded", color: "text-blue-500 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/50" },
    reviewed: { label: "Reviewed", color: "text-purple-500 bg-purple-50/50 dark:bg-purple-900/20 border-purple-200/50 dark:border-purple-800/50" },
    responded: { label: "Responded", color: "text-orange-500 bg-orange-50/50 dark:bg-orange-900/20 border-orange-200/50 dark:border-orange-800/50" },
    completed: { label: "Closed", color: "text-green-500 bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50" },
};

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchQuotes = async () => {
        try {
            const res = await fetch("/api/quotes");
            if (!res.ok) throw new Error("Failed to fetch quotes");
            const data = await res.json();
            setQuotes(data);
        } catch (error) {
            toast.error("Error loading quotes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/quotes/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            const updatedQuotes = quotes.map(q => q._id === id ? { ...q, status: newStatus as any } : q);
            setQuotes(updatedQuotes);

            if (selectedQuote?._id === id) {
                setSelectedQuote({ ...selectedQuote, status: newStatus as any });
            }

            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!idToDelete) return;

        try {
            const res = await fetch(`/api/quotes/${idToDelete}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete quote");

            setQuotes(quotes.filter(q => q._id !== idToDelete));
            if (selectedQuote?._id === idToDelete) {
                setSelectedQuote(null);
            }
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            toast.success("Quote deleted successfully");
        } catch (error) {
            toast.error("Error deleting quote");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredQuotes = quotes.filter(quote =>
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search term changes
    }, [searchTerm]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 lg:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Quote Requests ({filteredQuotes.length})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage and respond to your incoming client inquiries.
                    </p>
                </div>

                <div className="relative max-w-md w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full max-w-full bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500/20">
                    <table className="w-full text-left border-collapse min-w-[800px] table-auto">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Received Date</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Client Information</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Website URL</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {paginatedQuotes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <MessageSquareQuote size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No quote requests found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedQuotes.map((quote) => (
                                    <tr
                                        key={quote._id}
                                        onClick={() => setSelectedQuote(quote)}
                                        className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500" />
                                                {formatDate(quote.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {quote.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white">{quote.name}</span>
                                                    <a
                                                        href={`mailto:${quote.email}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
                                                    >
                                                        {quote.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <a
                                                href={quote.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out group/link"
                                            >
                                                <Globe size={12} className="text-gray-400 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors duration-200" />
                                                {quote.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}
                                                <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-all duration-200" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border tracking-wider ${statusConfig[quote.status || 'pending'].color}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                                {statusConfig[quote.status || 'pending'].label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedQuote(quote);
                                                }}
                                                variant="ghost"
                                                className="h-9 px-3 text-xs font-semibold gap-2 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all rounded-lg"
                                            >
                                                View Details
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
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-medium italic">
                            Page <span className="text-gray-900 dark:text-white">{currentPage}</span> of <span className="text-gray-900 dark:text-white">{totalPages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-8 px-2 text-xs font-bold gap-1 dark:bg-gray-900 shadow-sm"
                            >
                                <ChevronLeft size={14} />
                                Prev
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="h-8 px-2 text-xs font-bold gap-1 dark:bg-gray-900 shadow-sm"
                            >
                                Next
                                <ChevronRight size={14} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={!!selectedQuote} onOpenChange={(open) => !open && setSelectedQuote(null)}>
                <DialogContent className="sm:max-w-[650px] w-[95vw] sm:w-full p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl max-h-[92vh] flex flex-col">
                    <DialogHeader className="p-6 pt-12 md:p-8 md:px-9 md:pr-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center text-center md:text-left gap-4">
                            <div className="space-y-1">
                                <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Quote Request Details
                                </DialogTitle>
                                <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                                    Received on {selectedQuote && formatDate(selectedQuote.createdAt)}
                                </DialogDescription>
                            </div>
                            <div className={`w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest font-bold border transition-colors ${selectedQuote && statusConfig[selectedQuote.status || 'pending'].color}`}>
                                {selectedQuote && statusConfig[selectedQuote.status || 'pending'].label}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                        {/* Status Quick Update */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Mark Status As:</span>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => selectedQuote && updateStatus(selectedQuote._id, key)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${selectedQuote?.status === key
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
                            {/* Personal Details */}
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <User size={14} className="text-blue-500 shrink-0" />
                                    Client Name
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedQuote?.name}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Building size={14} className="text-blue-500 shrink-0" />
                                    Company Name
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedQuote?.company || "Personal Request"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Mail size={14} className="text-blue-500 shrink-0" />
                                    Email Workspace
                                </h3>
                                <a href={`mailto:${selectedQuote?.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 font-medium text-base block truncate transition-colors">
                                    {selectedQuote?.email}
                                </a>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Globe size={14} className="text-blue-500 shrink-0" />
                                    Target Website
                                </h3>
                                <div className="flex">
                                    <a
                                        href={selectedQuote?.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out group/dialog-link"
                                    >
                                        <span className="truncate max-w-[200px] md:max-w-[300px]">
                                            {selectedQuote?.websiteUrl?.replace(/^https?:\/\/(www\.)?/, '')}
                                        </span>
                                        <ExternalLink size={14} className="shrink-0 text-gray-400 group-hover/dialog-link:text-blue-600 dark:group-hover/dialog-link:text-blue-400 transition-all duration-200" />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Phone size={14} className="text-blue-500 shrink-0" />
                                    Contact Number
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedQuote?.phone || "Not provided"}
                                </p>
                            </div>
                        </div>

                        {/* Discussion / Goals */}
                        <div className="space-y-4 p-6 rounded-2xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquareText size={16} className="text-blue-500" />
                                Client's Goals & Perspective
                            </h3>
                            <div className="bg-white dark:bg-gray-900/60 p-5 rounded-xl border border-gray-100 dark:border-gray-800/50 text-gray-700 dark:text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                                {selectedQuote?.seoGoals || "No specific priorities were mentioned in the initial request."}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                        <Button
                            variant="destructive"
                            className="bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none text-xs font-semibold gap-2 transition-all focus:ring-red-500/20"
                            onClick={() => selectedQuote && handleDeleteClick(selectedQuote._id)}
                        >
                            <Trash2 size={14} />
                            Discard
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold shadow-sm"
                            onClick={() => setSelectedQuote(null)}
                        >
                            Dismiss
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

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
                                Are you sure you want to permanently delete this quote request? This action cannot be undone.
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
                            onClick={confirmDelete}
                        >
                            Delete Permanently
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

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
        </div >
    );
}
