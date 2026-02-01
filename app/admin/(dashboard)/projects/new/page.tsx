"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Type, Globe, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import Breadcrumb from "@/components/admin/breadcrumb";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    imageUrl: z.string().min(1, "Image is required"),
    projectUrl: z.string().min(1, "Project link is required").url("Must be a valid URL"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            imageUrl: "",
            projectUrl: "",
        },
    });

    const handleImageChange = async (newFiles: File[]) => {
        const file = newFiles[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('folder', 'projects');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            });

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();

            setImageFile(file);
            setImagePreview(data.path);
            form.setValue('imageUrl', data.path, { shouldValidate: true });
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        form.setValue('imageUrl', '', { shouldValidate: true });
    };

    const onSubmit = async (values: ProjectFormValues) => {
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create project");
            }

            toast.success("Project created successfully");
            router.push("/admin/projects");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mr-auto space-y-8 pb-20 pt-2 px-4 md:px-0">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Projects", href: "/admin/projects" },
                    { label: "Add Project" }
                ]}
            />

            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add New Project
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Showcase your latest work by adding a new project preview.
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Type size={14} className="text-blue-500" />
                                        Project Title <span className="text-red-500 font-bold">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. EcoShop E-commerce"
                                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Project URL */}
                        <FormField
                            control={form.control}
                            name="projectUrl"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Globe size={14} className="text-blue-500" />
                                        Live Project URL <span className="text-red-500 font-bold">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="https://..."
                                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Image Upload */}
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <ImageIcon size={14} className="text-blue-500" />
                                        Project Thumbnail <span className="text-red-500 font-bold">*</span>
                                    </FormLabel>

                                    {isUploading ? (
                                        <div className="w-full max-w-md aspect-video border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gray-50/50 dark:bg-gray-900/20">
                                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                            <p className="text-sm text-gray-500 font-medium">Uploading image...</p>
                                        </div>
                                    ) : !imagePreview ? (
                                        <div className="w-full max-w-md border border-dashed bg-white dark:bg-gray-900/50 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                                            <FileUpload onChange={handleImageChange} className="p-6" />
                                        </div>
                                    ) : (
                                        <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg group">
                                            <Image src={imagePreview} alt="Project preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={removeImage}
                                                    className="rounded-full bg-white/90 hover:bg-white text-red-500 border-none px-4"
                                                >
                                                    <X size={16} className="mr-2" />
                                                    Remove & Change
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {!imagePreview && !isUploading && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG up to 5MB are supported. Recommended aspect ratio 16:9.
                                        </div>
                                    )}

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/projects")}
                            className="flex-1 md:flex-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-11 px-8 rounded-xl font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 h-11 px-8 rounded-xl font-semibold"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : "Create Project"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
