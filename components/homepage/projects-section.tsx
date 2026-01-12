'use client';

import GradientBanner from '../self-made-ui/gradeint-banner';
import { Button } from '../ui/button';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

const projects = [
  {
    title: 'Dark SaaS Landing',
    year: 2022,
    summary: 'Improved UX and performance, drove mobile traffic by 35%',
    img: '/projects/dark-saas.png',
    href: '#',
    bg: 'linear-gradient(135deg, rgba(90,20,20,0.85), rgba(30,10,10,0.6))'
  },
  {
    title: 'E-commerce Redesign',
    year: 2023,
    summary: 'Conversion-first redesign with A/B testing and tracking',
    img: '/projects/ecommerce.png',
    href: '#',
    bg: 'linear-gradient(135deg, rgba(25,35,70,0.86), rgba(10,10,30,0.75))'
  },
  {
    title: 'SEO Growth Campaign',
    year: 2024,
    summary: 'Organic traffic uplift through technical SEO and content',
    img: '/projects/seo-campaign.png',
    href: '#',
    bg: 'linear-gradient(135deg, rgba(80,25,100,0.86), rgba(30,8,40,0.7))'
  }
];

export default function ProjectsSection() {
  return (
    <section className="w-full bg-black mt-20 py-12 lg:py-36">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          <GradientBanner text="Our Projects" />

          <h2 className="mt-6 text-3xl sm:text-3xll md:text-4xl font-medium tracking-tight text-white">
            Transforming Ideas into Reality
          </h2>

          <div className="w-full">
            <ScrollStack>
              {projects.map((p, i) => (
                <ScrollStackItem key={i} bg={p.bg} minHeight="32rem">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">{p.title} <span className="ml-2 text-sm text-white/60">• {p.year}</span></h3>
                    <p className="mt-2 text-sm text-gray-300">{p.summary}</p>

                    {p.img && (
                      <div className="mt-3 overflow-hidden rounded-md h-44">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="mt-4">
                      <Button className="inline-flex items-center gap-2">
                        View Project
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