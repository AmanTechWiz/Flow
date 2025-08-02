"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import LightRays from "../projects/ui/components/LightRays";
import { ProjectList } from "./ui/components/projects-list";
import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import BlurText from "../projects/ui/components/blurtext";
import FadeContent from "../projects/ui/components/FadeContent";
import LandingLayout from "../layouts/landing-layout";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const scrollToProjects = () => {
  const projectsSection = document.getElementById("projects-section");
  projectsSection?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const Page = () => {
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        display: none;
      }
      html, body {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <LandingLayout>
      <div
        className="dark bg-black min-h-screen text-white"
        style={{
          backgroundColor: "#000000",
          colorScheme: "dark",
          minHeight: "100vh",
        }}
      >
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <div className="relative w-full bg-black min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-screen w-full overflow-hidden bg-black">
              <div className="absolute top-0 left-0 right-0 h-full z-0">
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#E8B4B8"
                  raysSpeed={0.4}
                  lightSpread={1.5}
                  rayLength={2}
                  pulsating={true}
                  fadeDistance={1}
                  followMouse={true}
                  mouseInfluence={0.03}
                  noiseAmount={0.1}
                  distortion={0.01}
                  className="w-full h-full"
                />
              </div>

              <div className="relative z-10 flex flex-col h-screen">
                <div className="flex-1 flex flex-col justify-center items-center px-4 min-h-0">
                  <div className="max-w-5xl w-full text-center">
                    <h1
                      className="text-2xl md:text-5xl font-bold text-center text-amber-100 mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <div className="mb-4 w-full flex justify-center">
                        <BlurText
                          text="Create something in the flow."
                          delay={250}
                          animateBy="words"
                          direction="top"
                          onAnimationComplete={handleAnimationComplete}
                          className="text-2xl md:text-5xl font-bold text-center text-amber-100"
                        />
                      </div>
                    </h1>

                    <p
                      className="text-base md:text-xl text-center text-slate-400 mb-8"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Craft AI generated web app designs
                    </p>

                    <div className="max-w-3xl mx-auto w-full">
                      <ProjectForm />
                    </div>
                  </div>
                </div>

                <button
                  onClick={scrollToProjects}
                  className="group absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 p-2 hover:scale-110 transition-all duration-300 ease-out"
                >
                  <span className="text-sm text-white/80 group-hover:text-white font-medium transition-colors duration-300">
                    View Projects
                  </span>
                  <div className="relative">
                    <ChevronDown className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
                    <ChevronDown className="w-6 h-6 text-white/40 absolute -top-2 group-hover:opacity-0 transition-all duration-300" />
                  </div>
                </button>
              </div>
            </div>

            <div id="projects-section" className="w-full bg-black px-4 py-16">
              <div className="max-w-5xl mx-auto w-full">
                <ProjectList />
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </LandingLayout>
  );
};

export default Page;
