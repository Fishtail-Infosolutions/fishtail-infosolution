"use client";

import React, { useEffect, useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Search,
    Pencil,
    Trash2,
    ExternalLink,
    Image as ImageIcon,
    Loader2,
    Upload
} from "lucide-react";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
    _id: string;
    title: string;
    imageUrl: string;
    projectUrl: string;
    category: string;
    description: string;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 8,
        pages: 0
    });

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        projectUrl: "",
        category: "Development",
        description: ""
    });

    const [uploading, setUploading] = useState(false);

    const fetchProjects = async (page: number = 1) => {
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
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('folder', 'projects');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            });

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setFormData(prev => ({ ...prev, imageUrl: data.path }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const url = editingProject
                ? `/api/projects/${editingProject._id}`
                : "/api/projects";
            const method = editingProject ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save project");

            toast.success(editingProject ? "Project updated" : "Project added");
            setIsModalOpen(false);
            fetchProjects(pagination.page);
        } catch (error) {
            toast.error("Error saving project");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!projectToDelete) return;
        try {
            const res = await fetch(`/api/projects/${projectToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete project");
            toast.success("Project deleted");
            setIsDeleteModalOpen(false);
            fetchProjects(projects.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page);
        } catch (error) {
            toast.error("Error deleting project");
        }
    };

    const openAddModal = () => {
        setEditingProject(null);
        setFormData({
            title: "",
            imageUrl: "",
            projectUrl: "",
            category: "Development",
            description: ""
        });
        setIsModalOpen(true);
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            imageUrl: project.imageUrl,
            projectUrl: project.projectUrl,
            category: project.category,
            description: project.description
        });
        setIsModalOpen(true);
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && pagination.page === 1) return <Loader />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Projects Showcase ({pagination.total})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your portfolio and showcase your best work.
                    </p>
                </div>
                <Button
                    onClick={openAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-6 h-11 rounded-xl font-semibold gap-2"
                >
                    <Plus size={18} />
                    Add Project
                </Button>
            </div>

            {/* toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProjects.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <ImageIcon size={48} className="mx-auto text-gray-400 mb-4 opacity-20" />
                        <p className="text-gray-500 font-medium italic">No projects found</p>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <div key={project._id} className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            {/* Image Preview */}
                            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="icon" variant="secondary" className="rounded-full w-10 h-10" onClick={() => openEditModal(project)}>
                                        <Pencil size={18} />
                                    </Button>
                                    <Button size="icon" variant="destructive" className="rounded-full w-10 h-10" onClick={() => {
                                        setProjectToDelete(project);
                                        setIsDeleteModalOpen(true);
                                    }}>
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 rounded-md bg-white/90 dark:bg-black/80 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 space-y-3">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">{project.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[40px]">
                                    {project.description || "No description provided."}
                                </p>
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

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => fetchProjects(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="rounded-xl"
                    >
                        <ChevronLeft size={18} />
                    </Button>
                    <span className="text-sm font-medium">Page {pagination.page} of {pagination.pages}</span>
                    <Button
                        variant="ghost"
                        onClick={() => fetchProjects(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="rounded-xl"
                    >
                        <ChevronRight size={18} />
                    </Button>
                </div>
            )}

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                        <DialogDescription>
                            Fill in the details to showcase your project.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. EcoShop E-commerce"
                                required
                                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. Web Dev"
                                    required
                                    className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Link</label>
                                <Input
                                    value={formData.projectUrl}
                                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                    placeholder="https://..."
                                    required
                                    className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Short overview of the project..."
                                rows={3}
                                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Image</label>
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
                                    {formData.imageUrl ? (
                                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <ImageIcon className="text-gray-300" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm font-semibold transition-colors"
                                    >
                                        {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                        {formData.imageUrl ? "Change Image" : "Upload Image"}
                                    </label>
                                    <p className="text-[10px] text-gray-500 mt-2">Recommended: 16:9 aspect ratio</p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="pt-4 gap-2">
                            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-6">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSaving || uploading}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 shadow-lg shadow-blue-500/20"
                            >
                                {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                                {editingProject ? "Update Project" : "Create Project"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <div className="p-6 pt-8 flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center">
                            <Trash2 size={32} className="text-red-500" />
                        </div>
                        <div className="space-y-2">
                            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                Delete Project?
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 text-sm">
                                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{projectToDelete?.title}"</span>? This cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 bg-white dark:bg-gray-800 rounded-xl"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
