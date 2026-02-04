"use client";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

export function PublicWebsiteLoader({ message = "Loading..." }: { message?: string }) {
    const [animationData, setAnimationData] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetch("/Run cycle recreated in Lottie Creator.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load animation");
                return res.json();
            })
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Lottie load error:", err));
    }, []);

    if (!isMounted || !animationData) return null;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="w-full flex flex-col items-center justify-center gap-1 py-12 min-h-[90vh]">
            <div className="rounded-full bg-transparent overflow-hidden">
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                    isClickToPauseDisabled={true}
                />
            </div>
            <p className="text-muted-foreground animate-pulse font-medium text-sm md:text-base">{message}</p>
        </div>
    );
}
