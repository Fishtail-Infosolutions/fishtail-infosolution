"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { JobOpenings } from "@/constants";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import ApplyForm from "@/components/careerpage/apply-form";

export default function CareerPostPage() {
    const { careerId } = useParams();
    const [job, setJob] = useState<(typeof JobOpenings)[0] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (careerId) {
            const id = Number(careerId);
            const found = JobOpenings.find((j) => j.id === id);
            setJob(found || null);
            setIsLoading(false);
        }
    }, [careerId]);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Job Post Not Found</h1>
                <Link href="/career">
                    <Button variant="outline">Back to Careers</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-purple-500/30">



            {/* Hero / Header Section */}
            <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 pt-24 pb-12 px-4 sm:px-6">
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

                <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
                    {/* Logo/Icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-900/80 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl">
                        {/* Assuming simple text fallback if no image or standard icon logic, matching index.ts structure */}
                        <span className="text-3xl font-bold text-white">{job.fallbackInitial}</span>
                    </div>

                    {/* Title with Sparkles */}
                    <div className="scale-110 sm:scale-125 md:scale-150">
                        <SparklesText className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
                            {job.title}
                        </SparklesText>
                    </div>

                    {/* Breadcrumb & Copy Link */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/career" className="hover:text-white transition-colors">Careers</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    {/* <BreadcrumbItem>
                                        <BreadcrumbPage className="text-gray-400 max-w-[150px] truncate">
                                            {job.role}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem> */}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        <Button
                            onClick={handleCopyLink}
                            variant="outline"
                            className="rounded-full bg-white text-white hover:bg-gray-200 border-none px-6"
                        >
                            {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                            {copied ? "Copied" : "Share"}
                        </Button>
                    </div>

                    {/* 6 Info Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-12 text-left bg-zinc-900/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm max-w-4xl">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between md:justify-start items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 w-40">Job Level:</span>
                                <span className="text-white font-medium">{job.role}</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 w-40">Required:</span>
                                <span className="text-white font-medium">{job.openings} Candidates</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center pb-2">
                                <span className="text-gray-400 w-40">Date Posted:</span>
                                <span className="text-white font-medium">{job.datePosted}</span>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between md:justify-start items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 w-40">Job Type:</span>
                                <span className="text-white font-medium">{job.type} ({job.location})</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 w-40">Salary:</span>
                                <span className="text-white font-medium">{job.salary}</span>
                            </div>
                            <div className="flex justify-between md:justify-start items-center pb-2">
                                <span className="text-gray-400 w-40">Deadline:</span>
                                <span className="text-white font-medium">{job.deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16 ">
                {/* Job Summary */}
                <section className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Job Summary</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{job.description}</p>
                </section>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Responsibilities</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            {job.responsibilities.map((item, idx) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            {job.requirements.map((item, idx) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                    <section className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Benefits</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            {job.benefits.map((item, idx) => (
                                <li key={idx} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Apply Form */}
                <section id="apply" className="pt-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-white/20 grow"></div>
                        <h2 className="text-3xl font-bold text-white text-center">Apply Now</h2>
                        <div className="h-px bg-white/20 grow"></div>
                    </div>
                    <ApplyForm />
                </section>
            </div>
        </div>
    );
}
