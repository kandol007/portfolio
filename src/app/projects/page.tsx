"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import StarBackground from "@/components/StarBackground" // Adjust path if needed

const allProjects = [
  {
    title: "Portfolio Website",
    description: "Crafted a sleek and interactive personal portfolio using Next.js, Tailwind CSS, and Framer Motion to showcase projects, skills, and experience. Features smooth animations, responsive design, and a dark/light theme toggle for an engaging user experience across all devices. Includes animated counters, scroll-based section reveals, and a downloadable resume for recruiters.",
    image: "/projects/portfolio.png",
    link: "https://your-portfolio-url.com",
  },
  {
   title: "Website for a Software Company",
   description: "Designed and developed the official website for Plutobyte Technologies Pvt. Ltd., featuring a responsive UI, a Markdown-powered blog section, and on-page SEO enhancements. Integrated a lightweight custom CMS for seamless content updates. Built with Next.js and Tailwind CSS to ensure optimal performance, accessibility, and scalability across devices.",
   image: "/projects/plutobyte.png",
   link: "https://plutobyte.io",
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const loadMore = useCallback(() => {
  if (visibleCount < allProjects.length) {
    setVisibleCount((prev) => prev + 3);
  }
}, [visibleCount, allProjects.length]);


  useEffect(() => {
  if (inView) {
    const timer = setTimeout(() => {
      loadMore();
    }, 500);
    return () => clearTimeout(timer);
  }
}, [inView, loadMore]);

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  return (
    <div className="min-h-screen bg-transparent text-white py-24 px-6">
      <StarBackground />
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-6">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="mt-10 h-10" />
      )}
    </div>
  );
}

function ProjectCard({
  title,
  description,
  image,
  link,
  index,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative group bg-gray-900 rounded-lg overflow-hidden break-inside-avoid shadow-lg"
    >
      <div className="relative z-50">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Visit Project Button - hidden until hover */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <Link
            href={link}
            target="_blank"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Visit Project →
          </Link>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}


