"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Copy, Check } from "lucide-react";
import { Blogs } from "@/constants";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BlogPostPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<(typeof Blogs)[0] | null>(null);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (blogId) {
            // Handle both string and number possibilities just in case, though usually params are strings
            const id = Number(blogId);
            const found = Blogs.find((b) => b.id === id);
            setBlog(found || null);
            setIsLoading(false);
        }
    }, [blogId]);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-24">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center pt-24 gap-4">
                <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
                <Link href="/blog">
                    <Button variant="outline">Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-4xl mx-auto bg-background text-foreground font-sans pt-24 pb-20 px-6 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">



            <div className="">
                {/* Date with decorative line */}
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                    <div className="w-16 h-px bg-linear-to-r from-transparent to-border"></div>
                    <span className="uppercase tracking-widest text-sm font-medium">{blog.date}</span>
                </div>

                {/* Blog Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-foreground via-foreground/80 to-foreground/50 mb-8 leading-tight">
                    {blog.title}
                </h1>

                {/* Breadcrumb & Copy Link Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-10">
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
                        variant="outline"
                        size="sm"
                        onClick={handleCopyLink}
                        className="rounded-full bg-accent text-foreground hover:bg-accent/80 border-border px-6 w-fit h-9"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied" : "Copy Link"}
                    </Button>
                </div>

                {/* Main Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    {/* Main Image */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-gray-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Blog Body Content */}
                    <div
                        className="text-muted-foreground leading-relaxed space-y-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 prose-headings:text-foreground"
                        dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
                    />
                </article>

                {/* Navigation to other blogs (Optional but nice for UX, removing for now to keep strictly to reqs) */}
            </div>
        </div>
    );
}
