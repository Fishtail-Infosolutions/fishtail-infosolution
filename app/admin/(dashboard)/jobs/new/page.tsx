"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Briefcase, Tags, MapPin, DollarSign, FileText, ListChecks, Users, Calendar, Home } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

interface JobCategory {
    _id: string;
    name: string;
}

const jobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    category: z.string().optional(),
    type: z.string().min(1, "Job type is required"),
    locationType: z.enum(["Onsite", "Remote", "Hybrid"]),
    description: z.string().min(1, "Job description is required"),
    salary: z.string().optional(),
    requirements: z.string().optional(),
    responsibilities: z.string().optional(),
    openings: z.string().optional(),
    deadline: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function NewJobPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<JobCategory[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            category: "",
            type: "Full-time",
            locationType: "Onsite",
            description: "",
            salary: "",
            requirements: "",
            responsibilities: "",
            openings: "1",
            deadline: "",
        },
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/job-categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            toast.error("Error loading categories");
        }
    };

    const handleIconChange = (newFiles: File[]) => {
        const file = newFiles[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file");
                return;
            }
            setIconFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeIcon = () => {
        setIconFile(null);
        setIconPreview(null);
    };

    const onSubmit = async (values: JobFormValues) => {
        setIsSubmitting(true);

        try {
            let iconPath = null;

            // Upload icon if provided
            if (iconFile) {
                const iconFormData = new FormData();
                iconFormData.append("file", iconFile);
                iconFormData.append("folder", "jobs");

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: iconFormData,
                });

                if (!uploadRes.ok) throw new Error("Failed to upload icon");
                const uploadData = await uploadRes.json();
                iconPath = uploadData.path;
            }

            // Create job
            const jobFormData = new FormData();
            jobFormData.append("title", values.title);
            jobFormData.append("category", values.category || "");
            if (iconPath) jobFormData.append("icon", iconPath);
            jobFormData.append("type", values.type);
            jobFormData.append("locationType", values.locationType);
            jobFormData.append("description", values.description);
            jobFormData.append("salary", values.salary || "");
            jobFormData.append("openings", values.openings || "1");
            jobFormData.append("deadline", values.deadline || "");
            jobFormData.append("requirements", JSON.stringify(
                (values.requirements || "").split("\n").filter(r => r.trim())
            ));
            jobFormData.append("responsibilities", JSON.stringify(
                (values.responsibilities || "").split("\n").filter(r => r.trim())
            ));

            const res = await fetch("/api/jobs", {
                method: "POST",
                body: jobFormData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create job");
            }

            toast.success("Job created successfully");
            router.push("/admin/jobs");
        } catch (error: any) {
            console.error("Error creating job:", error);
            toast.error(error.message || "Failed to create job");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mr-auto space-y-8 pb-20 pt-2 px-4 md:px-0">
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
                            <Link href="/admin/jobs">Jobs</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Job</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add New Job
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Create a new job vacancy listing.
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">
                        {/* Icon Upload */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Upload size={14} className="text-blue-500" />
                                Job Icon (Optional)
                            </label>

                            {!iconPreview ? (
                                <div className="w-full max-w-sm border border-dashed bg-white dark:bg-gray-900/50 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                                    <FileUpload onChange={handleIconChange} className="p-6" imagesOnly={true} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-6 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                                        <Image src={iconPreview || ""} alt="Icon preview" fill className="object-cover" unoptimized />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {iconFile?.name || "Selected Icon"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(iconFile?.size ? (iconFile.size / (1024 * 1024)).toFixed(2) : "0")} MB
                                        </p>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={removeIcon}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 px-2 -ml-2"
                                        >
                                            <X size={14} className="mr-1" />
                                            Remove Image
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {!iconPreview && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG, SVG up to 5MB are supported.
                                </div>
                            )}
                        </div>

                        {/* General Information Section */}
                        <div className="space-y-6 pt-2">
                            <div className="border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-500" />
                                    General Information
                                </h2>
                            </div>

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            Job Title <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Web Developer, Designer, etc."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Category & Type - Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Tags size={14} className="text-blue-500" />
                                            Category <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent position="popper" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Job Type <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                                    <SelectValue placeholder="Select job type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent position="popper" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                                <SelectItem value="Full-time">Full-time</SelectItem>
                                                <SelectItem value="Part-time">Part-time</SelectItem>
                                                <SelectItem value="Contract">Contract</SelectItem>
                                                <SelectItem value="Internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Location & Salary - Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="locationType"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <MapPin size={14} className="text-blue-500" />
                                            Location Type <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                                    <SelectValue placeholder="Select location type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent position="popper" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                                <SelectItem value="Onsite">Onsite</SelectItem>
                                                <SelectItem value="Remote">Remote</SelectItem>
                                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <DollarSign size={14} className="text-blue-500" />
                                            Salary (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Negotiable or Range"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Openings & Deadline - Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="openings"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Users size={14} className="text-blue-500" />
                                            No. of Openings
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                                placeholder="1"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar size={14} className="text-blue-500" />
                                            Application Deadline
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Ex: Feb 15, 2026"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Job Details Section */}
                        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="pb-2">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <FileText size={16} className="text-blue-500" />
                                    Job Details & Description
                                </h2>
                            </div>

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            Job Description <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Brief overview of the role and responsibilities..."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[120px]"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Requirements */}
                        <FormField
                            control={form.control}
                            name="requirements"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <ListChecks size={14} className="text-blue-500" />
                                        Requirements (One per line)
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter requirements (One per line)&#10;Ex: 3+ years experience with React"
                                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] font-mono text-sm"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />

                        {/* Responsibilities */}
                        <FormField
                            control={form.control}
                            name="responsibilities"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <ListChecks size={14} className="text-blue-500" />
                                        Responsibilities (One per line)
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter responsibilities (One per line)&#10;Ex: Develop and maintain web applications"
                                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] font-mono text-sm"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/jobs")}
                            className="flex-1 md:flex-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-11 px-8 rounded-xl font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 h-11 px-8 rounded-xl font-semibold"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : "Create Job"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
