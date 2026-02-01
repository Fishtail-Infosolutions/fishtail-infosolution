"use client";

import React, { useEffect, useState } from "react";
import {
    Plus,
    Trash2,
    Briefcase,
    Tags,
    AlertCircle,
    MoreVertical,
    Pencil,
    Loader2
} from "lucide-react";
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

interface JobCategory {
    _id: string;
    name: string;
    description?: string;
    jobCount?: number;
    createdAt: string;
}

const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function JobCategoriesPage() {
    const [categories, setCategories] = useState<JobCategory[]>([]);
    const [loading, setLoading] = useState(true);
    // Form state removed - using react-hook-form now
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<JobCategory | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<JobCategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const addForm = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const editForm = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/job-categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            toast.error("Error loading categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (values: CategoryFormValues) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/job-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create category");
            }

            const newCategory = await res.json();
            setCategories([newCategory, ...categories]);
            setIsAddModalOpen(false);
            addForm.reset();
            toast.success("Category added successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditCategory = async (values: CategoryFormValues) => {
        if (!categoryToEdit) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/job-categories/${categoryToEdit._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update category");
            }

            const updatedCategory = await res.json();
            setCategories(categories.map(c =>
                c._id === categoryToEdit._id ? updatedCategory : c
            ));
            setIsEditModalOpen(false);
            setCategoryToEdit(null);
            editForm.reset();
            toast.success("Category updated successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/job-categories/${categoryToDelete._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete category");

            setCategories(categories.filter(c => c._id !== categoryToDelete._id));
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error("Error deleting category");
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    {/* <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                        <Tags size={16} />
                        Recruitment Module
                    </div> */}
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Job Categories ({categories.length})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage your job departments and recruitment types.
                    </p>
                </div>
                <AddButton
                    onClick={() => setIsAddModalOpen(true)}
                    label="Add Category"
                />
            </div>

            {/* Content Section */}
            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Category Name</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Description</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">Total Jobs</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <Tags size={40} className="text-gray-400" />
                                            <p className="text-gray-500 font-medium italic">No categories found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm uppercase">
                                                    {category.name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-gray-900 dark:text-white">{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                                            {category.description || "-"}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold min-w-[40px]">
                                                {category.jobCount || 0}
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
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setCategoryToEdit(category);
                                                                editForm.reset({
                                                                    name: category.name,
                                                                    description: category.description || "",
                                                                });
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                        >
                                                            <Pencil size={16} />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setCategoryToDelete(category);
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

            {/* Add Category Dialog */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Add New Category
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                            Create a new category to group your job openings.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...addForm}>
                        <form onSubmit={addForm.handleSubmit(handleAddCategory)} className="p-6 md:p-8 space-y-6">
                            <FormField
                                control={addForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Tags size={14} className="text-blue-500" />
                                            Category Name <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g. Developer, Designer, SEO"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <AlertCircle size={14} className="text-blue-500" />
                                            Description (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Briefly describe what this category covers..."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        addForm.reset();
                                    }}
                                    className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold h-11 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-semibold h-11 rounded-xl"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Creating...
                                        </>
                                    ) : "Create Category"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Edit Category Dialog */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Edit Category
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                            Update the category information below.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(handleEditCategory)} className="p-6 md:p-8 space-y-6">
                            <FormField
                                control={editForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Tags size={14} className="text-blue-500" />
                                            Category Name <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g. Developer, Designer, SEO"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <AlertCircle size={14} className="text-blue-500" />
                                            Description (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Briefly describe what this category covers..."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setCategoryToEdit(null);
                                        editForm.reset();
                                    }}
                                    className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold h-11 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-semibold h-11 rounded-xl"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Updating...
                                        </>
                                    ) : "Update Category"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={categoryToDelete?.name}
                loading={isDeleting}
                description={
                    <>
                        Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{categoryToDelete?.name}"</span>?
                        Any jobs linked to this category may become uncategorized.
                    </>
                }
            />
        </div>
    );
}
