'use client';

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  Settings,
  Edit3,
  MousePointerClick,
  Link2,
  MapPin,
  ShieldCheck,
  BarChart3,
  Key,
  ShoppingBag,
  Briefcase
} from "lucide-react";
import GradientBanner from '@/components/self-made-ui/gradeint-banner';

const caseStudies = [
  {
    icon: <BarChart3 className="w-5 h-5 text-sky-500" />,
    title: "Lamjung Agri-Hub",
    description: "Paid Search Optimization",
    case: "We optimized Google Ads for this B2B hub, cutting their average CPC by 30 percent while scaling lead conversion by 45 percent through precise intent targeting.",
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
    title: "Patan Fashion Wear",
    description: "Social Ad Campaign",
    case: "By launching a curated Instagram strategy, we helped this local retailer achieve an 18 percent boost in follower engagement and a 22 percent rise in direct sales.",
  },
  {
    icon: <Link2 className="w-5 h-5 text-violet-500" />,
    title: "Everest Trekking Gears",
    description: "Authority Building",
    case: "Our outreach team secured high-tier editorial links from reputable gear reviewers, resulting in 40 percent higher organic visibility and significant domain growth.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-amber-500" />,
    title: "Bhojan Griha",
    description: "Local SEO Strategy",
    case: "We optimized their local presence for authentic dining searches in Kathmandu, which increased physical footfall by 35 percent within a single quarter.",
  },
  {
    icon: <Settings className="w-5 h-5 text-rose-500" />,
    title: "Araniko Tech",
    description: "Technical SEO Audit",
    case: "By resolving critical indexing bottlenecks and improving Core Web Vitals, we achieved 50 percent faster page loads and noticeably higher search rankings.",
  },
  {
    icon: <MousePointerClick className="w-5 h-5 text-indigo-500" />,
    title: "Mandala Artisans",
    description: "Conversion Optimization",
    case: "Redesigning the product flow and checkout logic led to a 28 percent reduction in cart abandonment and a smoother user journey for global customers.",
  },
  {
    icon: <Search className="w-5 h-5 text-teal-500" />,
    title: "Himalaya Wellness",
    description: "Keyword Strategy",
    case: "Identified high-conversion niche terms that shifted their organic traffic profile, leading to a 60 percent increase in qualified inquiries for their services.",
  },
  {
    icon: <Edit3 className="w-5 h-5 text-orange-500" />,
    title: "Gurkha Adventure",
    description: "Content Marketing",
    case: "Developed a series of deep-dive guides into trekking routes that now rank on page one, driving a consistent flow of high-intent organic visitors.",
  },
];

const CaseStudyCard = ({
  icon,
  title,
  description,
  case: caseText
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  case: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-[19rem] cursor-pointer flex-col gap-3 overflow-hidden rounded-2xl border p-5 ",
        "border-border bg-[#f9fafb] hover:bg-gray-950/[.05]",
        "dark:border-border dark:bg-[#0e0e0f] dark:hover:bg-gray-50/[.10]",
        "transition-all duration-300 group"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-foreground leading-none">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 text-[10px] uppercase tracking-wider font-medium">
            {description}
          </p>
        </div>
      </div>
      <p className="text-[14px] text-muted-foreground leading-relaxed ">
        "{caseText}"
      </p>
    </div>
  );
};

export default function SEOMarqueeSection() {
  const firstRow = caseStudies.slice(0, caseStudies.length / 2);
  const secondRow = caseStudies.slice(caseStudies.length / 2);

  return (
    <section className="w-full bg-background pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <GradientBanner text="Case Studies" />
          <h2 className="mt-6 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            Recent Case Studies
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Take a look at how we have helped local businesses and global brands scale their growth through data driven digital strategies.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 overflow-hidden rounded-3xl">
          <Marquee pauseOnHover className="[--duration:50s]">
            {firstRow.map((item) => (
              <CaseStudyCard key={item.title} {...item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:55s]">
            {secondRow.map((item) => (
              <CaseStudyCard key={item.title} {...item} />
            ))}
          </Marquee>

          {/* Visual gradients for fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}
