"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Copy, Check, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { Loader } from "@/components/ui/loader";

export default function BlogPostPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/slug/${slug}`);
                if (!res.ok) throw new Error("Blog not found");
                const data = await res.json();
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) fetchBlog();
    }, [slug]);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (isLoading) return <Loader />;

    if (!blog) notFound();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pt-32 pb-20 px-6 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="w-16 h-px bg-linear-to-r from-transparent to-border"></div>
                        <span className="uppercase tracking-widest text-sm font-semibold text-blue-500">
                            {blog.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-blue-500" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" />
                            <span>{format(new Date(blog.publishedAt || blog.createdAt), "MMMM d, yyyy")}</span>
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Tag size={16} className="text-blue-500" />
                                <div className="flex items-center gap-1">
                                    {blog.tags.map((tag: string, i: number) => (
                                        <span key={i} className="hover:text-foreground transition-colors">
                                            #{tag}{i < blog.tags.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Breadcrumb & Copy Link Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-gray-100 dark:border-gray-800 mb-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-gray-400 truncate max-w-[150px] sm:max-w-[300px]">
                                    {blog.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyLink}
                        className="rounded-xl bg-gray-50 dark:bg-gray-800/50 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 px-6 h-10 border-none transition-all"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Link Copied" : "Share Article"}
                    </Button>
                </div>

                {/* Main Content */}
                <article className="prose prose-blue dark:prose-invert max-w-none">
                    {/* Featured Image */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-gray-100 dark:border-gray-800">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blog Content */}
                    <div
                        className="rich-text-content prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-img:rounded-2xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>
            </div>
        </div>
    );
}
