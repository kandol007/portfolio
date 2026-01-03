
"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";

const StarBackground = dynamic(() => import("@/components/StarBackground"), { ssr: false });

const allProjects = [
  {
    title: "Portfolio Website",
    description: "Crafted a sleek and interactive personal portfolio using Next.js, Tailwind CSS, and Framer Motion to showcase projects, skills, and experience. Features smooth animations, responsive design, and a dark/light theme toggle for an engaging user experience across all devices.",
    image: "/projects/portfolio.png",
    link: "https://portfolio-tsr1.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
  },
  {
    title: "Plutobyte Technologies",
    description: "Designed and developed the official website for Plutobyte Technologies Pvt. Ltd., featuring a responsive UI, a Markdown-powered blog section, and on-page SEO enhancements. Integrated a lightweight custom CMS for seamless content updates.",
    image: "/projects/plutobyte.png",
    link: "https://plutobyte.io",
    tags: ["Next.js", "CMS", "SEO", "Web Design"],
  },
  {
    title: "Emotion AI",
    description: "Real-time facial expression recognition powered by deep learning. Built with Next.js and FastAPI, this application processes images locally to detect emotions without compromising privacy.",
    image: "/projects/emotionai.png",
    link: "https://emotion-detection-master.vercel.app/",
    tags: ["AI", "Computer Vision", "FastAPI", "Python"],
  },
  {
    title: "HomeBrick",
    description: "A comprehensive real estate platform for finding dream homes and properties in Noida, Meerut, and Himachal. Features transparent deals, prime locations, and genuine opportunities for buyers and investors.",
    image: "/projects/homebrick.png",
    link: "https://www.homebrick.in/",
    tags: ["Real Estate", "Platform", "Web App"],
  },
  {
    title: "Mini SOW",
    description: "A specialized management tool for handling Inventory Management. Streamlines the process of tracking project requirements, deliverables, and timelines.",
    image: "/projects/minisow.png",
    link: "http://141.148.217.120/login",
    tags: ["Management", "Inventory", "Dashboard"],
  },
  {
    title: "Ritual Buddy",
    description: "Your trusted platform for authentic religious ceremonies and spiritual guidance. Connects users with experienced pandits for seamless booking of rituals, puja services, and astrology consultations.",
    image: "/projects/ritualbuddy.png",
    link: "https://www.ritualbuddy.in/",
    tags: ["Marketplace", "Booking System", "Service"],
  },
];

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => (prev < allProjects.length ? prev + 3 : prev));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  return (
    <div className="min-h-screen bg-transparent text-white py-24 px-6 relative">
      <StarBackground />

      <div className="relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          My Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        {hasMore && (
          <div ref={ref} className="mt-10 h-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  index,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-1"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden w-full">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Visual overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
              Visit Project <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-gray-100 group-hover:text-indigo-400 transition-colors">
              {title}
            </h2>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
