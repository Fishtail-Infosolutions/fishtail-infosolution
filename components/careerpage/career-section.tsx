"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CareerCard from "./card";
import { cn } from "@/lib/utils";
import GradientBanner from "../self-made-ui/gradeint-banner";
import Tabs from "@/components/tab";
import { BrandLoader } from "@/components/self-made-ui/public-website-loader";

export default function CareerSection() {
    const [categories, setCategories] = useState(["All"]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, jobRes] = await Promise.all([
                    fetch("/api/job-categories"),
                    fetch("/api/jobs")
                ]);

                if (catRes.ok) {
                    const data = await catRes.json();
                    setCategories(["All", ...data.map((cat: any) => cat.name)]);
                }

                if (jobRes.ok) {
                    const data = await jobRes.json();
                    setJobs(data.jobs || []);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredJobs =
        activeCategory === "All"
            ? jobs
            : jobs.filter((job) => {
                const jobCategoryName = typeof job.category === 'object' ? job.category?.name : job.category;
                return jobCategoryName === activeCategory;
            });

    if (loading) return <BrandLoader message="Fetching opportunities..." />;

    return (
        <section className="w-full bg-background pt-32 pb-20 px-4 md:px-8 transition-colors duration-500">
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
                    <h1 className="text-3xl md:text-4xl font-medium text-center text-foreground my-3">
                        Join our Team
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                        Feel free to email <a href="mailto:hr@fishtailinfosolutions.com.np" className="text-transparent bg-clip-text bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF] hover:underline">hr@fishtailinfosolutions.com</a> if you believe you would be a fantastic fit.
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
