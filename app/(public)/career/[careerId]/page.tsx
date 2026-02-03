"use client";

import { BrandLoader } from "@/components/self-made-ui/public-website-loader";
import { NotFoundComponent } from "@/components/self-made-ui/not-found-component";
import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft } from "lucide-react";
import { JobOpenings } from "@/constants/jobs";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import ApplyForm from "@/components/careerpage/apply-form";
import Image from "next/image";

export default function CareerPostPage() {
    const { careerId } = useParams();
    const [job, setJob] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (!careerId) return;

            try {
                // Try fetching from API first
                const res = await fetch(`/api/jobs/${careerId}`);
                if (res.ok) {
                    const data = await res.json();
                    setJob(data);
                } else {
                    // Fallback to static JobOpenings for legacy IDs
                    const id = Number(careerId);
                    if (!isNaN(id)) {
                        const found = JobOpenings.find((j) => j.id === id);
                        setJob(found || null);
                    }
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                // Last ditch effort: check static
                const id = Number(careerId);
                if (!isNaN(id)) {
                    const found = JobOpenings.find((j) => j.id === id);
                    setJob(found || null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [careerId]);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (isLoading) return <BrandLoader message="Loading job details..." />;

    if (!job) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-colors duration-500">

            {/* Hero / Header Section */}
            <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-border pt-28 pb-12 px-6 sm:px-6">
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50 pointer-events-none"
                    )}
                />

                <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-8">
                    {/* Logo/Icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/50 border border-border flex items-center justify-center backdrop-blur-sm shadow-xl overflow-hidden">
                        {(job.icon || job.postIcon) ? (
                            <Image
                                src={job.icon || job.postIcon}
                                alt={job.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-3xl font-bold text-foreground">
                                {job.title?.charAt(0).toUpperCase() || (job.fallbackInitial ? job.fallbackInitial : "J")}
                            </span>
                        )}
                    </div>

                    {/* Title with Sparkles */}
                    <div className="scale-110 sm:scale-125 md:scale-150 px-4 sm:px-">
                        <SparklesText className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center">
                            {job.title}
                        </SparklesText>
                    </div>

                    {/* Breadcrumb & Copy Link */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        <div className="bg-accent/50 dark:bg-zinc-900/50 backdrop-blur-md border border-border rounded-full px-6 py-2">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/career" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    {/* <BreadcrumbItem>
                                        <BreadcrumbPage className="text-foreground/60 max-w-[150px] truncate">
                                            {job.title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem> */}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        <Button
                            onClick={handleCopyLink}
                            variant="outline"
                            className="rounded-full bg-accent text-foreground hover:bg-accent/80 border-border px-6"
                        >
                            {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                            {copied ? "Copied" : "Share"}
                        </Button>
                    </div>

                    {/* 6 Info Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-12 text-left bg-accent/20 dark:bg-accent/10 p-8 rounded-2xl border border-border backdrop-blur-sm max-w-4xl">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between md:justify-start items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground w-40">Category:</span>
                                <span className="text-foreground font-medium">
                                    {(typeof job.category === 'object' && job.category !== null) ? job.category.name : (job.category || job.role || "-")}
                                </span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground w-40">Openings:</span>
                                <span className="text-foreground font-medium">{job.openings || "1"}</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center pb-2">
                                <span className="text-muted-foreground w-40">Date Posted:</span>
                                <span className="text-foreground font-medium">
                                    {job.createdAt
                                        ? new Date(job.createdAt).toLocaleDateString()
                                        : (job.datePosted || "-")}
                                </span>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between md:justify-start items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground w-24 md:w-40 whitespace-nowrap">Job Type:</span>
                                <span className="text-foreground font-medium text-right md:text-left">
                                    {job.type || "-"} {job.locationType ? `(${job.locationType})` : ""}
                                </span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground w-40">Salary:</span>
                                <span className="text-foreground font-medium">{job.salary || "-"}</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center pb-2">
                                <span className="text-muted-foreground w-40">Deadline:</span>
                                <span className="text-foreground font-medium">{job.deadline || "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16 ">
                {/* Job Summary */}
                <section className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Job Summary</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{job.description}</p>
                </section>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground">Responsibilities</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {job.responsibilities.map((item: string, idx: number) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {job.requirements.map((item: string, idx: number) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground">Benefits</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {job.benefits.map((item: string, idx: number) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Apply Form */}
                <section id="apply" className="pt-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-border grow"></div>
                        <h2 className="text-3xl font-bold text-foreground text-center">Apply Now</h2>
                        <div className="h-px bg-border grow"></div>
                    </div>
                    <ApplyForm jobId={job._id} jobTitle={job.title} />
                </section>
            </div>
        </div>
    );
}
