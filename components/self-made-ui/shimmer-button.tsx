'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerSpeed?: string; // e.g. '2s'
  size?: 'sm' | 'md' | 'lg';
}

export default function ShimmerButton({
  children,
  className,
  shimmerSpeed = '2s',
  size = 'md',
  ...props
}: ShimmerButtonProps) {
  const sizeClasses =
    size === 'sm'
      ? 'h-8 px-3 text-sm'
      : size === 'lg'
      ? 'h-14 px-8 text-lg'
      : 'h-12 px-6 text-base';

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={cn(
        'inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
        sizeClasses,
        className
      )}
      style={{ animationDuration: shimmerSpeed }}
    >
      {children ?? 'Shimmer'}
    </button>
  );
}