"use client"
import React from "react";

type GlassGrayButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function GlassGrayButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: GlassGrayButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative px-8 py-2 rounded-full text-white
        transition-all duration-300 ease-out overflow-hidden
        backdrop-blur-xl
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        background: "rgba(255, 255, 255, 0.06)", // glass base
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: `
          inset 0 0 14px rgba(255,255,255,0.10)
        `,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          inset 0 0 22px rgba(255,255,255,0.22)
        `;
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.28)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          inset 0 0 14px rgba(255,255,255,0.10)
        `;
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.18)";
      }}
    >
      {/* Gloss highlight top */}
      <span
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Subtle inner shadow depth */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.85))",
          mixBlendMode: "overlay",
        }}
      />

      {/* Tiny grain/noise effect (optional but makes glass real) */}
      <span
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
