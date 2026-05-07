'use client';

import { useEffect, useState, useRef } from 'react';
import GradientBanner from '../self-made-ui/gradeint-banner';
import { Button } from '../ui/button';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import { cn } from '@/lib/utils';

const cardGradients = [
  'linear-gradient(135deg, rgba(90,20,20,0.85), rgba(30,10,10,0.6))',
  'linear-gradient(135deg, rgba(25,35,70,0.86), rgba(10,10,30,0.75))',
  'linear-gradient(135deg, rgba(80,25,100,0.86), rgba(30,8,40,0.7))',
  'linear-gradient(135deg, rgba(20,60,40,0.86), rgba(5,20,10,0.75))',
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/public/projects');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-transparent h-[600px] flex items-center justify-center">
        <span className="animate-pulse w-full h-full bg-accent/5 rounded-3xl"></span>
      </section>
    );
  }

  if (projects.length === 0) return null;

  const displayProjects = projects.slice(0, 3);

  return (
    <section className="w-full bg-transparent pt-16 pb-12 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          <GradientBanner text="Our Projects" />

          <h2 className="mt-6 text-3xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-8">
            Transforming Ideas into Reality
          </h2>

          {/* ── Mobile: Premium Horizontal Carousel — Native, smooth, and compact ── */}
          <div className="lg:hidden w-full mt-10 overflow-hidden">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 pb-8 px-6"
            >
              {displayProjects.map((project, i) => (
                <div
                  key={project._id}
                  className="flex-none w-[82vw] snap-center"
                >
                  <div
                    className="rounded-[32px] p-6 shadow-2xl h-full flex flex-col border border-white/10"
                    style={{
                      background: `${cardGradients[i % cardGradients.length]}, linear-gradient(180deg, rgba(8,8,10,0.96), rgba(4,4,6,0.99))`,
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 text-left">
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {project.description}
                      </p>
                      
                      <Link href={project.projectUrl || '#'} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button
                          variant="default"
                          className="w-full group flex items-center justify-center gap-2 rounded-full py-6 bg-white text-black hover:bg-white/90 font-semibold"
                        >
                          View Project
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* "View All" card at the end */}
              <div className="flex-none w-[60vw] snap-center flex flex-col items-center justify-center py-10">
                <Link href="/projects" className="flex flex-col items-center gap-5 group">
                   <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110 border border-white/5">
                      <FaArrowRight className="w-10 h-10 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                   </div>
                   <span className="text-white font-semibold text-xl">View All</span>
                </Link>
              </div>
            </div>
            
            {/* Scroll Progress indicators (Active Dot Logic) */}
            <div className="flex justify-center gap-2 mt-1">
               {displayProjects.map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "h-1.5 rounded-full transition-all duration-300",
                     activeIndex === i 
                       ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                       : "w-1.5 bg-white/20"
                   )} 
                 />
               ))}
               {/* Dot for the "View All" card if desired, or just the 3 projects */}
               <div 
                 className={cn(
                   "h-1.5 rounded-full transition-all duration-300",
                   activeIndex >= displayProjects.length 
                     ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                     : "w-1.5 bg-white/20"
                 )} 
               />
            </div>
          </div>

          {/* ── Desktop: full animated ScrollStack with Lenis ── */}
          <div className="hidden lg:block w-full">
            <ScrollStack topOffset="2rem" itemDistance={40} itemStackDistance={45}>
              {displayProjects.map((project, i) => (
                <ScrollStackItem
                  key={project._id}
                  bg={cardGradients[i % cardGradients.length]}
                  minHeight="22rem"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8 items-center h-auto md:h-full">
                    <div className="flex flex-col items-center md:items-start gap-7 order-2 md:order-1">
                      <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-tight text-center md:text-left">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 dark:text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 text-center md:text-left">
                        {project.description}
                      </p>
                      <Link href={project.projectUrl || '#'} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="default"
                          className="group flex items-center gap-2 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-md bg-white text-black hover:bg-white/90"
                        >
                          View Project
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
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
