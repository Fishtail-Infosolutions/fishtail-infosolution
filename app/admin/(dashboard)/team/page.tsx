"use client";

import React, { useEffect, useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Users,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Search,
    User,
    GripVertical,
    Loader2,
    X
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
    DialogFooter,
    DialogClose,
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

// Drag and Drop imports
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TeamCard, getPlatformIcon } from "@/components/companypage/team-card";

interface Social {
    platform: string;
    url: string;
}

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    description: string;
    imageUrl?: string;
    socials?: Social[];
    order: number;
    isActive: boolean;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

// Sortable Row Component
function SortableRow({ member, onDelete, children }: { member: TeamMember, onDelete: (member: TeamMember) => void, children: React.ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: member._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 'auto',
        position: isDragging ? 'relative' as const : 'static' as const,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ${isDragging ? "bg-blue-50 dark:bg-blue-900/20 shadow-lg" : ""}`}
        >
            <td className="px-4 py-5 w-12">
                <button
                    {...attributes}
                    {...listeners}
                    className="touch-none flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <GripVertical size={16} />
                </button>
            </td>
            {children}
        </tr>
    );
}

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
    const [memberToView, setMemberToView] = useState<TeamMember | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isReordering, setIsReordering] = useState(false);

    // Sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchTeamMembers = async (page: number = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/team?page=${page}&limit=10`);
            if (!res.ok) throw new Error("Failed to fetch team members");
            const data = await res.json();
            setTeamMembers(data.teamMembers);
            setPagination(data.pagination);
        } catch (error) {
            toast.error("Error loading team members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTeamMembers((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id);
                const newIndex = items.findIndex((item) => item._id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Trigger backend update
                updateOrder(newItems);

                return newItems;
            });
        }
    };

    const updateOrder = async (items: TeamMember[]) => {
        try {
            setIsReordering(true);
            const updates = items.map((item, index) => ({
                _id: item._id,
                order: index
            }));

            const res = await fetch('/api/team/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updates })
            });

            if (!res.ok) throw new Error("Failed to update order");
        } catch (error) {
            toast.error("Failed to save new order");
            fetchTeamMembers(pagination.page);
        } finally {
            setIsReordering(false);
        }
    };

    const handleDelete = async () => {
        if (!memberToDelete) return;

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/team/${memberToDelete._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete team member");

            setTeamMembers(teamMembers.filter(m => m._id !== memberToDelete._id));
            setIsDeleteModalOpen(false);
            setMemberToDelete(null);
            toast.success("Team member deleted successfully");

            if (teamMembers.length === 1 && pagination.page > 1) {
                fetchTeamMembers(pagination.page - 1);
            }
        } catch (error) {
            toast.error("Error deleting team member");
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchTeamMembers(newPage);
        }
    };

    const filteredTeamMembers = teamMembers.filter(member => {
        const nameMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
        const roleMatch = member.role.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || roleMatch;
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
                        Team Members ({pagination.total})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your company team members and their profiles.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {isReordering && <span className="text-sm text-blue-500 flex items-center gap-2 animate-pulse"><Loader2 size={14} className="animate-spin" /> Saving order...</span>}
                    <AddButton
                        href="/admin/team/new"
                        label="Add Team Member"
                    />
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search team members..."
                        className="pl-10 h-11 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                                        <span className="sr-only">Drag Handle</span>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Socials</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <SortableContext
                                    items={filteredTeamMembers.map(item => item._id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {filteredTeamMembers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No team members found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTeamMembers.map((member) => (
                                            <SortableRow key={member._id} member={member} onDelete={() => {
                                                setMemberToDelete(member);
                                                setIsDeleteModalOpen(true);
                                            }}>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        {member.imageUrl ? (
                                                            <div className="h-10 w-10 rounded-full overflow-hidden relative shadow-sm border border-gray-100 dark:border-gray-700">
                                                                <Image
                                                                    src={member.imageUrl}
                                                                    alt={member.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm uppercase">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 min-w-[200px]">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium">
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        {(member.socials || []).slice(0, 4).map((social, i) => {
                                                            const Icon = getPlatformIcon(social.platform);

                                                            let hoverColorClass = "hover:text-gray-900 dark:hover:text-white";
                                                            switch (social.platform.toLowerCase()) {
                                                                case 'facebook':
                                                                    hoverColorClass = "hover:text-[#1877F2]";
                                                                    break;
                                                                case 'linkedin':
                                                                    hoverColorClass = "hover:text-[#0e76a8]";
                                                                    break;
                                                                case 'twitter':
                                                                case 'x':
                                                                    hoverColorClass = "hover:text-[#1DA1F2]";
                                                                    break;
                                                                case 'instagram':
                                                                    hoverColorClass = "hover:text-pink-600";
                                                                    break;
                                                                case 'github':
                                                                    hoverColorClass = "hover:text-gray-900 dark:hover:text-white";
                                                                    break;
                                                            }

                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={social.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    title={social.platform}
                                                                    className={`flex items-center justify-center text-gray-400 transition-colors duration-300 ${hoverColorClass}`}
                                                                >
                                                                    <Icon className="w-4 h-4" />
                                                                </a>
                                                            )
                                                        })}
                                                        {(member.socials?.length || 0) > 4 && (
                                                            <span className="text-xs text-gray-400 pl-1">
                                                                +{member.socials!.length - 4}
                                                            </span>
                                                        )}
                                                        {(!member.socials || member.socials.length === 0) && (
                                                            <span className="text-gray-400 text-sm">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <Badge
                                                        variant={member.isActive ? "default" : "secondary"}
                                                        className={member.isActive
                                                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40 border-green-200 dark:border-green-900"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"}
                                                    >
                                                        {member.isActive ? "Active" : "Inactive"}
                                                    </Badge>
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
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() => {
                                                                        setMemberToView(member);
                                                                        setIsViewModalOpen(true);
                                                                    }}
                                                                    className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 hover:text-green-600 dark:hover:text-green-400"
                                                                >
                                                                    <Eye size={16} />
                                                                    View
                                                                </Button>
                                                                <Link href={`/admin/team/${member._id}/edit`}>
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
                                                                        setMemberToDelete(member);
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
                                            </SortableRow>
                                        ))
                                    )}
                                </SortableContext>
                            </tbody>
                        </table>
                    </DndContext>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/30 dark:bg-gray-800/10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Showing <span className="font-bold text-gray-900 dark:text-white">{((pagination.page - 1) * pagination.limit) + 1}</span> to{" "}
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                                </span> of{" "}
                                <span className="font-bold text-gray-900 dark:text-white">{pagination.total}</span> <span className="hidden sm:inline">results</span>
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1 || loading}
                                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs font-semibold gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
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
                                                        onClick={() => handlePageChange(page)}
                                                        disabled={loading}
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
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.pages || loading}
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

            {/* View Member Dialog */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent showCloseButton={false} className="sm:max-w-[425px] p-0 bg-transparent border-none shadow-none text-foreground">
                    {memberToView && (
                        <div className="relative w-full h-full">
                            <DialogTitle className="sr-only">View Team Member: {memberToView.name}</DialogTitle>
                            <TeamCard
                                member={memberToView}
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                                disableHover={true}
                            />
                            <DialogClose className="absolute top-3 right-7 z-50 p-2 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all ring-0 outline-none focus:outline-none">
                                <X size={18} />
                            </DialogClose>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={memberToDelete?.name}
                loading={isDeleting}
            />
        </div>
    );
}
