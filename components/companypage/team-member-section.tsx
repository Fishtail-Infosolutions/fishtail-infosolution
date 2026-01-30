"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { RefreshCw } from "lucide-react";
import { TeamCard, TeamMember } from "./team-card";

export default function TeamMemberSection() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const res = await fetch('/api/public/team');
                if (!res.ok) throw new Error('Failed to fetch team members');
                const data = await res.json();
                setTeamMembers(data);
            } catch (error) {
                console.error("Error fetching team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    if (loading) {
        return (
            <section className="w-full bg-background py-12 sm:py-20 px-8 md:px-16 flex justify-center items-center min-h-[400px]">
                <RefreshCw className="animate-spin text-muted-foreground w-8 h-8" />
            </section>
        );
    }

    return (
        <section className="w-full bg-background py-12 sm:py-20 px-8 md:px-16 transition-colors duration-500">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <GradientBanner text="Meet Our Team" />
                </motion.div>

                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full">
                    {teamMembers.map((member, index) => (
                        <li key={member._id || index} className="list-none h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index % 3 * 0.1,
                                    ease: "easeOut"
                                }}
                                className="h-full"
                            >
                                <TeamCard member={member} />
                            </motion.div>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
}

