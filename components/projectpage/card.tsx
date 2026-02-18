"use client";

import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    description?: string;
    projectUrl: string;
    className?: string;
}

export function ProjectCard({ imageUrl, title, description, projectUrl, className }: ProjectCardProps) {
    return (
        <div className={cn(" relative flex items-center justify-center", className)}>
            <DirectionAwareHover
                imageUrl={imageUrl}
                childrenClassName="w-full left-0 px-4 max-md:!opacity-100 max-md:!translate-y-0 max-md:!translate-x-0"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3 items-center justify-between">
                        <p className="font-semibold text-xl">{title}</p>
                        <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full">
                                View Project
                            </Button>
                        </a>
                    </div>
                    {description && (
                        <p className="text-sm text-neutral-200 line-clamp-2">{description}</p>
                    )}
                </div>
            </DirectionAwareHover>
        </div>
    );
}
