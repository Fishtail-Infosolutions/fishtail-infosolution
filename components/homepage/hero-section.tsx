'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Button as MovingBorderButton } from '../ui/moving-border';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { Spotlight } from '../ui/spotlight-new';
import { ArrowRightIcon, ChartNoAxesColumnIncreasingIcon } from 'lucide-react';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { LayoutTextFlip } from '../ui/layout-text-flip';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import DarkVeil from '../DarkVeil';

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
      <div className="min-h-screen w-full rounded-md flex items-center justify-center antialiased relative overflow-hidden bg-transparent pt-32 pb-16">

        {mounted && (
          <div className={cn(
            "absolute inset-0 w-full h-full pointer-events-none -z-20",
            resolvedTheme === 'light' ? "invert" : ""
          )}>
            <DarkVeil
              hueShift={resolvedTheme === 'light' ? 180 : 0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={1}
              scanlineFrequency={0}
              warpAmount={0}
              baseColor={resolvedTheme === 'light' ? [0, 0, 0] : [0.035, 0.035, 0.043]}
            />
          </div>
        )}



        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative z-10 px-6 max-w-4xl text-center"
        >
          <div className="flex justify-center mb-3.5">
            <GradientBanner text="Trusted SEO and Digital Partner" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.2] md:leading-[1.1]">
            <LayoutTextFlip
              text="Elevate Your Digital Presence with"
              words={['Web Development', 'Search Optimization', 'Lead Generation']}
            />
          </h1>

          <p className="mt-4 md:mt-6 max-w-2xl text-md md:text-lg text-muted-foreground mx-auto">
            We build SEO, web, and marketing strategies that drive measurable growth—clear, focused, and performance-driven.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <FreeQuoteDialog>
              <MovingBorderButton
                borderRadius="1.75rem"
                containerClassName="h-10 w-32 md:h-12 md:w-40"
                className="bg-slate-800 text-white border-slate-800 flex items-center gap-2"
              >
                <ChartNoAxesColumnIncreasingIcon className="w-4 h-4 md:w-5 md:h-5 text-[#0396FF]" />
                <span className="text-sm md:text-base font-medium">Free Quote</span>
              </MovingBorderButton>
            </FreeQuoteDialog>

            <HoverBorderGradient
              onClick={() => router.push('/company')}
              as="button"
              moving={false}
              containerClassName=" rounded-[1.75rem]"
              className="flex dark:bg-black items-center justify-center gap-2 w-full h-full bg-background"
            >
              <span className="text-sm md:text-base font-medium">Learn More</span>
              <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </HoverBorderGradient>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}