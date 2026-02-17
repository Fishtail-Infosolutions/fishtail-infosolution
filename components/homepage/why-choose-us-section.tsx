'use client';

import { SearchIcon, Code2Icon, Users2Icon, BarChart3Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { IconCloud } from "@/components/ui/icon-cloud";
import LogoLoop from "@/components/ui/LogoLoop";
import { Badge } from "@/components/ui/badge";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { motion, Variants } from "framer-motion";

import { AnimatedList } from "../ui/animated-list";

// Micro chart component props interface
interface MicroChartProps {
    label: string;
    value?: string;
    data: number[];
    type: "line" | "bar" | "sparkline";
    color: "emerald" | "blue" | "purple";
}

// SEO metrics for animated micro charts
const seoMetrics: MicroChartProps[] = [
    {
        label: "Organic Traffic",
        value: "+97%",
        data: [20, 35, 45, 60, 75, 90, 100],
        type: "line",
        color: "emerald",
    },
    {
        label: "Keyword Rankings",
        data: [30, 45, 60, 75, 85, 95],
        type: "bar",
        color: "blue",
    },
    {
        label: "Conversion Rate",
        value: "+89%",
        data: [25, 30, 40, 35, 50, 60, 75, 85, 90],
        type: "sparkline",
        color: "purple",
    },
];




const slugs = [
    "typescript",
    "javascript",
    "java",
    "react",
    "html5",
    "css3",
    "express",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "figma",
];

const brandColors = ["6366f1", "a855f7", "ec4899", "f59e0b", "10b981", "3b82f6"];

const MaskedLogo = ({ src, alt, colorClass }: { src: string; alt: string; colorClass: string }) => (
    <div
        className={cn(
            "h-12 w-32 transition-all duration-300",
            colorClass
        )}
        style={{
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
        }}
        aria-label={alt}
    />
);

const brandLogos = [
    { node: <MaskedLogo src="/brand-that-trust-us/logo2.png" alt="Partner Logo 2" colorClass="bg-blue-500 dark:bg-blue-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo3.png" alt="Partner Logo 3" colorClass="bg-emerald-500 dark:bg-emerald-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo4.png" alt="Partner Logo 4" colorClass="bg-purple-500 dark:bg-purple-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo5.png" alt="Partner Logo 5" colorClass="bg-amber-500 dark:bg-amber-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo2.png" alt="Partner Logo 2" colorClass="bg-blue-500 dark:bg-blue-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo3.png" alt="Partner Logo 3" colorClass="bg-emerald-500 dark:bg-emerald-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo4.png" alt="Partner Logo 4" colorClass="bg-purple-500 dark:bg-purple-400" /> },
    { node: <MaskedLogo src="/brand-that-trust-us/logo5.png" alt="Partner Logo 5" colorClass="bg-amber-500 dark:bg-amber-400" /> },
];

const MicroChart = ({ label, value, data, type, color }: MicroChartProps) => {
    const colorClasses = {
        emerald: {
            stroke: "stroke-emerald-500",
            fill: "fill-emerald-500/20",
            bar: "bg-emerald-500",
            text: "text-emerald-600 dark:text-emerald-400",
        },
        blue: {
            stroke: "stroke-blue-500",
            fill: "fill-blue-500/20",
            bar: "bg-blue-500",
            text: "text-blue-600 dark:text-blue-400",
        },
        purple: {
            stroke: "stroke-purple-500",
            fill: "fill-purple-500/20",
            bar: "bg-purple-500",
            text: "text-purple-600 dark:text-purple-400",
        },
    };

    const colors = colorClasses[color];
    const max = Math.max(...data);
    const normalized = data.map(d => (d / max) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "relative overflow-hidden rounded-xl border p-4",
                "border-gray-950/10 bg-white/80 backdrop-blur-sm",
                "dark:border-gray-50/10 dark:bg-gray-900/80",
                "shadow-sm"
            )}
        >
            <div className="mb-3">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{label}</div>
                {value && (
                    <div className={cn("text-lg font-bold", colors.text)}>{value}</div>
                )}
            </div>

            {/* Chart rendering */}
            <div className="h-16 flex items-end gap-1">
                {type === "bar" && normalized.map((height, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                            duration: 1.5,
                            delay: idx * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3,
                            repeatType: "reverse",
                        }}
                        className={cn("flex-1 rounded-sm", colors.bar)}
                        style={{ opacity: 0.7 + (height / 100) * 0.3 }}
                    />
                ))}

                {(type === "line" || type === "sparkline") && (
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut",
                            }}
                            d={`M ${normalized.map((val, idx) =>
                                `${(idx / (normalized.length - 1)) * 100},${100 - val}`
                            ).join(' L ')}`}
                            fill="none"
                            strokeWidth="3"
                            className={colors.stroke}
                        />
                        {type === "line" && (
                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                d={`M ${normalized.map((val, idx) =>
                                    `${(idx / (normalized.length - 1)) * 100},${100 - val}`
                                ).join(' L ')} L 100,100 L 0,100 Z`}
                                className={colors.fill}
                            />
                        )}
                    </svg>
                )}
            </div>
        </motion.div>
    );
};

