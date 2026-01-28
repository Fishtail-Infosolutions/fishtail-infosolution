"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Upload, X, Briefcase, Tags, MapPin, DollarSign, FileText, ListChecks, Users, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import Breadcrumb from "@/components/admin/breadcrumb";
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

interface JobCategory {
    _id: string;
    name: string;
}

interface Job {
    _id: string;
    title: string;
    category: string | {
        _id: string;
        name: string;
    };
    icon?: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    salary?: string;
    deadline?: string;
    openings?: number;
}

export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;

    const [categories, setCategories] = useState<JobCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [currentIcon, setCurrentIcon] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        type: "Full-time",
        location: "",
        description: "",
        salary: "",
        requirements: "",
        responsibilities: "",
        deadline: "",
        openings: "1",
    });

    useEffect(() => {
        fetchCategories();
        fetchJob();
    }, [jobId]);

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

    const fetchJob = async () => {
        try {
            const res = await fetch(`/api/jobs/${jobId}`);
            if (!res.ok) throw new Error("Failed to fetch job");
            const job: Job = await res.json();

            setFormData({
                title: job.title,
                category: typeof job.category === 'object' ? job.category._id : job.category,
                type: job.type,
                location: job.location,
                description: job.description,
                salary: job.salary || "",
                requirements: job.requirements.join("\n"),
                responsibilities: job.responsibilities.join("\n"),
                deadline: job.deadline || "",
                openings: job.openings?.toString() || "1",
            });

            if (job.icon) {
                setCurrentIcon(job.icon);
                setIconPreview(job.icon);
            }
        } catch (error) {
            toast.error("Error loading job");
            router.push("/admin/jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleIconChange = (newFiles: File[]) => {
        const file = newFiles[0];
        if (file) {
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
        setCurrentIcon(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let iconPath = currentIcon;

            // Upload new icon if provided
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

            // Update job
            const jobFormData = new FormData();
            jobFormData.append("title", formData.title);
            jobFormData.append("category", formData.category);
            if (iconPath) jobFormData.append("icon", iconPath);
            jobFormData.append("type", formData.type);
            jobFormData.append("location", formData.location);
            jobFormData.append("description", formData.description);
            jobFormData.append("salary", formData.salary);
            jobFormData.append("openings", formData.openings);
            jobFormData.append("deadline", formData.deadline);
            jobFormData.append("requirements", JSON.stringify(
                formData.requirements.split("\n").filter(r => r.trim())
            ));
            jobFormData.append("responsibilities", JSON.stringify(
                formData.responsibilities.split("\n").filter(r => r.trim())
            ));

            const res = await fetch(`/api/jobs/${jobId}`, {
                method: "PUT",
                body: jobFormData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to update job");
            }

            toast.success("Job updated successfully");
            router.push("/admin/jobs");
        } catch (error: any) {
            console.error("Error updating job:", error);
            toast.error(error.message || "Failed to update job");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <p className="text-gray-500 animate-pulse font-medium">Loading job...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mr-auto space-y-8 pb-20 pt-2 px-4 md:px-0">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Jobs", href: "/admin/jobs" },
                    { label: "Edit Job" }
                ]}
            />

            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Edit Job
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Update the job vacancy details.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">
                    {/* Icon Upload */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <Upload size={14} className="text-blue-500" />
                            Job Icon (Optional)
                        </label>

                        {!iconPreview ? (
                            <div className="w-full max-w-sm min-h-48 border border-dashed bg-white dark:bg-gray-900/50 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                                <FileUpload onChange={handleIconChange} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-6 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                                    <Image src={iconPreview || ""} alt="Icon preview" fill className="object-cover" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {iconFile?.name || (currentIcon ? "Current Icon" : "Selected Icon")}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {iconFile?.size
                                            ? (iconFile.size / (1024 * 1024)).toFixed(2) + " MB"
                                            : "Custom Icon"}
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
                            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
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
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                Job Title *
                            </label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Web Developer, Designer, etc."
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    {/* Category & Type - Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Tags size={14} className="text-blue-500" />
                                Category *
                            </label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                                required
                            >
                                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                    {categories.map((cat) => (
                                        <SelectItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Job Type *
                            </label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                                required
                            >
                                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Location & Salary - Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <MapPin size={14} className="text-blue-500" />
                                Location
                            </label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Ex: Kathmandu, Nepal"
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <DollarSign size={14} className="text-blue-500" />
                                Salary (Optional)
                            </label>
                            <Input
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                placeholder="Negotiable or Range"
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Openings & Deadline - Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Users size={14} className="text-blue-500" />
                                No. of Openings
                            </label>
                            <Input
                                type="number"
                                min="1"
                                value={formData.openings}
                                onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                                placeholder="1"
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Calendar size={14} className="text-blue-500" />
                                Application Deadline
                            </label>
                            <Input
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                placeholder="Ex: Feb 15, 2026"
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                            />
                        </div>
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
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                Job Description *
                            </label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief overview of the role and responsibilities..."
                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[120px]"
                                required
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <ListChecks size={14} className="text-blue-500" />
                            Requirements (One per line)
                        </label>
                        <Textarea
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            placeholder="Enter requirements (One per line)&#10;Ex: 3+ years experience with React"
                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] font-mono text-sm"
                        />
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <ListChecks size={14} className="text-blue-500" />
                            Responsibilities (One per line)
                        </label>
                        <Textarea
                            value={formData.responsibilities}
                            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                            placeholder="Enter responsibilities (One per line)&#10;Ex: Develop and maintain web applications"
                            className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[100px] font-mono text-sm"
                        />
                    </div>
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
                                Updating...
                            </>
                        ) : "Update Job"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
