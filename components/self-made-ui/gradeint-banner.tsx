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
    <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: `radial-gradient(75% 100% at 50% 0%, ${gradientStart} 0%, ${gradientEnd} 75%)`
          }}
        />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 px-4 ring-1 ring-white/10">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-sm">{text}</span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </div>
  );
};

export default GradientBanner;
