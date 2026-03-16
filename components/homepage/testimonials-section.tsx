'use client';
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GradientBanner from "../self-made-ui/gradeint-banner";
import { TestimonialsData } from "@/constants/testimonials";

const ReviewCard = ({
  src,
  name,
  designation,
  quote,
}: {
  src: string;
  name: string;
  designation: string;
  quote: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full max-w-[340px] cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 backdrop-blur-sm"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full object-cover" width="32" height="32" alt={name} src={src} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-[10px] font-medium dark:text-white/40">{designation}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        "{quote}"
      </blockquote>
    </figure>
  );
};

export function TestimonialsSection() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  // Distribute data across 3 columns
  const firstRow = TestimonialsData.slice(0, 2);
  const secondRow = TestimonialsData.slice(2, 4);
  const thirdRow = TestimonialsData.slice(4, 5).concat(TestimonialsData.slice(0, 1));

  return (
    <section className="flex flex-col items-center gap-8 pt-16 pb-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-4xl px-4"
      >
        <div className="flex justify-center">
          <GradientBanner text="Testimonials" />
        </div>
        <h2 className="mt-6 mb-6 text-3xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
          What Clients Say About Us
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex h-[400px] w-full flex-row items-center justify-center gap-4 md:gap-6 overflow-hidden perspective-[1000px] px-4"
      >
        <div
          className="flex flex-row items-center gap-4 md:gap-6 py-4"
          style={{
            transform:
              "translateX(-10px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-8deg) rotateZ(5deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:35s]">
            {firstRow.map((review, idx) => (
              <ReviewCard key={`col1-${idx}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]" vertical>
            {secondRow.map((review, idx) => (
              <ReviewCard key={`col2-${idx}`} {...review} />
            ))}
          </Marquee>
          {/* Only show 3rd column on desktop (lg and up) */}
          <Marquee reverse pauseOnHover className="hidden lg:flex [--duration:40s]" vertical>
            {thirdRow.map((review, idx) => (
              <ReviewCard key={`col3-${idx}`} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </motion.div>
    </section>
  );
}
