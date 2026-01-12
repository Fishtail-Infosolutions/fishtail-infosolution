"use client";

import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    className?: string;
}

export function ProjectCard({ imageUrl, title, className }: ProjectCardProps) {
    return (
        <div className={cn(" relative flex items-center justify-center", className)}>
            <DirectionAwareHover
                imageUrl={imageUrl}
                childrenClassName="w-full left-0 px-4 max-md:!opacity-100 max-md:!translate-y-0 max-md:!translate-x-0"
            >
                <div className="flex gap-3 items-center justify-between">
                    <p className="font-semibold text-xl">{title}</p>
                    <Button size="sm">
                        View Project
                    </Button>
                </div>
            </DirectionAwareHover>
        </div>
    );
}
