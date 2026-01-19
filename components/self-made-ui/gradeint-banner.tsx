import React, { ReactNode } from 'react';

interface BannerProps {
  text: string;
  gradientStart?: string;
  gradientEnd?: string;
  icon?: ReactNode;
}

const GradientBanner: React.FC<BannerProps> = ({
  text,
  gradientStart = 'rgba(56,189,248,0.6)',
  gradientEnd = 'rgba(56,189,248,0)',
  icon = null,
}) => {
  return (
    <div className="bg-slate-300 dark:bg-slate-800 no-underline group relative dark:shadow-none shadow-xl shadow-zinc-500/20 rounded-full p-px text-xs font-semibold leading-6 text-foreground inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: `radial-gradient(75% 100% at 50% 0%, ${gradientStart} 0%, ${gradientEnd} 75%)`
          }}
        />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-background/80 dark:bg-zinc-950 py-1.5 px-4 ring-1 ring-border/20">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-xs md:text-sm">{text}</span>
      </div>
      <span className="absolute bottom-0 left-4.5 block h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </div>
  );
};

export default GradientBanner;
