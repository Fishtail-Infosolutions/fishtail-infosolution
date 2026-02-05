"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, User, Briefcase, FileText, Link2, Hash, ToggleLeft, Plus, Home } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const socialPlatforms = ['LinkedIn', 'Twitter', 'Facebook', 'GitHub', 'Instagram', 'Website'] as const;

const teamMemberSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().min(1, "Profile image is required"),
    isActive: z.boolean(),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

interface SocialLink {
    platform: string;
    url: string;
}

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [newSocialPlatform, setNewSocialPlatform] = useState<string>("");
    const [newSocialUrl, setNewSocialUrl] = useState<string>("");

    const form = useForm<TeamMemberFormValues>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: {
            name: "",
            role: "",
            description: "",
            imageUrl: "",
            isActive: true,
        },
    });

    const handleImageChange = (newFiles: File[]) => {
        const file = newFiles[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                // Set form value to trigger validation
                form.setValue('imageUrl', reader.result as string, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        // Clear form value to trigger validation error
        form.setValue('imageUrl', '', { shouldValidate: true });
    };

    const addSocial = () => {
        if (newSocialPlatform && newSocialUrl) {
            if (!newSocialUrl.startsWith("https://")) {
                toast.error("URL must start with https://");
                return;
            }
            setSocials([...socials, { platform: newSocialPlatform, url: newSocialUrl }]);
            setNewSocialPlatform("");
            setNewSocialUrl("");
        } else {
            toast.error("Please select a platform and enter a URL");
        }
    };

    const removeSocial = (index: number) => {
        setSocials(socials.filter((_, i) => i !== index));
    };

    const onSubmit = async (values: TeamMemberFormValues) => {
        setIsSubmitting(true);

        try {
            let imagePath = null;

            // Upload image if provided
            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append("file", imageFile);
                imageFormData.append("folder", "team");

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: imageFormData,
                });

                if (!uploadRes.ok) throw new Error("Failed to upload image");
                const uploadData = await uploadRes.json();
                imagePath = uploadData.path;
            }

            // Create team member
            const teamMemberFormData = new FormData();
            teamMemberFormData.append("name", values.name);
            teamMemberFormData.append("role", values.role);
            teamMemberFormData.append("description", values.description);
            if (imagePath) teamMemberFormData.append("imageUrl", imagePath);
            teamMemberFormData.append("socials", JSON.stringify(socials));
            teamMemberFormData.append("isActive", values.isActive.toString());

            const res = await fetch("/api/team", {
                method: "POST",
                body: teamMemberFormData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create team member");
            }

            toast.success("Team member created successfully");
            router.push("/admin/team");
        } catch (error: any) {
            console.error("Error creating team member:", error);
            toast.error(error.message || "Failed to create team member");
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
                            <Link href="/admin/team">Team Members</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Member</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add New Team Member
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Create a new team member profile.
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    // Show toast for image validation error specifically
                    if (errors.imageUrl) {
                        toast.error(errors.imageUrl.message || "Profile image is required");
                    }
                })} className="space-y-6">
                    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">
                        {/* Image Upload */}
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Upload size={14} className="text-blue-500" />
                                        Profile Image <span className="text-red-500 font-bold">*</span>
                                    </FormLabel>

                                    {!imagePreview ? (
                                        <div className="w-full max-w-sm border border-dashed bg-white dark:bg-gray-900/50 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                                            <FileUpload onChange={handleImageChange} className="p-6" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-6 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                                                <Image src={imagePreview || ""} alt="Image preview" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {imageFile?.name || "Selected Image"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(imageFile?.size ? (imageFile.size / (1024 * 1024)).toFixed(2) : "0")} MB
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={removeImage}
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 px-2 -ml-2"
                                                >
                                                    <X size={14} className="mr-1" />
                                                    Remove Image
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {!imagePreview && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG up to 5MB are supported.
                                        </div>
                                    )}

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* General Information Section */}
                        <div className="space-y-6 pt-2">
                            <div className="border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <User size={16} className="text-blue-500" />
                                    General Information
                                </h2>
                            </div>

                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            Full Name <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Role */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Briefcase size={14} className="text-blue-500" />
                                            Role/Position <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Senior Developer, Designer, etc."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <FileText size={14} className="text-blue-500" />
                                            Description <span className="text-red-500 font-bold">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Brief bio or description of the team member..."
                                                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl min-h-[120px]"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Social Links Section */}
                        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="pb-2">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <Link2 size={16} className="text-blue-500" />
                                    Social Media Links (Optional)
                                </h2>
                            </div>

                            {/* Add Social Link */}
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Select value={newSocialPlatform} onValueChange={setNewSocialPlatform}>
                                        <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                            {socialPlatforms.map((platform) => (
                                                <SelectItem key={platform} value={platform}>
                                                    {platform}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        value={newSocialUrl}
                                        onChange={(e) => setNewSocialUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-blue-500/20 rounded-xl"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={addSocial}
                                    className="w-full md:w-auto hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Social Link
                                </Button>
                            </div>

                            {/* Social Links List */}
                            {socials.length > 0 && (
                                <div className="space-y-2">
                                    {socials.map((social, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded shrink-0">
                                                    {social.platform}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                    {social.url}
                                                </span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeSocial(index)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 p-0"
                                            >
                                                <X size={14} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Additional Settings */}
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            {/* Active Status */}
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <ToggleLeft size={14} className="text-blue-500" />
                                            Active Status
                                        </FormLabel>
                                        <div className="flex items-center space-x-3 h-10">
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {field.value ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <FormDescription className="text-xs">
                                            Only active members are shown on the website
                                        </FormDescription>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/team")}
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
                            ) : "Create Team Member"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
