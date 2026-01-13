"use client"

import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { Spotlight } from "@/components/ui/spotlight-new";
import BlurText from "@/components/BlurText";

export default function AboutSection() {
    return (
        <section className="w-full bg-black">
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-fit py-40 relative overflow-hidden">
                <Spotlight />
                <div>
                    <GradientBanner text="About Us" />
                </div>
                <BlurText
                    text="Pioneering Digital Excellence"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-4xl md:text-5xl lg:text-6xl text-white font-medium text-center relative z-20 mb-7 mt-5 "
                />
                <p className="max-w-4xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-gray-300 text-center mb-8 bg-transparent z-20 relative">
                    At Fishtail Infosolutions, we go beyond being a digital agency to become your strategic partner in growth. <br className="hidden md:block" />
                    Specializing in Web Development, SEO, and Lead Generation to craft experiences that resonate. <br className="hidden md:block" />
                    Elevating your business with measurable results.
                </p>
                <Link href="/contact">
                    <HoverBorderGradient
                        as="button"
                        className="flex items-center justify-center gap-2 bg-black text-white"
                    >
                        <span>Let&apos;s Connect</span>
                        <ArrowRightIcon className="w-3 h-3" />
                    </HoverBorderGradient>
                </Link>
            </BackgroundLines>
        </section>
    );
}
