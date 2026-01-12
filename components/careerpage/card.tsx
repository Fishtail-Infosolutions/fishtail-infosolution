"use client";

import React from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { JobOpening } from "@/constants";
import { User, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CareerCardProps {
    job: JobOpening;
}

export default function CareerCard({ job }: CareerCardProps) {
    const TitleComponent = ({
        title,
    }: {
        title: string;
    }) => (
        <div className="flex space-x-2 items-center">
            <p className="text-sm font-bold text-white transition duration-200">{title}</p>
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
                <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-black hover:shadow-xl border border-neutral-800">
                    <Link href={`/career/${job.id}`} className="block h-full">
                        {/* Dot Pattern Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <DotPattern
                                className={cn(
                                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                                    "opacity-20"
                                )}
                            />
                        </div>

                        <div className="relative p-6 h-full flex flex-col z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 text-xl font-bold rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 overflow-hidden relative">
                                        {job.postIcon && job.postIcon.startsWith("/") ? (
                                            <Image
                                                src={job.postIcon}
                                                alt={job.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            job.fallbackInitial
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg text-white line-clamp-1 transition-colors">{job.title}</h2>
                                        <p className="text-neutral-400 text-sm font-medium">{job.role}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-neutral-500 font-mono whitespace-nowrap hidden sm:block">
                                    Deadline: {job.deadline}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex-grow">
                                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                    {job.description}
                                </p>
                            </div>


                            {/* Footer / Meta */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-neutral-800 pt-4">
                                <div className="flex gap-4 text-xs text-neutral-400 font-medium">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        <span>{job.openings} - Openings</span>
                                    </div>
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
                                    className="rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors md:hidden"
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
