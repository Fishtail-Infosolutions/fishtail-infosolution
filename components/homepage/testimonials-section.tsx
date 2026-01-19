'use client';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GradientBanner from "../self-made-ui/gradeint-banner";
import { TestimonialsData } from "@/constants/testimonials";

export function TestimonialsSection() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 28, scale: 0.995 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.06, ease: 'easeOut' }}
          className="text-center max-w-4xl"
        >
          <GradientBanner text="Testimonials" />
          <h2 className="mt-6 mb-6 text-center text-3xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            What Clients Say About Us
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.997 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.64, delay: 0.14, ease: 'easeOut' }}
          className="w-full max-w-5xl"
        >
          <AnimatedTestimonials testimonials={TestimonialsData} />
        </motion.div>
      </motion.section>
    </>
  )
}
