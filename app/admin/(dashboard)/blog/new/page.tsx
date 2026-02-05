"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    Upload,
    X,
    ChevronLeft,
    FileText,
    Type,
    Link2,
    Layout,
    Tags,
    User,
    Eye,
    Home
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/admin/rich-text-editor";
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

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().min(1, "Featured image is required"),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function NewBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            imageUrl: "",
        },
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                form.setValue("imageUrl", base64String, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        form.setValue("imageUrl", "", { shouldValidate: true });
    };

    const onSubmit = async (values: BlogFormValues) => {
        try {
            setLoading(true);
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Failed to create blog post");
            }

            toast.success("Blog post created successfully!");
            router.push("/admin/blog");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = () => {
        const title = form.getValues("title");
        if (!title) {
            toast.error("Please enter a title first");
            return;
        }
        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        form.setValue("slug", slug);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/admin/dashboard" className="flex items-center gap-2">
                                    <Home className="h-4 w-4 font-bold" />
                                    Dashboard
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/admin/blog">Blog</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>New Blog</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Blog</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Create your next masterpiece for the world to read.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 flex-1 md:flex-none"
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
                        Create Blog Post
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title and Slug */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <Type size={16} className="text-blue-500" />
                                            BLOG TITLE <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a catchy title..."
                                                {...field}
                                                className="h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                <Link2 size={16} className="text-blue-500" />
                                                URL SLUG <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <button
                                                type="button"
                                                onClick={generateSlug}
                                                className="text-[10px] text-blue-500 hover:underline uppercase font-bold"
                                            >
                                                Auto Generate
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 font-medium">/blog/</span>
                                            <FormControl>
                                                <Input
                                                    placeholder="your-article-slug"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                                    className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <FileText size={16} className="text-blue-500" />
                                            BLOG CONTENT <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Tell your story..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Sidebar area */}
                    <div className="space-y-8">
                        {/* Featured Image */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={() => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <Upload size={16} className="text-blue-500" />
                                            FEATURED IMAGE <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            {!imagePreview ? (
                                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-4 transition-all hover:border-blue-500/50">
                                                    <FileUpload onChange={handleImageChange} className="p-6" />
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md group">
                                                        <Image
                                                            src={imagePreview}
                                                            alt="Blog preview"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        {/* Desktop Hover Overlay */}
                                                        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={removeImage}
                                                                className="rounded-full h-9 px-4 dark:bg-red-600 dark:hover:bg-red-700"
                                                            >
                                                                <X size={16} className="mr-2" /> Remove Image
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {/* Mobile Remove Button */}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={removeImage}
                                                        className="w-full md:hidden bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none"
                                                    >
                                                        <X size={16} className="mr-2" /> Remove Image
                                                    </Button>
                                                </div>
                                            )}
                                        </FormControl>
                                        <p className="text-[10px] text-gray-400 text-center">Recommended size: 1920x1080px (16:9 Aspect Ratio)</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
