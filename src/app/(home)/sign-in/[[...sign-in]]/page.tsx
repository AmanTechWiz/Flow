"use client"

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/user-theme";

const Page = () => {
    const currentTheme = useCurrentTheme();
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black overflow-hidden">
            <div className="w-full max-w-md px-4">
                <SignIn 
                    appearance={{
                        baseTheme: currentTheme === "dark" ? dark : undefined,
                        elements: {
                            cardBox: "border! shadow-none! rounded-lg!"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Page;