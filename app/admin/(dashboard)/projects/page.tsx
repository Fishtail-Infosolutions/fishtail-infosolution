"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Search,
    Pencil,
    Trash2,
    ExternalLink,
    Image as ImageIcon,
} from "lucide-react";
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import Image from "next/image";
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
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 8,
        pages: 0
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProjects = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/projects?page=${page}&limit=8`);
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            setProjects(data.projects);
            setPagination(data.pagination);
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
            fetchProjects(projects.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page);
        } catch (error) {
            toast.error("Error deleting project");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && pagination.page === 1) return <Loader />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Projects Showcase ({pagination.total})
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

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProjects.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                        <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium italic">No projects found</p>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <div key={project._id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            {/* Card Image */}
                            <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-gray-800">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full w-9 h-9"
                                        onClick={() => router.push(`/admin/projects/${project._id}/edit`)}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button size="icon" variant="destructive" className="rounded-full w-9 h-9 dark:bg-red-600 dark:hover:bg-red-700" onClick={() => {
                                        setProjectToDelete(project);
                                        setIsDeleteModalOpen(true);
                                    }}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 space-y-3">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">{project.title}</h3>
                                <div className="pt-2 border-t border-gray-50 dark:border-gray-800">
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
                                    >
                                        <ExternalLink size={12} />
                                        VIEW PROJECT
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Component */}
            {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchProjects(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="rounded-xl border-gray-200 dark:border-gray-800"
                    >
                        <ChevronLeft size={16} className="mr-1" /> Previous
                    </Button>
                    <span className="text-sm font-semibold text-gray-500">
                        Page <span className="text-gray-900 dark:text-white">{pagination.page}</span> of {pagination.pages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchProjects(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="rounded-xl border-gray-200 dark:border-gray-800"
                    >
                        Next <ChevronRight size={16} className="ml-1" />
                    </Button>
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
