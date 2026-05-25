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
import { PublicWebsiteLoader } from "@/components/self-made-ui/public-website-loader";


export default function BlogPostPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/slug/${slug}`);
                if (!res.ok) {
                    setBlog(null);
                } else {
                    const data = await res.json();
                    setBlog(data);
                }
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

    if (isLoading) return <PublicWebsiteLoader message="Loading blog..." />;

    if (!blog) return notFound();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pt-26 md:pt-32 pb-20 px-6 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="space-y-6 mb-10">

                    {/* Date with decorative line */}
                    <div className="flex items-center gap-4 text-muted-foreground mb-6">
                        <div className="w-16 h-px bg-linear-to-r from-transparent to-border"></div>
                        <span className="uppercase tracking-widest text-sm font-medium">
                            {format(new Date(blog.publishedAt || blog.createdAt), "MMMM d, yyyy")}
                        </span>
                    </div>


                    {/* Blog Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-foreground via-foreground/80 to-foreground/50 mb-8 leading-tight">
                        {blog.title}
                    </h1>

                </div>

                {/* Breadcrumb & Copy Link Section */}
                <div className="flex flex-row items-center justify-between gap-4 py-0 mb-8">
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
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyLink}
                        className="rounded-full bg-gray-50 dark:bg-gray-800/50 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 px-6 h-10 border-none transition-all"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Link Copied" : "Share Blog"}
                    </Button>
                </div>

                {/* Main Content */}
                <article className="prose prose-blue dark:prose-invert max-w-none">
                    {/* Featured Image */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-gray-100 dark:border-gray-800">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="absolute inset-0 w-full h-full object-cover block transform hover:scale-105 transition-transform duration-700 !m-0"
                        />
                    </div>

                    {/* Blog Content */}
                    <div
                        className="rich-text-content w-full [&_*]:!break-words [&_p]:!whitespace-pre-wrap prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-img:rounded-2xl prose-img:max-w-full prose-img:h-auto prose-img:object-contain prose-img:mx-auto prose-img:shadow-lg prose-img:my-8"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>
            </div>
        </div>
    );
}
