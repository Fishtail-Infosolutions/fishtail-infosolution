"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

interface StarBackgroundProps {
    starDensity?: number;
    minTwinkleSpeed?: number;
    maxTwinkleSpeed?: number;
    rotationSpeed?: number;
    className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
    starDensity = 0.0001,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
    rotationSpeed = 0.05, // degrees per frame
    className,
}) => {
    const [stars, setStars] = useState<{ x: number; y: number; radius: number; opacity: number; twinkleSpeed: number, color: string; boost: number }[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    const generateStars = useCallback((width: number, height: number) => {
        const area = width * height;
        const numStars = Math.floor(area * starDensity);

        // Define a set of blue/violet colors
        const colors = [
            "#ABDCFF", // Light Blue
            "#0396FF", // Blue
            "#9E00FF", // Violet
            "#736EFE", // Periwinkle
            "#4facfe", // Sky Blue
        ];

        const newStars = Array.from({ length: numStars }, () => {
            return {
                x: (Math.random() - 0.5) * width * 2, // Larger area for rotation
                y: (Math.random() - 0.5) * height * 2,
                radius: Math.random() * 1.2 + 0.5,
                opacity: Math.random(),
                twinkleSpeed: Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) + minTwinkleSpeed,
                color: colors[Math.floor(Math.random() * colors.length)],
                boost: Math.random() > 0.9 ? 1.5 + Math.random() * 0.5 : 1.0,
            };
        });
        setStars(newStars);
    }, [starDensity, minTwinkleSpeed, maxTwinkleSpeed]);

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.clientWidth;
                    canvas.height = parent.clientHeight;
                    generateStars(canvas.width, canvas.height);
                }
            }
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [generateStars]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let rotationAngle = 0;

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((rotationAngle * Math.PI) / 180);

            stars.forEach((star) => {
                let opacity = star.opacity;
                const twinkle = 0.5 + Math.abs(Math.sin(time * 0.001 * star.twinkleSpeed) * 0.5);
                opacity = opacity * twinkle;

                // Glowing effect
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);

                // Adjust for theme visibility
                const isLight = theme === 'light';
                const currentBoost = isLight ? star.boost : 1.0;
                const alpha = isLight ? Math.min(1, opacity * 0.7 * currentBoost) : opacity;
                const radiusScale = isLight ? 1.5 * currentBoost : 1;

                gradient.addColorStop(0, star.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, star.color + "00");

                ctx.fillStyle = gradient;
                ctx.arc(star.x, star.y, star.radius * 3 * radiusScale, 0, Math.PI * 2);
                ctx.fill();

                // Core star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * radiusScale, 0, Math.PI * 2);
                ctx.fillStyle = isLight ? `${star.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}` : `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            });

            ctx.restore();

            rotationAngle += rotationSpeed;
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [stars, rotationSpeed, theme]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed inset-0 h-full w-full pointer-events-none -z-10", className)}
        />
    );
};
