"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CareerCard from "./card";
import { JobOpenings } from "@/constants";
import { cn } from "@/lib/utils";
import GradientBanner from "../self-made-ui/gradeint-banner";
import Tabs from "@/components/tab";

const categories = ["All", "Developer", "Designer", "SEO", "Content Writer"];

export default function CareerSection() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredJobs =
        activeCategory === "All"
            ? JobOpenings
            : JobOpenings.filter((job) => job.category === activeCategory);

    return (
        <section className="w-full bg-black py-32 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto flex flex-col items-center"
            >

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <GradientBanner text="Current Opening" />
                    <h1 className="text-3xl md:text-4xl font-medium text-center text-white my-3">
                        Join our Team
                    </h1>
                    <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
                        Feel free to email <a href="mailto:hr@fishtailinfosolutions.com.np" className="text-transparent bg-clip-text bg-gradient-to-br from-[#ABDCFF] to-[#0396FF] hover:underline">hr@fishtailinfosolutions.com.np</a> if you believe you would be a fantastic fit.
                    </p>
                </motion.div>


                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full flex justify-center"
                >
                    <Tabs
                        tabs={categories}
                        activeTab={categories.indexOf(activeCategory)}
                        onTabChange={(index) => setActiveCategory(categories[index])}
                        className="mb-12"
                    />
                </motion.div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                    <AnimatePresence mode="wait">
                        {filteredJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                <CareerCard job={job} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredJobs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-neutral-500 py-12"
                    >
                        No openings available in this category at the moment.
                    </motion.div>
                )}

            </motion.div>
        </section>
    );
}
