import HeroSection from "@/components/homepage/hero-section";
import ProjectsSection from "@/components/homepage/projects-section";
import ServicesSection from "@/components/homepage/services-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";

export default function Home() {
  return (
    <div>
        <div className="">
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <TestimonialsSection />
        </div>
    </div>
   
  );
}
