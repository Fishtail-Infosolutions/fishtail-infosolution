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
        className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-5xl"
      >
        {text}
      </motion.span>

      {/* Minimal wrapper (no bg, no border, no padding) */}
      <motion.span layout className="relative w-fit overflow-hidden md:text-5xl ml-2 text-2xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.45 }}
            className={cn(
              "inline-block whitespace-nowrap font-bold text-transparent bg-clip-text  bg-gradient-to-br from-[#ABDCFF] to-[#0396FF]"
            )}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};