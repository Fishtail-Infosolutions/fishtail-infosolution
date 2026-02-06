import AnimatedStatistics from "@/components/homepage/animated-statistics";
import HeroSection from "@/components/homepage/hero-section";
import ProjectsSection from "@/components/homepage/projects-section";
import ServicesSection from "@/components/homepage/services-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import WhyChooseUsSection from "@/components/homepage/why-choose-us-section";

import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="relative">
      <StarsBackground />
      <div className="">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ProjectsSection />
        <AnimatedStatistics />
        <TestimonialsSection />
      </div>
    </div>

  );
}
