"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero"; // Adjust path if needed
import SkillsSection from "@/components/SkillsSection";

const StarBackground = dynamic(() => import("@/components/StarBackground"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Ritik Kumar | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Ritik Kumar — Full Stack Developer, Open Source Contributor, and Tech Enthusiast"
        />
        <meta name="keywords" content="Ritik Kumar, Full Stack Developer, React, Next.js, Portfolio" />
        <meta name="author" content="Ritik Kumar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
        {/* Optional: background animation */}
        <StarBackground />

        {/* Hero Section */}
        <Hero />
        <SkillsSection />
      </div>
    </>
  );
}
