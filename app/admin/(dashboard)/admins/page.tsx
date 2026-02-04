"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Users,
    MoreVertical,
    Pencil,
    Trash2,
    Search,
    User,
    Loader2,
    Shield,
    ShieldCheck,
    Mail,
    Lock,
    Tag,
    Activity,
} from "lucide-react";
import { AddButton } from "@/components/admin/add-button";
import { Loader } from "@/components/self-made-ui/loader";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label"; // Keep for non-form usage if any
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .or(z.literal(""))
        .optional(),
    role: z.enum(["admin", "super-admin"], {
        message: "Please select a role",
    }),
    isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminUser {
    _id: string;
    email: string;
    role: "admin" | "super-admin";
    isActive: boolean;
    createdAt: string;
}

export default function AdminsPage() {
    const router = useRouter();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
    const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Pagination state
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "admin",
            isActive: true,
        },
    });

    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/users?page=${page}&limit=10`);
            if (!res.ok) {
                if (res.status === 403) {
                    setIsUnauthorized(true);
                    toast.error("Access Denied: Super Admin privileges required");
                    setTimeout(() => {
                        router.replace("/admin/dashboard");
                    }, 1500);
                    return;
                }
                throw new Error("Failed to fetch users");
            }
            const data = await res.json();
            setUsers(data.users);
            setPagination(data.pagination);
        } catch (error) {
            toast.error("Error loading users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onAddSubmit = async (values: FormValues) => {
        if (!values.password) {
            form.setError("password", { message: "Password is required for new users" });
            return;
        }

        try {
            setIsSaving(true);
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create user");
            }

            toast.success("User created successfully");
            setIsAddModalOpen(false);
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || "Error creating user");
        } finally {
            setIsSaving(false);
        }
    };

    const onEditSubmit = async (values: FormValues) => {
        if (!userToEdit) return;

        try {
            setIsSaving(true);
            // Remove password if empty string to avoid hashing empty password
            const payload = { ...values };
            if (!payload.password) delete payload.password;

            const res = await fetch(`/api/admin/users/${userToEdit._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update user");
            }

            toast.success("User updated successfully");
            setIsEditModalOpen(false);
            setUserToEdit(null);
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || "Error updating user");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!userToDelete) return;

        if (userToDelete.role === "super-admin") {
            toast.error("Super Admins cannot be deleted for security reasons");
            setIsDeleteModalOpen(false);
            return;
        }

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/admin/users/${userToDelete._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete user");
            }

            setUsers(users.filter((u) => u._id !== userToDelete._id));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
            toast.success("User deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Error deleting user");
        } finally {
            setIsDeleting(false);
        }
    };


    const openEditModal = (user: AdminUser) => {
        setUserToEdit(user);
        form.reset({
            email: user.email,
            password: "",
            role: user.role,
            isActive: user.isActive,
        });
        setIsEditModalOpen(true);
    };

    const openAddModal = () => {
        form.reset({
            email: "",
            password: "",
            role: "admin",
            isActive: true,
        });
        setIsAddModalOpen(true);
    };

    const filteredUsers = users
        .filter((user) => {
            const emailMatch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const roleMatch = user.role.toLowerCase().includes(searchQuery.toLowerCase());
            return emailMatch || roleMatch;
        })
        .sort((a, b) => {
            if (a.role === "super-admin" && b.role !== "super-admin") return -1;
            if (a.role !== "super-admin" && b.role === "super-admin") return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    const getRoleBadge = (role: string) => {
        if (role === "super-admin") {
            return (
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-900">
                    <ShieldCheck size={12} className="mr-1" />
                    Super Admin
                </Badge>
            );
        }
        return (
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900">
                <Shield size={12} className="mr-1" />
                Admin
            </Badge>
        );
    };

    if (loading) {
        return <Loader />;
    }

    // Show unauthorized message if access is denied
    if (isUnauthorized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <div className="text-center space-y-4 max-w-md">
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <Shield size={40} className="text-red-600 dark:text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Access Denied
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        You don't have permission to access this page. Super Admin privileges are required.
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Redirecting you to the dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Admins ({users.length})
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Manage admin users and their permissions.
                    </p>
                </div>
                <AddButton onClick={openAddModal} label="Add Admin" />
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search admins..."
                        className="pl-10 h-11 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Admin
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No admins found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm uppercase">
                                                    {user.email.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">{getRoleBadge(user.role)}</td>
                                        <td className="px-6 py-5">
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    user.role === "super-admin"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900 cursor-default px-2.5 py-0.5 rounded-full"
                                                        : user.isActive
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900 cursor-default px-2.5 py-0.5 rounded-full"
                                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900 cursor-default px-2.5 py-0.5 rounded-full"
                                                }
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                                                {user.role === "super-admin" ? "Always Active" : user.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
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
                                                            onClick={() => openEditModal(user)}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                        >
                                                            <Pencil size={16} />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                if (user.role === "super-admin") {
                                                                    toast.error("Super Admins cannot be deleted");
                                                                    return;
                                                                }
                                                                setUserToDelete(user);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                            disabled={user.role === "super-admin"}
                                                            className="w-full justify-start gap-2 h-9 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    onClick={() => fetchUsers(pagination.page - 1)}
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
                                                        onClick={() => fetchUsers(page)}
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
                                    onClick={() => fetchUsers(pagination.page + 1)}
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

            {/* Add User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Add New Admin
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                            Create a new admin account. An email and password are required.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onAddSubmit)} className="p-6 md:p-8 space-y-6">
                            <FormField<FormValues>
                                control={form.control}
                                name="email"
                                render={({ field: { value, ...fieldProps } }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Mail size={14} className="text-blue-500" />
                                            Email Address <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. admin@company.com"
                                                {...fieldProps}
                                                value={value as string || ""}
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField<FormValues>
                                control={form.control}
                                name="password"
                                render={({ field: { value, ...fieldProps } }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Lock size={14} className="text-blue-500" />
                                            Password <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter secure password"
                                                {...fieldProps}
                                                value={value as string || ""}
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField<FormValues>
                                control={form.control}
                                name="role"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Shield size={14} className="text-blue-500" />
                                            Role <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <Select onValueChange={onChange} value={value as string}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="z-150 dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800">
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="super-admin">Super Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddModalOpen(false)}
                                    disabled={isSaving}
                                    className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold h-11 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-semibold h-11 rounded-xl"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Creating...
                                        </>
                                    ) : "Create Admin"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Edit Admin
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-xs md:text-sm font-medium">
                            Update admin account details. Leave password blank to keep current password.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onEditSubmit)} className="p-6 md:p-8 space-y-6">
                            <FormField<FormValues>
                                control={form.control}
                                name="email"
                                render={({ field: { value, ...fieldProps } }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Mail size={14} className="text-blue-500" />
                                            Email Address <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. admin@company.com"
                                                {...fieldProps}
                                                value={value as string || ""}
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField<FormValues>
                                control={form.control}
                                name="password"
                                render={({ field: { value, ...fieldProps } }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Lock size={14} className="text-blue-500" />
                                            Password <span className="normal-case font-normal text-muted-foreground ml-auto">(Leave blank to keep)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter new password"
                                                {...fieldProps}
                                                value={value as string || ""}
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            {userToEdit?.role === "super-admin" ? (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                                        <ShieldCheck size={18} />
                                        System Protected Account
                                    </div>
                                    <p className="text-xs text-blue-600/80 dark:text-blue-400/60 leading-relaxed">
                                        Super Admin accounts have permanent Role and Active status for system security. These settings cannot be modified.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField<FormValues>
                                        control={form.control}
                                        name="role"
                                        render={({ field: { value, onChange } }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                    <Shield size={14} className="text-blue-500" />
                                                    Role <span className="text-red-500 font-bold">*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={onChange}
                                                    value={value as string}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="z-150 dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800">
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="super-admin">Super Admin</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField<FormValues>
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                    <Activity size={14} className="text-blue-500" />
                                                    Status <span className="text-red-500 font-bold">*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value === "active")}
                                                    defaultValue={field.value ? "active" : "inactive"}
                                                    value={field.value ? "active" : "inactive"}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl h-11">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="z-150 dark:bg-[#0B0F1A] border-gray-200 dark:border-gray-800">
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                    disabled={isSaving}
                                    className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold h-11 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-semibold h-11 rounded-xl"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Updating...
                                        </>
                                    ) : "Update Admin"}
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
                onConfirm={handleDelete}
                itemName={userToDelete?.email}
                loading={isDeleting}
            />
        </div>
    );
}
