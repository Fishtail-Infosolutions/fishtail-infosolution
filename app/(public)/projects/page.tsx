"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/projectpage/card";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { PublicWebsiteLoader } from "@/components/self-made-ui/public-website-loader";

interface Project {
  _id: string;
  title: string;
  imageUrl: string;
  projectUrl: string;
  description: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/public/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <PublicWebsiteLoader message="Loading projects..." />;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 font-medium italic">No projects found in showcase yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
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
                  description={project.description}
                  projectUrl={project.projectUrl}
                  className="w-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