// Affiliate notification items
const notifications = [
    {
        name: "Traffic Spike",
        description: "Organic traffic increased by +24%",
        time: "15m ago",
        icon: "📈",
        color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        name: "New Conversion",
        description: "User converted via 'Best Laptops' guide",
        time: "1h ago",
        icon: "👤",
        color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        name: "Rank #1 Achieved",
        description: "'Best Coffee Maker' now ranks #1 on Google",
        time: "3h ago",
        icon: "🏆",
        color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
];

interface NotificationProps {
    name: string
    description: string
    icon: string
    color: string
    time: string
}

const Notification = ({ name, description, icon, color, time }: NotificationProps) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className={cn(
                        "flex size-10 items-center justify-center rounded-2xl text-lg",
                        color
                    )}
                >
                    <span className="text-xl">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};

const features = [
    {
        Icon: SearchIcon,
        name: "SEO Mastery",
        description: "Data-driven strategies that rank and convert organically.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute inset-0 flex items-center justify-center p-8 [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]">
                <div className="grid grid-cols-3 gap-4 w-full max-w-3xl mb-20">
                    {seoMetrics.map((metric, idx) => (
                        <MicroChart key={idx} {...metric} />
                    ))}
                </div>
            </div>
        ),
    },
    {
        Icon: BarChart3Icon,
        name: "Affiliate Success",
        description: "Revenue-focused content optimization.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 pt-10 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                <AnimatedList className="w-full">
                    {notifications.map((item, idx) => (
                        <Notification {...item} key={idx} />
                    ))}
                </AnimatedList>
            </div>
        ),
    },
    {
        Icon: Code2Icon,
        name: "Modern Web Development",
        description: "Lightning-fast modern solutions.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden mb-18">
                <IconCloud
                    images={slugs.map(
                        (slug) => `https://cdn.simpleicons.org/${slug}`
                    )}
                />
            </div>
        ),
    },
    {
        Icon: Users2Icon,
        name: "Brands That Trust Us",
        description: "Trusted by industry leaders and innovative startups worldwide.",
        className: "col-span-3 lg:col-span-2",
        href: "#",
        cta: "Learn more",
        background: (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-8 mb-20">
                {(() => {
                    const LogoLoopComponent = LogoLoop as any;
                    return (
                        <LogoLoopComponent
                            logos={brandLogos}
                            speed={80}
                            logoHeight={50}
                            gap={80}
                            fadeOut={true}
                            pauseOnHover={true}
                            className="w-full"
                        />
                    );
                })()}
            </div>
        ),
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Using a cubic-bezier array for better type compatibility
    }
};

export default function WhyChooseUsSection() {
    return (
        <section className="w-full bg-background pt-10 pb-20 transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 lg:px-9">
                <div className="flex flex-col items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <GradientBanner text="Why Choose Us" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="mt-8 mb-4 text-center text-3xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl"
                    >
                        Built for Growth, Powered by Results
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-center text-muted-foreground max-w-2xl"
                    >
                        Combining modern technology with proven strategies for specific sustainable growth.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <BentoGrid>
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={feature.className}
                            >
                                <BentoCard {...feature} className="h-full" />
                            </motion.div>
                        ))}
                    </BentoGrid>
                </motion.div>
            </div>
        </section>
    );
}
