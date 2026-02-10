"use client";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { motion } from "motion/react";

interface NotFoundComponentProps {
    message?: string;
    linkText?: string;
    linkHref?: string;
}

export function NotFoundComponent({
    message = "The requested URL was not found on this server.",
    linkText = "Go to Home",
    linkHref = "/",
}: NotFoundComponentProps) {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        // Fetch the Lottie JSON from the public folder
        fetch("/lottie-animation/Error 404.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch animation data");
                }
                return res.json();
            })
            .then((data) => setAnimationData(data))
            .catch((error) => {
                console.error("Error loading Lottie animation:", error);
            });
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    if (!animationData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <span className="text-lg animate-pulse"></span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground transition-colors duration-300 pt-24"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full max-w-md md:max-w-lg lg:max-w-sm"
            >
                <Lottie options={defaultOptions} height="auto" width="100%" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="mt-4 text-center space-y-6"
            >
                <h2 className="text-xl md:text-2xl font-medium text-foreground/80">
                    {message}
                </h2>

                <div className="flex justify-center">
                    <Link href={linkHref}>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="div"
                            className="bg-background text-foreground flex items-center space-x-2 cursor-pointer"
                        >
                            <span>{linkText}</span>
                        </HoverBorderGradient>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
