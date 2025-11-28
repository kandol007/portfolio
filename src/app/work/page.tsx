"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
const StarBackground = dynamic(() => import("@/components/StarBackground"), { ssr: false });

const experiences = [
  {
    role: "Full Stack AIML Developer",
    company: "Codexus Labs AI Solutions Pvt. Ltd.",
    duration: "August 2025 – November 2025",
    description: "Contributed to full-stack development across the MERN ecosystem and Python-based frameworks. Supported AI/ML-driven feature development by preparing data pipelines, integrating model outputs into the application, and ensuring smooth interaction between frontend components and ML services. Collaborated closely with cross-functional teams to debug issues, enhance performance, and deliver user-centric features on schedule.",
  },
  {
    role: "Web Development Intern",
    company: "Plutobyte Technologies Pvt. Ltd.",
    duration: "February 2025 – July 2025",
    description: "Contributed to full-stack development across the MERN ecosystem and Python-based frameworks by building responsive and accessible interfaces using HTML, CSS, JavaScript, and React. Developed and integrated RESTful APIs using Node.js/Express as well as Python frameworks like Django and FastAPI to ensure secure, scalable, and efficient data flow across the application. Worked on backend logic, database interactions with MongoDB, and optimized API performance.",
  },
];

export default function ExperiencePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <StarBackground />
      <div className="flex-grow py-24 px-6 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center mb-12">Work Experience</h1>

        <motion.div
          ref={containerRef}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 relative"
        >
          {/* Scroll progress line */}
          <div className="absolute left-1.5 top-2 w-1 h-full bg-gray-700 rounded-full z-0 overflow-hidden mb-6">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-indigo-500 rounded-full origin-top"
            />
          </div>

          <div className="space-y-12 pl-8 relative z-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-indigo-500 ring-2 ring-indigo-800 shadow" />
                <h3 className="text-xl font-semibold">
                  {exp.role}{" "}
                  <span className="text-indigo-400">@ {exp.company}</span>
                </h3>
                <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
                <p className="text-gray-300 text-base leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
