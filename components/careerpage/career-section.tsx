"use client";

import React, { useState } from "react";
import CareerCard from "./card";
import { JobOpenings } from "@/constants";
import { cn } from "@/lib/utils";
import GradientBanner from "../self-made-ui/gradeint-banner";
import Tabs from "@/components/tab";

const categories = ["All", "Sales & support", "Developer", "Marketing", "Design"];

export default function CareerSection() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredJobs =
        activeCategory === "All"
            ? JobOpenings
            : JobOpenings.filter((job) => job.category === activeCategory);

    return (
        <section className="w-full bg-black py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12">
                    <GradientBanner text="Current Opening" />
                    <h1 className="text-5xl md:text-4xl font-medium text-center text-white my-3">
                        Join our Team
                    </h1>
                    <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
                        Feel free to email <a href="mailto:hr@fishtailinfosolutions.com.np" className="text-violet-500 hover:underline">hr@fishtailinfosolutions.com.np</a> if you believe you would be a fantastic fit.
                    </p>
                </div>


                {/* Filter Tabs */}
                <Tabs
                    tabs={categories}
                    activeTab={categories.indexOf(activeCategory)}
                    onTabChange={(index) => setActiveCategory(categories[index])}
                    className="mb-12"
                />

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                    {filteredJobs.map((job) => (
                        <CareerCard key={job.id} job={job} />
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center text-neutral-500 py-12">
                        No openings available in this category at the moment.
                    </div>
                )}

            </div>
        </section>
    );
}
