"use client";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

export function Loader() {
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="rounded-full bg-transparent overflow-hidden">
                <Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                    isClickToPauseDisabled={true}
                />
            </div>
        </div>
    );
}
