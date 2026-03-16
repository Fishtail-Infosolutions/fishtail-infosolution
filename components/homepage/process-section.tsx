"use client";

import React from "react";
import { ShineBorder } from "@/components/ui/shine-border";
import GradientBanner from "../self-made-ui/gradeint-banner";
import { motion } from "framer-motion";

const seoSteps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description: "We deep-dive into your website health, competitor landscape, and current rankings to build a solid foundation.",
  },
  {
    number: "02",
    title: "Keyword Intelligence",
    description: "Identifying high-intent, low-competition keywords that your target audience is actually searching for.",
  },
  {
    number: "03",
    title: "Content Optimization",
    description: "Crafting and fine-tuning high-quality content that satisfies both search engines and human readers.",
  },
  {
    number: "04",
    title: "Technical Excellence",
    description: "Supercharging site speed, mobile responsiveness, and crawlability for the best user experience.",
  },
  {
    number: "05",
    title: "Authority Building",
    description: "Acquiring premium backlink profiles to signal trustworthiness and boost your domain authority.",
  },
  {
    number: "06",
    title: "Performance Tracking",
    description: "Transparent, real-time reporting and data-driven adjustments to ensure sustainable growth.",
  },
];

const SHINE_COLORS = ["#A07CFE", "#FE8FB5", "#FFBE7B"];

export default function ProcessSection() {
  return (
    <section className="relative w-full  pb-12 bg-transparent overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GradientBanner text="Our Strategic Process" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-3xl font-medium  tracking-tight sm:text-3xl md:text-4xl text-foreground"
          >
            Blueprint for Your Digital Success
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mt-6 text-lg text-muted-foreground"
          >
            A data-driven, systematic approach to SEO that delivers measurable results and long-term organic growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {seoSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className="relative flex flex-col items-start justify-start w-full h-full p-8 overflow-hidden rounded-3xl bg-background dark:bg-zinc-950/50 border border-transparent shadow-sm">
                <ShineBorder
                  shineColor={SHINE_COLORS}
                  borderWidth={1}
                  duration={14}
                  className="rounded-3xl"
                />

                <div className="relative z-10 w-full">
                  <span className="text-5xl font-black transition-colors duration-300 opacity-10 font-outfit text-foreground group-hover:opacity-20 block mb-6">
                    {step.number}
                  </span>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
