'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { Spotlight } from '../ui/spotlight-new';
import { ArrowRightIcon, ChartNoAxesColumnIncreasingIcon } from 'lucide-react';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { LayoutTextFlip } from '../ui/layout-text-flip';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { FreeQuoteDialog } from "./free-quote-dialog";

export default function HeroSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full ">
      <div className="h-[40rem] w-full rounded-md flex items-center justify-center antialiased relative overflow-hidden bg-background">
        {mounted && theme === 'dark' && <Spotlight />}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative z-10 px-6 max-w-4xl text-center"
        >
          <div className="flex justify-center mb-3.5">
            <GradientBanner text="Trusted SEO and Digital Partner" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
            <LayoutTextFlip
              text="Elevate Your Digital Presence with"
              words={['Web Development', 'Search Optimization', 'Lead Generation']}
            />
          </h1>

          <p className="mt-4 text-md md:text-lg text-muted-foreground mx-auto">
            We build SEO, web, and marketing strategies that drive measurable growth—clear, focused, and performance-driven.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <FreeQuoteDialog>
              <Button>
                <ChartNoAxesColumnIncreasingIcon />
                Free Quote
              </Button>
            </FreeQuoteDialog>

            <HoverBorderGradient
              onClick={() => router.push('/company')}
              as="button"
              className="flex items-center justify-center gap-2"
            >
              <span>Learn More</span>
              <ArrowRightIcon className="w-3 h-3" />
            </HoverBorderGradient>
          </motion.div>
        </motion.div>
      </div>
    </section >
  );
}