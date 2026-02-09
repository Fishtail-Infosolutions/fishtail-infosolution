'use client';

import { motion } from 'motion/react';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { Code, Sparkles, Target, Users, Zap, Trophy } from 'lucide-react';

export function AboutUsSection() {
    return (
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
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
                            look stunning—they drive real, measurable results for your business growth.
                        </motion.p>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-3 gap-6 pt-6"
                        >
                            <div className="space-y-1">
                                <p className="text-3xl md:text-4xl font-bold text-foreground">50+</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Projects Delivered</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl md:text-4xl font-bold text-foreground">98%</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Client Satisfaction</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl md:text-4xl font-bold text-foreground">5+</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Years Experience</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Orbiting Circles Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative flex items-center justify-center h-[400px] md:h-[500px]"
                    >
                        {/* Center Logo/Icon */}
                        <div className="absolute z-10 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/30 blur-3xl rounded-full" />
                                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 md:p-8 rounded-2xl shadow-2xl">
                                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
                                </div>
                            </div>
                        </div>

                        {/* First Orbit - Inner */}
                        <OrbitingCircles radius={100} duration={20} reverse>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Code className="w-6 h-6 text-blue-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Target className="w-6 h-6 text-purple-500" strokeWidth={2} />
                            </div>
                        </OrbitingCircles>

                        {/* Second Orbit - Middle */}
                        <OrbitingCircles radius={160} duration={30}>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Zap className="w-6 h-6 text-yellow-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Users className="w-6 h-6 text-green-500" strokeWidth={2} />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-3 shadow-lg">
                                <Trophy className="w-6 h-6 text-orange-500" strokeWidth={2} />
                            </div>
                        </OrbitingCircles>

                        {/* Third Orbit - Outer (Mobile hidden) */}
                        <OrbitingCircles radius={220} duration={40} reverse className="hidden md:flex">
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2 shadow-lg">
                                <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full" />
                            </div>
                            <div className="flex items-center justify-center bg-background border-2 border-border rounded-full p-2 shadow-lg">
                                <div className="w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full" />
                            </div>
                        </OrbitingCircles>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
