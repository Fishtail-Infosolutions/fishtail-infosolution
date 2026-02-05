"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Search,
    MoreVertical,
    Pencil,
    Trash2,
    ExternalLink,
    Image as ImageIcon,
} from "lucide-react";
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/self-made-ui/loader";
import toast from "react-hot-toast";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

interface Project {
    _id: string;
    title: string;
    imageUrl: string;
    projectUrl: string;
    createdAt: string;
    category?: string;
    description?: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export default function ProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/projects`);
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            setProjects(data.projects);
        } catch (error) {
            toast.error("Error loading projects");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDelete = async () => {
        if (!projectToDelete) return;
        try {
            setIsDeleting(true);
            const res = await fetch(`/api/projects/${projectToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete project");
            toast.success("Project deleted successfully");
            setIsDeleteModalOpen(false);
            setProjectToDelete(null);
            fetchProjects();
        } catch (error) {
            toast.error("Error deleting project");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading && projects.length === 0) return <Loader />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Projects Showcase ({filteredProjects.length})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your portfolio and showcase your best work.
                    </p>
                </div>
                <AddButton
                    onClick={() => router.push("/admin/projects/new")}
                    label="Add Project"
                />
            </div>

            {/* Toolbar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    type="text"
                    placeholder="Search projects by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl focus:ring-blue-500/20"
                />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Links
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {paginatedProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No projects found
                                    </td>
                                </tr>
                            ) : (
                                paginatedProjects.map((project) => (
                                    <tr
                                        key={project._id}
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-16 rounded-lg overflow-hidden relative shadow-sm border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shrink-0">
                                                    <Image
                                                        src={project.imageUrl}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {project.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                <ExternalLink size={14} />
                                                View Project
                                            </a>
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
                                                <PopoverContent className="w-48 p-2 bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 z-150" align="end">
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => router.push(`/admin/projects/${project._id}/edit`)}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                        >
                                                            <Pencil size={16} />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setProjectToDelete(project);
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
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/30 dark:bg-gray-800/10 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Showing <span className="font-bold text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to{" "}
                            <span className="font-bold text-gray-900 dark:text-white">
                                {Math.min(currentPage * itemsPerPage, filteredProjects.length)}
                            </span> of{" "}
                            <span className="font-bold text-gray-900 dark:text-white">{filteredProjects.length}</span> <span className="hidden sm:inline">results</span>
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(currentPage - 1)}
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
                                                    onClick={() => setCurrentPage(page)}
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
                                onClick={() => setCurrentPage(currentPage + 1)}
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

            {/* Delete Confirmation */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Project?"
                itemName={projectToDelete?.title}
                loading={isDeleting}
            />
        </div>
    );
}
