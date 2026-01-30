"use client";

import React from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { User2 } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaX, FaGithub, FaInstagram, FaGlobe } from 'react-icons/fa6';
import { cn } from "@/lib/utils";

export interface Social {
    platform: string;
    url: string;
}

export interface TeamMember {
    _id: string;
    name: string;
    role: string;
    description: string;
    imageUrl?: string;
    socials?: Social[];
    order: number;
}



export const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'linkedin': return FaLinkedin;
        case 'twitter': return FaX;
        case 'facebook': return FaFacebook;
        case 'github': return FaGithub;
        case 'instagram': return FaInstagram;
        case 'website': return FaGlobe;
        default: return FaGlobe;
    }
};

interface TeamCardProps {
    member: TeamMember;
    icon?: React.ReactNode;
    className?: string;
    disableHover?: boolean;
}

export const TeamCard = ({ member, icon = <User2 className="h-6 w-6 text-foreground/60 dark:text-neutral-400" />, className, disableHover = false }: TeamCardProps) => {
    return (
        <div className="min-h-[14rem] h-full w-full max-w-sm mx-auto">
            <motion.div
                className={cn("relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-gray-50/50 dark:bg-zinc-900/30 border-border", className)}
                whileHover={disableHover ? undefined : { scale: 1.05 }}
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
                                const Icon = getPlatformIcon(social.platform);
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
