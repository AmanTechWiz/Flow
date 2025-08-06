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

                        src="/download.svg"
                        alt="logo"
                        width={24}
                        height={24}
                    />
                 <h2 className="font-bold">Flow</h2> 

                </Link>
                <SignedOut>
                    <div className="flex gap-2">
                        <SignUpButton>
                            <Button
                                variant="outline"
                                size="sm"
                                className="transition-all duration-300
                                text-white
                                border-white/20
                                bg-white/10
                                hover:border-white hover:text-white    
                                hover:bg-white/20 
                                hover:shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                            >
                                Sign up
                            </Button>
                        </SignUpButton>

                        <SignInButton>
                            <Button
                                 variant="outline"
                                size="sm"
                                className="transition-all duration-300
                                text-white
                                border-white/20
                                bg-white/10
                                hover:border-white hover:text-white    
                                hover:bg-white/20 
                                hover:shadow-[0_0_10px_rgba(255,255,255,0.7)]"
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