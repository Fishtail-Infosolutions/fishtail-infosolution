"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    scale: number;
    speed: number;
    distance: number;
}

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    starWidth?: number;
    starHeight?: number;
    className?: string;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
    minSpeed = 10,
    maxSpeed = 30,
    minDelay = 1200,
    maxDelay = 4200,
    starColor = "#9E00FF",
    trailColor = "#2EB9FF",
    starWidth = 10,
    starHeight = 1,
    className,
}) => {
    const [star, setStar] = useState<ShootingStar | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const createStar = useCallback(() => {
        if (!svgRef.current) return;

        const rect = svgRef.current.getBoundingClientRect();
        const startX = Math.random() * rect.width;
        const startY = Math.random() * rect.height;
        const angle = 135; // Fixed angle for falling effect
        const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        const distance = Math.max(rect.width, rect.height);
        const scale = Math.random() * 0.7 + 0.5;

        setStar({
            id: Date.now(),
            x: startX,
            y: startY,
            angle,
            scale,
            speed,
            distance,
        });

        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        setTimeout(createStar, delay);
    }, [minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        createStar();
    }, [createStar]);

    return (
        <svg
            ref={svgRef}
            className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
        >
            {star && (
                <rect
                    key={star.id}
                    x={star.x}
                    y={star.y}
                    width={starWidth * star.scale}
                    height={starHeight}
                    fill="url(#starGradient)"
                    rx="px"
                    transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
                >
                    <animate
                        attributeName="x"
                        from={star.x}
                        to={star.x + star.distance * Math.cos((star.angle * Math.PI) / 180)}
                        dur={`${star.distance / (star.speed * 100)}s`}
                        fill="freeze"
                    />
                    <animate
                        attributeName="y"
                        from={star.y}
                        to={star.y + star.distance * Math.sin((star.angle * Math.PI) / 180)}
                        dur={`${star.distance / (star.speed * 100)}s`}
                        fill="freeze"
                    />
                </rect>
            )}
            <defs>
                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: starColor, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
                </linearGradient>
            </defs>
        </svg>
    );
};
