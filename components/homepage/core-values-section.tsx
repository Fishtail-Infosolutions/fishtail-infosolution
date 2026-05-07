'use client';

import { HoverEffect } from '@/components/ui/card-hover-effect';
import GradientBanner from '@/components/self-made-ui/gradeint-banner';
import {
  Lightbulb,
  ShieldCheck,
  Users,
  Trophy,
  TrendingUp,
  Heart,
} from 'lucide-react';

const coreValues = [
  {
    icon: <Lightbulb className="w-6 h-6 text-sky-400" />,
    title: 'Innovation',
    description:
      'We embrace bold ideas and cutting-edge technology to craft solutions that are ahead of their time.',
    link: '#',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: 'Integrity',
    description:
      'Honesty and transparency guide every decision we make — with clients, partners, and each other.',
    link: '#',
  },
  {
    icon: <Users className="w-6 h-6 text-violet-400" />,
    title: 'Collaboration',
    description:
      'Great products are built together. We foster open communication and thrive as one unified team.',
    link: '#',
  },
  {
    icon: <Trophy className="w-6 h-6 text-amber-400" />,
    title: 'Excellence',
    description:
      'We set the bar high. Mediocrity is never an option, quality and craftsmanship define our work.',
    link: '#',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-rose-400" />,
    title: 'Growth',
    description:
      'Continuous learning is in our DNA. We evolve with every project, pushing ourselves to grow.',
    link: '#',
  },
  {
    icon: <Heart className="w-6 h-6 text-pink-400" />,
    title: 'Client Focus',
    description:
      "Our clients' success is our success. We listen deeply and deliver solutions that truly matter.",
    link: '#',
  },
];

export default function CoreValuesSection() {
  return (
    <section className="w-full bg-transparent pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-2">
          <GradientBanner text="Our Core Values" />
          <h2 className="mt-6 text-3xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            The Principles That Drive Us
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Everything we do is grounded in a set of core values that shape our
            culture, fuel our passion, and guide every project we take on.
          </p>
        </div>

        {/* Cards */}
        <HoverEffect
          items={coreValues}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </section>
  );
}
