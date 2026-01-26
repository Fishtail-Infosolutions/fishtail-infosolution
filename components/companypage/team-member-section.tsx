"use client";

import React from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { TeamMembers, TeamMember } from "@/constants/team";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User2 } from "lucide-react";
import Image from "next/image";

export default function TeamMemberSection() {
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
                    {TeamMembers.map((member, index) => (
                        <li key={index} className="list-none">
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
                                <GridItem
                                    icon={<User2 className="h-6 w-6 text-foreground/60 dark:text-neutral-400" />}
                                    member={member}
                                />
                            </motion.div>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
}

interface GridItemProps {
    icon: React.ReactNode;
    member: TeamMember;
}

const GridItem = ({ icon, member }: GridItemProps) => {
    return (
        <div className="min-h-[14rem] h-full">
            <motion.div
                className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-gray-50/50  dark:bg-zinc-900/30 border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col items-center justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-transparent">
                    <div className="flex flex-col items-center gap-4 w-full">
                        {/* 1. Image (Circle) */}
                        {member.imageUrl ? (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border shrink-0">
                                <Image
                                    src={member.imageUrl}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full border-2 border-border p-4 bg-accent/20 flex items-center justify-center shrink-0">
                                {icon}
                            </div>
                        )}

                        {/* 2. Social Media Links */}
                        <div className="flex gap-4">
                            {member.socials?.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>

                        {/* 3. Name and Role */}
                        <div className="text-center">
                            <h3 className="font-sans text-xl font-semibold text-foreground">
                                {member.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                        </div>

                        {/* 4. Description */}
                        <div className="text-center">
                            <h2 className="font-sans text-sm text-muted-foreground/80 line-clamp-2">
                                {member.description}
                            </h2>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
