import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessages = () => {
    const messages = [
        "Understanding your request...",
        "Flow is thinking...",
        "Loading...",
        "Generating",
        "Building...",
        "Creating components...",
        "Figuring out the layout...",
        "Adding final touches...",
        "Almost ready..."
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Existing message cycling effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [messages.length]);

    // New progress bar effect - increases over 4 minutes
   useEffect(() => {
    const totalDuration = 210000; // 4 minutes in ms
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
            requestAnimationFrame(updateProgress);
        }
    };

    requestAnimationFrame(updateProgress);
}, []);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-base text-muted-foreground animate-pulse">
                    {messages[currentMessageIndex]}
                </span>
            </div>

            {/* Beautiful Progress Bar */}
            <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-[#f9a8d4] to-[#d8b4fe] h-2.5 rounded-full transition-[width] duration-[300ms] ease-linear relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shimmer effect on the progress bar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image
                    src="/flow.svg"
                    alt="flow"
                    width={18}
                    height={18}
                    className="shrink-0 opacity-100 contrast-125 dark:invert"
                />
                <span className="text-sm font-medium">Flow</span>
            </div>
            <div className="pl-8 flex flex-col gap-y-4">
                <ShimmerMessages />
            </div>
        </div>
    );
};
