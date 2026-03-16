'use client';

import { ArrowRight, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { MagicCard } from '../ui/magic-card';
import GlassGrayButton from '../self-made-ui/glass-gray-button';
import ShimmerButton from '../self-made-ui/shimmer-button';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


interface ServiceCardData {
  title: string;
  description: string[];
}

const servicesData: ServiceCardData[] = [
  {
    title: 'Web Development',
    description: [
      'Content writing',
      'Website redesign',
      'Robust web development'
    ]
  },
  {
    title: 'Search Engine Optimization',
    description: [
      'Digital marketing',
      'Email marketing',
      'Search optimization'
    ]
  },
  {
    title: 'Lead Generation',
    description: [
      'Optimization strategies',
      'Affiliate marketing',
      'Conversion enhancement'
    ]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ServicesSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-transparent pt-10 pb-12 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-9">
        <div className="flex flex-col items-center">
          <GradientBanner text="Our Services" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 mb-10 text-center text-3xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Impactful Digital Strategies
          </motion.h2>

          {/* Responsive grid: 1 / 2 / 3 cols. Items stretch so cards align. */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 items-stretch"
          >
            {servicesData.map((service, index) => (
              <motion.div key={index} variants={itemVariants} className="flex">
                <MagicCard
                  className="flex-1 rounded-lg border border-border"
                  gradientColor={mounted && theme === 'light' ? "#E5E7EB" : "#262626"}
                  backgroundClassName="bg-[#f9fafb] dark:bg-[#0e0e0f]"
                >
                  <div className="flex flex-col h-full p-6 sm:p-8">
                    <h3 className="mb-4 text-2xl font-bold text-foreground sm:mb-6">
                      {service.title}
                    </h3>

                    <ul className="mb-6 flex-1 space-y-2 sm:space-y-3">
                      {service.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground">
                          <span className="mt-1 flex-shrink-0 text-cyan-400">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA: full-width on mobile, auto on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 w-full flex justify-center"
          >
            {/* <HoverBorderGradient
              className="max-w-xs md:w-auto flex items-center justify-center gap-2"
              onClick={() => router.push('#services')}
              as="button"
              aria-label="Explore services">
              <span>Explore Services</span>
              <ArrowRightIcon className="w-3 h-3" />
            </HoverBorderGradient> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}