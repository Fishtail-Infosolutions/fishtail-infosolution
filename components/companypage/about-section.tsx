'use client';

import { motion } from 'motion/react';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import GradientBanner from '@/components/self-made-ui/gradeint-banner';
import Link from 'next/link';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Code, Sparkles, Search, Monitor, Rocket, BarChart3, ArrowRightIcon } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight-new';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function AboutSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="w-full min-h-screen flex items-center  relative overflow-hidden pt-32 pb-20">
            <Spotlight />
            <div className="max-w-7xl mx-auto px-8  w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-6 z-10"
                    >
                        <div className="inline-block">
                            <GradientBanner text="About Fishtail Infosolutions" />
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                        >
                            Pioneering Digital Excellence
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            We are a team of passionate digital strategists, developers, and marketers
                            dedicated to transforming businesses through cutting-edge web solutions and
                            data-driven SEO strategies.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            From startups to enterprises, we craft digital experiences that don't just
                            look stunning they drive real, measurable results for your business growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-6"
                        >
                            <Link href="/contact">
                                <HoverBorderGradient
                                    as="button"
                                    className="flex items-center font-semibold justify-center gap-2 bg-black text-white dark:text-white "
                                >
                                    <span>Let&apos;s Connect</span>
                                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                                </HoverBorderGradient>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Orbiting Circles Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative flex items-center justify-center h-[350px] md:h-[500px]"
                    >
                        {/* Center Logo/Icon */}
                        {/* Center Logo/Icon */}
                        <div className="absolute z-10 flex items-center justify-center">
                            {mounted && (
                                <Image
                                    src={resolvedTheme === 'dark' ? "/logos/fishtail-icon-white.svg" : "/logos/fishtail-icon-blue.svg"}
                                    alt="Fishtail Icon"
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 md:w-12 md:h-12 object-contain"
                                    priority
                                />
                            )}
                        </div>

                        {/* First Orbit - Inner */}
                        <OrbitingCircles radius={70} duration={20} reverse>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2.5 shadow-lg">
                                <Code className="w-5 h-5 text-blue-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2.5 shadow-lg">
                                <Search className="w-5 h-5 text-purple-500" strokeWidth={2} />
                            </div>
                        </OrbitingCircles>

                        {/* Second Orbit - Middle */}
                        <OrbitingCircles radius={130} duration={30}>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Monitor className="w-6 h-6 text-cyan-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <BarChart3 className="w-6 h-6 text-green-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Rocket className="w-6 h-6 text-orange-500" strokeWidth={2} />
                            </div>
                        </OrbitingCircles>

                        {/* Third Orbit - Outer (Mobile hidden) */}
                        <OrbitingCircles radius={190} duration={40} reverse className="hidden md:flex">
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2 shadow-lg">
                                <div className="w-4 h-4 bg-linear-to-br from-pink-500 to-rose-500 rounded-full" />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2 shadow-lg">
                                <div className="w-4 h-4 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full" />
                            </div>
                        </OrbitingCircles>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

