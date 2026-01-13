"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase, Users, Calendar, Award } from "lucide-react";

interface StatCardProps {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, suffix, label, index }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000; // 2 seconds
            const increment = value / (duration / 16); // 60fps

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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
                {/* Icon */}
                <div className="mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                {/* Value */}
                <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ABDCFF] to-[#0396FF]">
                        {count}
                        {suffix}
                    </span>
                </div>

                {/* Label */}
                <p className="text-neutral-400 text-sm md:text-base">{label}</p>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default function AnimatedStatistics() {
    const stats = [
        {
            icon: <Briefcase className="w-10 h-10 md:w-12 md:h-12" />,
            value: 500,
            suffix: "+",
            label: "Projects Completed",
        },
        {
            icon: <Users className="w-10 h-10 md:w-12 md:h-12" />,
            value: 100,
            suffix: "+",
            label: "Happy Clients",
        },
        {
            icon: <Calendar className="w-10 h-10 md:w-12 md:h-12" />,
            value: 5,
            suffix: "+",
            label: "Years of Experience",
        },
        {
            icon: <Award className="w-10 h-10 md:w-12 md:h-12" />,
            value: 50,
            suffix: "+",
            label: "Team Members",
        },
    ];

    return (
        <section className="w-full bg-black py-16 md:py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
