'use client';

import GradientBanner from '../self-made-ui/gradeint-banner';
import { Button } from '../ui/button';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import { Projects } from '@/constants';
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa6";

const cardGradients = [
  'linear-gradient(135deg, rgba(90,20,20,0.85), rgba(30,10,10,0.6))',
  'linear-gradient(135deg, rgba(25,35,70,0.86), rgba(10,10,30,0.75))',
  'linear-gradient(135deg, rgba(80,25,100,0.86), rgba(30,8,40,0.7))',
  'linear-gradient(135deg, rgba(20,60,40,0.86), rgba(5,20,10,0.75))',
];

export default function ProjectsSection() {
  return (
    <section className="w-full bg-background sm:mt-20 mt-30 transition-colors duration-500">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center">
          <GradientBanner text="Our Projects" />

          <h2 className="mt-6 text-3xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            Transforming Ideas into Reality
          </h2>

          <div className="w-full">
            <ScrollStack topOffset="2rem" itemDistance={40} itemStackDistance={45}>
              {Projects.slice(0, 3).map((project, i) => (
                <ScrollStackItem
                  key={project.id}
                  bg={cardGradients[i % cardGradients.length]}
                  minHeight="22rem"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8 items-center h-auto md:h-full">
                    {/* 1. Title */}
                    <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-tight text-center md:text-left md:col-start-1 md:row-start-1">
                      {project.title}
                    </h3>

                    {/* 2. Image */}
                    <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl md:col-start-2 md:row-start-1 md:row-span-2">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* 3. Button */}
                    <div className="flex justify-center md:justify-start md:col-start-1 md:row-start-2">
                      <Button
                        variant="default"
                        className="group flex items-center gap-2 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-md bg-white text-black hover:bg-white/90"
                      >
                        View Project
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  );
}
