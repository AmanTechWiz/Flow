"use client"

import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { UserControl } from "@/components/ui/user-control"

export const Navbar = () => {
    return (
        <nav className="p-4 bg-transparent fixed top-0 right-0 left-0 z-50 transition-all duration-200 border-transparent">
            <div className="max-2-5xl mx-auto w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image 
                        src="/flow.svg" 
                        alt="logo" 
                        width={24} 
                        height={24} 
                    />
                    <span className="font-bold text-black dark:text-white">Flow</span>
                </Link>
                <SignedOut>
                    <div className="flex gap-2">
                          <SignUpButton>
                            <Button
                                variant="outline"
                                size="sm"
                                className="transition-all duration-300
                                text-black
                                border-white
                                hover:border-white hover:text-black
                                hover:shadow-[0_0_10px_rgba(255,255,255,0.7)]
                                bg-transparent"
                            >
                                Sign up
                            </Button>
                        </SignUpButton>

                        <SignInButton>
                            <Button 
                                size="sm"
                                className="bg-black hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-800 text-white"
                            >
                                Sign in
                            </Button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserControl />
                </SignedIn>
            </div>
        </nav>
    );
}