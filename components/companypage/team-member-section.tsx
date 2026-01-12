"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { TeamMembers, TeamMember } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User2 } from "lucide-react";
import Image from "next/image";

export default function TeamMemberSection() {
    return (
        <section className="w-full bg-black py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="mb-12">
                    <GradientBanner text="Meet Our Team" />
                </div>

                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full">
                    {TeamMembers.map((member, index) => (
                        <GridItem
                            key={index}
                            icon={<User2 className="h-6 w-6 text-black dark:text-neutral-400" />}
                            member={member}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

interface GridItemProps {
    icon: React.ReactNode;
    member: TeamMember;
}

const GridItem = ({ icon, member }: GridItemProps) => {
    return (
        <li className="list-none min-h-[14rem] h-full">
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-neutral-900 border-neutral-800">
                <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col items-center justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-black">
                    <div className="flex flex-col items-center gap-4 w-full">
                        {/* 1. Image (Circle) */}
                        {member.imageUrl ? (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-neutral-800 shrink-0">
                                <Image
                                    src={member.imageUrl}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full border-2 border-neutral-800 p-4 bg-neutral-900 flex items-center justify-center shrink-0">
                                {icon}
                            </div>
                        )}

                        {/* 2. Social Media Links */}
                        <div className="flex gap-4">
                            {member.socials?.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>

                        {/* 3. Name and Role */}
                        <div className="text-center">
                            <h3 className="font-sans text-xl font-semibold text-white">
                                {member.name}
                            </h3>
                            <p className="text-sm text-neutral-400 font-medium">{member.role}</p>
                        </div>

                        {/* 4. Description */}
                        <div className="text-center">
                            <h2 className="font-sans text-sm text-neutral-500 line-clamp-3">
                                {member.description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
