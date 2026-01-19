"use client";

import { motion } from "motion/react";
import { Projects } from "@/constants/projects";
import { ProjectCard } from "@/components/projectpage/card";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background antialiased transition-colors duration-500 mt-32">

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className=" w-full flex gap-6 flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" "
        >
          <GradientBanner text="Our Projects" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-semibold text-foreground"
        >
          Some of our recent work
        </motion.h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="w-full max-w-sm"
            >
              <ProjectCard
                imageUrl={project.imageUrl}
                title={project.title}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
