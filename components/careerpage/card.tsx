"use client";

import React from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

import { User, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CareerCardProps {
    job: {
        _id?: string;
        id?: string;
        title: string;
        role?: string;
        description: string;
        location: string;
        type: string;
        postIcon?: string;
        icon?: string;
        fallbackInitial?: string;
        deadline?: string;
        openings?: string | number;
        category?: string | { _id: string, name: string };
    };
}

export default function CareerCard({ job }: CareerCardProps) {
    const TitleComponent = ({
        title,
    }: {
        title: string;
    }) => (
        <div className="flex space-x-2 items-center">
            <p className="text-sm font-bold text-foreground transition duration-200">{title}</p>
        </div>
    );

    return (
        <div className="w-full mx-auto">
            <FollowerPointerCard
                title={
                    <TitleComponent
                        title="Apply Now"
                    />
                }
            >
                <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-card dark:bg-transparent hover:shadow-lg border border-border">
                    <Link href={`/career/${job._id || job.id}`} className="block h-full cursor-none">
                        {/* Dot Pattern Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <DotPattern
                                className={cn(
                                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                                    "opacity-20 dark:opacity-10 text-blue-500 dark:text-white"
                                )}
                            />
                        </div>

                        <div className="relative p-6 h-full flex flex-col z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 text-xl font-bold rounded-lg bg-accent/20 border border-border flex items-center justify-center text-foreground shrink-0 overflow-hidden relative">
                                        {(job.icon || job.postIcon) ? (
                                            <Image
                                                src={job.icon || job.postIcon || ""}
                                                alt={job.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="uppercase">{job.title.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg text-foreground line-clamp-1 transition-colors">{job.title}</h2>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {typeof job.category === 'object' ? job.category?.name : (job.category || job.role || "-")}
                                        </p>
                                    </div>
                                </div>
                                {job.deadline && (
                                    <div className="text-xs text-muted-foreground font-mono whitespace-nowrap hidden sm:block">
                                        Deadline: {job.deadline}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="flex-grow">
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                                    {job.description}
                                </p>
                            </div>


                            {/* Footer / Meta */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-border pt-4">
                                <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                                    {job.openings && (
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span>{job.openings || "1"} Pos.</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{job.type}</span>
                                    </div>
                                </div>

                                <Button
                                    className="rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors md:hidden cursor-none"
                                    size="sm"
                                >
                                    Apply Now
                                </Button>
                            </div>

                        </div>
                    </Link>
                </div>
            </FollowerPointerCard>
        </div>
    );
}
