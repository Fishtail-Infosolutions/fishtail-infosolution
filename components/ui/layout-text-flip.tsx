'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text?: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className="font-bold drop-shadow-lg leading-inherit"
      >
        {text}
      </motion.span>

      {/* Minimal wrapper (no bg, no border, no padding) */}
      <motion.span
        layout
        className="relative inline-grid grid-cols-1 grid-rows-1 overflow-hidden ml-0 md:ml-4 text-center md:text-left justify-items-center md:justify-items-start leading-inherit w-full md:w-fit"
      >
        {/* Invisible placeholders to maintain consistent width of the longest word */}
        {words.map((w, i) => (
          <span
            key={w}
            className={cn(
              "invisible pointer-events-none select-none row-start-1 col-start-1 whitespace-nowrap font-bold",
              i !== 0 && "h-0"
            )}
            aria-hidden="true"
          >
            {w}
          </span>
        ))}

        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.45 }}
            className={cn(
              "inline-block whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ABDCFF] to-[#0396FF] row-start-1 col-start-1"
            )}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};