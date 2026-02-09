"use client";

import * as React from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function ThemeToggle({ className }: { className?: string }) {
    return <AnimatedThemeToggler className={className} />;
}
