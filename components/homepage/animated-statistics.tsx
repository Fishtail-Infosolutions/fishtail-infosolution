"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase, Users, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    description: string;
    index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, suffix, label, description, index }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000; // 2 seconds
            // Ensure we at least increment by 1 to reach small numbers
            const increment = Math.max(1, value / (duration / 16));

            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div className="relative group/card h-full">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                    "relative z-10 h-full",
                    // Light mode: white bg with shadow, Dark mode: dark bg with subtle backdrop
                    "bg-white dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-4 md:p-6",
                    "hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300",
                    "flex flex-col justify-between overflow-hidden shadow-lg shadow-neutral-200/50 dark:shadow-none hover:shadow-xl hover:shadow-neutral-300/50 dark:hover:shadow-none"
                )}
            >
                {/* Top Right Gradient Rectangle - Smooth Fade Towards Center */}
                <div className="absolute top-0 right-0 w-[250px] h-[250px] pointer-events-none z-0">
                    {/* Main gradient background with smooth fade */}
                    <div className="absolute inset-0 bg-linear-to-bl from-primary/8 via-primary/3 to-transparent mask-[radial-gradient(ellipse_at_top_right,black_0%,rgba(0,0,0,0.6)_40%,transparent_100%)]"></div>
                    {/* Grid pattern overlay with smooth radial fade */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_at_top_right,black_0%,rgba(0,0,0,0.5)_40%,transparent_100%)]"></div>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-primary group-hover/card:scale-110 transition-transform duration-300 shadow-sm">
                            {icon}
                        </div>
                    </div>
                    {/* Top Right Decorative Corner Fold Visual */}
                    <div className="w-6 h-6 md:w-8 md:h-8 border-t border-r border-neutral-300 dark:border-neutral-700 rounded-tr-xl opacity-40 group-hover/card:opacity-100 group-hover/card:border-primary/50 transition-all duration-300 transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
                </div>

                {/* Body */}
                <div className="space-y-3 relative z-10">
                    <div className="relative">
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight tabular-nums">
                            {count}{suffix}
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm md:text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-1.5">{label}</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-snug line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function AnimatedStatistics() {
    const stats = [
        {
            icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
            value: 50,
            suffix: "+",
            label: "Projects Completed",
            description: "Delivering digital solutions worldwide."
        },
        {
            icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
            value: 30,
            suffix: "+",
            label: "Happy Clients",
            description: "Building lasting relationships and network"
        },
        {
            icon: <Calendar className="w-5 h-5 md:w-6 md:h-6" />,
            value: 5,
            suffix: "+",
            label: "Years of Experience",
            description: "Deep industry knowledge and expertise."
        },
        {
            icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
            value: 10,
            suffix: "+",
            label: "Affiliate Partners",
            description: "Strong partnerships driving mutual growth."
        },
    ];

    return (
        <section className="relative w-full pt-10 pb-12 px-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            description={stat.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
