"use client";

import { Projects } from "@/constants";
import { ProjectCard } from "@/components/projectpage/card";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] mt-32">

      {/* Banner Section */}
      <div className=" w-full flex gap-6 flex-col items-center justify-center text-center px-6">
        <div className=" ">
          <GradientBanner text="Our Projects" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Some of our recent work
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Projects.map((project) => (
            <ProjectCard
              key={project.id}
              imageUrl={project.imageUrl}
              title={project.title}
              className="w-full max-w-sm"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
