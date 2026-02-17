'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { ArrowRightIcon, Code2, Users, TrendingUp, CheckCircle2, Sparkles, Globe } from 'lucide-react';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { LayoutTextFlip } from '../ui/layout-text-flip';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import DarkVeil from '../ui/DarkVeil';
import { FreeQuoteDialog } from "./free-quote-dialog";

export default function HeroSection() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full">
      <div className="min-h-screen w-full flex items-center justify-center antialiased relative overflow-hidden bg-transparent pt-32 pb-16 px-6">

        {mounted && (
          <div className={cn("absolute inset-0 w-full h-full pointer-events-none -z-20", resolvedTheme === 'light' ? "invert" : "")}>
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={1}
              scanlineFrequency={0}
              warpAmount={0}
              baseColor={resolvedTheme === 'light' ? [0, 0, 0] : [0.035, 0.035, 0.043]}
              tintColor={resolvedTheme === 'light' ? [0.95, 0.55, 0.0] : [0.05, 0.45, 1.0]}
              tintStrength={1.0}
            />
          </div>
        )}

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[450px]">

            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="flex-1 text-center lg:text-left w-full"
            >
              <div className="flex justify-center lg:justify-start mb-4">
                <GradientBanner text="Trusted SEO and Digital Partner" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.15]">
                <LayoutTextFlip
                  text="Elevate Your Digital Presence with "
                  words={['Web Development', 'Search Optimization', 'Lead Generation']}
                />
              </h1>

              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                We build SEO, web, and marketing strategies that drive measurable growth focused, and performance driven.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex flex-row items-center justify-center lg:justify-start gap-4"
              >
                <FreeQuoteDialog>
                  <Button
                    className="h-11 md:h-12 w-34 sm:w-40 rounded-full bg-linear-to-br from-blue-400 to-blue-700 text-white border-none font-medium transition-all hover:opacity-90"
                  >
                    <span className="text-sm md:text-base">Free Quote</span>
                  </Button>
                </FreeQuoteDialog>

                <HoverBorderGradient
                  onClick={() => router.push('/company')}
                  as="button"
                  moving={false}
                  containerClassName="rounded-full h-11 md:h-12 sm:w-40"
                  className="flex dark:bg-black items-center justify-center gap-2 w-full h-full bg-background"
                >
                  <span className="text-sm md:text-base font-medium">Learn More</span>
                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                </HoverBorderGradient>
              </motion.div>
            </motion.div>

            {/* Right Side - Bento Grid Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
              className="relative mt-8 lg:mt-0 sm:h-[390px] flex flex-col sm:flex-row gap-3 w-full sm:w-auto lg:w-[600px] shrink-0"
            >
              {/* Left Column - 2/3 top + 1/3 bottom */}
              <div className="flex flex-col gap-3 w-full sm:w-44 lg:w-52">
                {/* Top 2/3 - Affiliate Network */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className={cn(
                    "flex-[2] p-5 rounded-2xl shadow-xl",
                    "bg-white/40 dark:bg-gray-900/40",
                    "backdrop-blur-[40px] backdrop-saturate-150",
                    "border border-white/60 dark:border-gray-700/60",
                    "hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all duration-300"
                  )}
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 mb-3 w-fit backdrop-blur-sm">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                      10+
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">Partners</div>
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1 text-center">Affiliate Network</div>
                  <div className="text-xs text-muted-foreground text-center">Growing partnerships worldwide</div>
                </motion.div>

                {/* Bottom 1/3 - Global Reach */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className={cn(
                    "flex-[1] p-4 rounded-2xl shadow-xl",
                    "bg-white/35 dark:bg-gray-900/35",
                    "backdrop-blur-[35px] backdrop-saturate-150",
                    "border border-white/50 dark:border-gray-700/50",
                    "hover:bg-white/45 dark:hover:bg-gray-900/45 transition-all duration-300"
                  )}
                >
                  <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 mb-2 w-fit backdrop-blur-sm">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Global Reach</div>
                  <div className="text-lg font-bold text-foreground">Worldwide</div>
                </motion.div>
              </div>

              {/* Center Column - Full height Expert Team */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={cn(
                  "w-full sm:w-48 lg:w-56 h-full p-6 rounded-3xl shadow-2xl",
                  "bg-white/40 dark:bg-gray-900/40",
                  "backdrop-blur-[40px] backdrop-saturate-150",
                  "border border-white/60 dark:border-gray-700/60",
                  "hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all duration-300"
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex -space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-linear-to-br from-purple-400 to-purple-600 shadow-xl"></div>
                      <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-linear-to-br from-cyan-400 to-cyan-600 shadow-xl"></div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Search Growth Experts</h3>
                    <p className="text-xs text-muted-foreground">SEO & affiliate specialists</p>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">SEO Strategists</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 dark:bg-purple-500/30 backdrop-blur-sm">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Content Writers</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 dark:bg-cyan-500/30 backdrop-blur-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Technical SEO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - 1/3 top + 2/3 bottom */}
              <div className="flex flex-col gap-3 w-full sm:w-48 lg:w-56">
                {/* Top 1/3 - Modern Tech */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className={cn(
                    "flex-[1] p-4 rounded-2xl shadow-xl",
                    "bg-white/35 dark:bg-gray-900/35",
                    "backdrop-blur-[35px] backdrop-saturate-150",
                    "border border-white/50 dark:border-gray-700/50",
                    "hover:bg-white/45 dark:hover:bg-gray-900/45 transition-all duration-300"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm">
                      <Code2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">SEO Tech Stack</h3>
                      <p className="text-xs text-muted-foreground">Built for rankings</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></div>
                  </div>
                </motion.div>

                {/* Bottom 2/3 - What We Do */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className={cn(
                    "flex-[2] p-5 rounded-2xl shadow-xl",
                    "bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-950/30 dark:to-gray-900/40",
                    "backdrop-blur-[40px] backdrop-saturate-150",
                    "border border-blue-200/60 dark:border-blue-800/50",
                    "hover:from-blue-50/60 hover:to-white/60 dark:hover:from-blue-950/40 dark:hover:to-gray-900/50 transition-all duration-300"
                  )}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="p-2 rounded-lg bg-blue-500/30 dark:bg-blue-500/40 backdrop-blur-sm"
                    >
                      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <span className="text-sm font-bold text-foreground">What We Build</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="px-3 py-1.5 bg-blue-500/25 dark:bg-blue-500/35 text-blue-700 dark:text-blue-300 text-xs rounded-full font-semibold backdrop-blur-sm border border-blue-300/30 dark:border-blue-600/30">
                      Authority Sites
                    </span>
                    <span className="px-3 py-1.5 bg-purple-500/25 dark:bg-purple-500/35 text-purple-700 dark:text-purple-300 text-xs rounded-full font-semibold backdrop-blur-sm border border-purple-300/30 dark:border-purple-600/30">
                      SEO Content
                    </span>
                    <span className="px-3 py-1.5 bg-cyan-500/25 dark:bg-cyan-500/35 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-semibold backdrop-blur-sm border border-cyan-300/30 dark:border-cyan-600/30">
                      Affiliate Systems
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Floating accent elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/3 w-32 h-32 bg-linear-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl -z-10"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-linear-to-br from-purple-400/10 to-purple-600/10 rounded-full blur-3xl -z-10"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}