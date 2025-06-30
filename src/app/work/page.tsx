"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import StarBackground from "@/components/StarBackground"; // Adjust path if needed

const internships = [
  {
    role: "Web Development Intern",
    company: "Plutobyte Technologies Pvt. Ltd.",
    duration: "March 2025 – July 2025",
    description: "Contributed to front-end development by building responsive and accessible static web pages using HTML, CSS, and React. Assisted in integrating RESTful APIs with the Node.js backend, ensuring seamless data flow and functionality across the application. Collaborated with cross-functional teams to debug issues, improve performance, and deliver user-friendly features on schedule.",
  },
];

{/*const workExperience = [
  {
    role: "Software Developer",
    company: "NextGen Labs",
    duration: "May 2023 – Present",
    description: "Working on scalable full-stack applications with Next.js, TypeScript, and MongoDB. Leading UI/UX improvements.",
  },
];*/}

export default function ExperiencePage() {
  const internshipRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: internshipRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
     <div className="min-h-screen bg-transparent text-white flex flex-col">
      <StarBackground />
      <div className="flex-grow py-24 px-6 max-w-5xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-center mb-12">Work Experience</h1>

      {/* Internship Section */}
      <motion.div
        ref={internshipRef}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 relative"
      >
        <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-500 pb-2">
          Internships
        </h2>

        {/* Scroll progress line */}
        <div className="absolute left-1.5 top-11 w-1 h-full bg-gray-700 rounded-full z-0 overflow-hidden mb-6">
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-indigo-500 rounded-full origin-top"
          />
        </div>

        <div className="space-y-10 pl-6 relative z-10">
          {internships.map((intern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-indigo-500 ring-2 ring-indigo-800 shadow" />
              <h3 className="text-lg font-semibold">
                {intern.role}{" "}
                <span className="text-indigo-400">@ {intern.company}</span>
              </h3>
              <p className="text-sm text-gray-400">{intern.duration}</p>
              <p className="mt-2 text-gray-300 text-sm">{intern.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Work Section */}
      {/*<motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-500 pb-2">
          Full-time
        </h2>
        <div className="grid gap-6">
          {workExperience.map((work, index) => {
            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg border border-indigo-700 shadow hover:shadow-indigo-600/20 transition-shadow"
              >
                <h3 className="text-lg font-semibold">
                  {work.role}{" "}
                  <span className="text-indigo-400">@ {work.company}</span>
                </h3>
                <p className="text-sm text-gray-400">{work.duration}</p>
                <p className="mt-2 text-gray-300 text-sm">{work.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>*/}
    </div>
    </div>
  );
}
