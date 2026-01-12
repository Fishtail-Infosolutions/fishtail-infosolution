"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (index: number) => void;
    layoutId?: string;
    className?: string;
}

export default function Tabs({
    tabs,
    activeTab,
    onTabChange,
    layoutId = "activeTab",
    className
}: TabsProps) {
    return (
        <div className={cn("flex flex-wrap justify-center gap-2", className)}>
            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(index)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10",
                        activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                    )}
                >
                    {activeTab === index && (
                        <motion.div
                            layoutId={layoutId}
                            className="absolute inset-0 bg-neutral-900 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            style={{ zIndex: -1 }}
                        />
                    )}
                    {tab}
                </button>
            ))}
        </div>
    );
}
