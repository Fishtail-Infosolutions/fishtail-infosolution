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
    Eye,
    FileText,
    Calendar,
    Tag,
    Clock
} from "lucide-react";
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";
import { format } from "date-fns";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    category: string;
    status: 'Draft' | 'Published';
    publishedAt: string;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export default function BlogManagementPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchBlogs = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/blogs?page=${page}&limit=10`);
            if (!res.ok) throw new Error("Failed to fetch blogs");
            const data = await res.json();
            setBlogs(data.blogs);
            setPagination(data.pagination);
        } catch (error) {
            toast.error("Error loading blogs");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleDelete = async () => {
        if (!blogToDelete) return;
        try {
            setIsDeleting(true);
            const res = await fetch(`/api/blogs/${blogToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete blog");
            toast.success("Blog post deleted successfully");
            setIsDeleteModalOpen(false);
            setBlogToDelete(null);
            fetchBlogs(blogs.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page);
        } catch (error) {
            toast.error("Error deleting blog");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && pagination.page === 1) return <Loader />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Blog Management ({pagination.total})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Create, edit and manage your company articles and news.
                    </p>
                </div>
                <AddButton
                    onClick={() => router.push("/admin/blog/new")}
                    label="Create Article"
                />
            </div>

            {/* Toolbar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    type="text"
                    placeholder="Search blogs by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                />
            </div>

            {/* Blogs Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Article</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <FileText size={48} className="text-gray-300" />
                                            <p className="text-gray-500 font-medium italic">No articles found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-20 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0">
                                                    <Image
                                                        src={blog.imageUrl}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[300px]">{blog.title}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[300px]">/{blog.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none font-medium">
                                                {blog.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${blog.status === 'Published' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                                <span className={`text-sm font-semibold ${blog.status === 'Published' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                                    {blog.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar size={12} />
                                                    {format(new Date(blog.createdAt), "MMM d, yyyy")}
                                                </div>
                                                {blog.status === 'Published' && (
                                                    <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-medium">
                                                        <Clock size={10} />
                                                        Published
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                                    onClick={() => router.push(`/admin/blog/${blog._id}/edit`)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                    onClick={() => {
                                                        setBlogToDelete(blog);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                                    onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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
                                    onClick={() => fetchBlogs(pagination.page - 1)}
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
                                                        onClick={() => fetchBlogs(page)}
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
                                    onClick={() => fetchBlogs(pagination.page + 1)}
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

            {/* Delete Confirmation */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Blog Post?"
                itemName={blogToDelete?.title}
                loading={isDeleting}
            />
        </div>
    );
}
