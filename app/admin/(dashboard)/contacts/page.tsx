"use client";

import React, { useEffect, useState } from "react";
import {
    MessageSquare,
    Calendar,
    Mail,
    Loader2,
    Trash2,
    Eye,
    Search,
    User,
    MessageSquareText,
    ChevronLeft,
    ChevronRight,
    Phone,
    MoreVertical,
    FileText
} from "lucide-react";
import { Loader } from "@/components/self-made-ui/loader";
import toast from "react-hot-toast";
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
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'pending' | 'read' | 'replied' | 'archived';
    createdAt: string;
}

const statusConfig = {
    pending: { label: "New Message", color: "text-blue-500 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/50" },
    read: { label: "Read", color: "text-purple-500 bg-purple-50/50 dark:bg-purple-900/20 border-purple-200/50 dark:border-purple-800/50" },
    replied: { label: "Replied", color: "text-green-500 bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50" },
    archived: { label: "Archived", color: "text-gray-500 bg-gray-50/50 dark:bg-gray-800/20 border-gray-200/50 dark:border-gray-800/50" },
};

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    });

    const fetchContacts = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/contacts?page=${page}&limit=10`);
            if (!res.ok) throw new Error("Failed to fetch contacts");
            const data = await res.json();
            setContacts(data.contacts);
            setPagination(data.pagination);
        } catch (error) {
            toast.error("Error loading contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            const updatedContacts = contacts.map(c => c._id === id ? { ...c, status: newStatus as any } : c);
            setContacts(updatedContacts);

            // Always check if we need to update the selected contact view
            setSelectedContact(prev => {
                if (prev?._id === id) {
                    return { ...prev, status: newStatus as any };
                }
                return prev;
            });

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
            const res = await fetch(`/api/admin/contacts/${idToDelete}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete contact");

            setContacts(contacts.filter(c => c._id !== idToDelete));
            if (selectedContact?._id === idToDelete) {
                setSelectedContact(null);
            }
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            toast.success("Message deleted successfully");
        } catch (error) {
            toast.error("Error deleting message");
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

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && pagination.page === 1) {
        return <Loader />;
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 lg:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Contact Messages ({pagination.total})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        View and manage messages from your website visitors.
                    </p>
                </div>

                <div className="relative max-w-md w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input
                        type="text"
                        placeholder="Search messages..."
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
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Information</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Subject</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <MessageSquare size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No messages found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr
                                        key={contact._id}
                                        onClick={() => {
                                            if (contact.status === 'pending') {
                                                // Optimistically update the local view state so the dialog opens as 'read'
                                                const readContact = { ...contact, status: 'read' as const };
                                                setSelectedContact(readContact);
                                                updateStatus(contact._id, 'read');
                                            } else {
                                                setSelectedContact(contact);
                                            }
                                        }}
                                        className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500" />
                                                {formatDate(contact.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm uppercase">
                                                    {contact.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white">{contact.name}</span>
                                                    <a
                                                        href={`mailto:${contact.email}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs text-gray-400 truncate max-w-[150px] hover:text-blue-500 transition-colors"
                                                    >
                                                        {contact.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <FileText size={14} className="text-gray-400 shrink-0" />
                                                <span className="truncate max-w-[200px]">
                                                    {contact.subject || "No Subject"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge
                                                variant="secondary"
                                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-2 w-fit ${statusConfig[contact.status || 'pending'].color}`}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                                                {statusConfig[contact.status || 'pending'].label}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2 bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 z-150" align="end">
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedContact(contact);
                                                                if (contact.status === 'pending') {
                                                                    updateStatus(contact._id, 'read');
                                                                }
                                                            }}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                        >
                                                            <Eye size={16} />
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClick(contact._id);
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

                {/* Pagination Footer */}
                {pagination.pages > 1 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/30 dark:bg-gray-800/10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Showing <span className="font-bold text-gray-900 dark:text-white">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                                </span> of{" "}
                                <span className="font-bold text-gray-900 dark:text-white">{pagination.total}</span> <span className="hidden sm:inline">results</span>
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => fetchContacts(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-all shadow-none"
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Previous</span>
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                        .filter(page => {
                                            return page === 1 ||
                                                page === pagination.pages ||
                                                Math.abs(page - pagination.page) <= 1;
                                        })
                                        .map((page, index, array) => {
                                            const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                                            return (
                                                <React.Fragment key={page}>
                                                    {showEllipsisBefore && (
                                                        <span className="px-1 text-gray-400 select-none">...</span>
                                                    )}
                                                    <Button
                                                        variant={pagination.page === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => fetchContacts(page)}
                                                        className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm font-bold transition-all ${pagination.page === page
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
                                    onClick={() => fetchContacts(pagination.page + 1)}
                                    disabled={pagination.page === pagination.pages}
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

            <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
                <DialogContent className="sm:max-w-[650px] w-[95vw] sm:w-full p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl max-h-[92vh] flex flex-col">
                    <DialogHeader className="p-6 pt-12 md:p-8 md:px-9 md:pr-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center text-center md:text-left gap-4">
                            <div className="space-y-1">
                                <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Contact Message
                                </DialogTitle>
                                <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                                    Received on {selectedContact && formatDate(selectedContact.createdAt)}
                                </DialogDescription>
                            </div>
                            <div className={`w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-colors ${selectedContact && statusConfig[selectedContact.status || 'pending'].color}`}>
                                {selectedContact && statusConfig[selectedContact.status || 'pending'].label}
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
                                        onClick={() => selectedContact && updateStatus(selectedContact._id, key)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${selectedContact?.status === key
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
                                    Sender Name
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedContact?.name}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Mail size={14} className="text-blue-500 shrink-0" />
                                    Email Address
                                </h3>
                                <a href={`mailto:${selectedContact?.email}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-base block truncate transition-all">
                                    {selectedContact?.email}
                                </a>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Phone size={14} className="text-blue-500 shrink-0" />
                                    Phone Number
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedContact?.phone || "Not provided"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <FileText size={14} className="text-blue-500 shrink-0" />
                                    Subject
                                </h3>
                                <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
                                    {selectedContact?.subject || "No Subject"}
                                </p>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className="space-y-4 p-6 rounded-2xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquareText size={16} className="text-blue-500" />
                                Message Content
                            </h3>
                            <div className="bg-white dark:bg-gray-900/60 p-5 rounded-xl border border-gray-100 dark:border-gray-800/50 text-gray-700 dark:text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                                {selectedContact?.message}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                        <Button
                            variant="destructive"
                            className="bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none text-xs font-semibold gap-2 transition-all focus:ring-red-500/20"
                            onClick={() => selectedContact && handleDeleteClick(selectedContact._id)}
                        >
                            <Trash2 size={14} />
                            Delete
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold shadow-sm"
                            onClick={() => setSelectedContact(null)}
                        >
                            Dismiss
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Message?"
                description="Are you sure you want to permanently delete this message? This action cannot be undone."
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
