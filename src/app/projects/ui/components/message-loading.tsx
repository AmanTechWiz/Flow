import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
    const startTimeRef = useRef<number | null>(null);

    // Rotate messages every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [messages.length]);

    // Accurate 4-min progress bar synced with system time
    useEffect(() => {
        const totalDuration = 4 * 60 * 1000; // 4 minutes in ms
        startTimeRef.current = Date.now();

        const interval = setInterval(() => {
            if (!startTimeRef.current) return;
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
            }
        }, 1000); // Every 1 sec (or 500ms for smoother updates)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-base text-muted-foreground animate-pulse">
                    {messages[currentMessageIndex]}
                </span>
            </div>

            {/* Apple-like Progress Bar */}
            <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-[#fef3c6] to-[#d8b4fe] h-2.5 rounded-full transition-all ease-in-out duration-500 relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Subtle shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />
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
