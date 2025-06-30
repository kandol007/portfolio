"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Code, Database, FileCode, BarChart2, Activity } from "lucide-react";
import StarBackground from "@/components/StarBackground";
import React from "react";

const tagIcons: Record<string, React.ReactElement> = {
  "HTML": <Code className="w-3.5 h-3.5 mr-1" />, 
  "CSS": <Code className="w-3.5 h-3.5 mr-1" />, 
  "JavaScript": <Code className="w-3.5 h-3.5 mr-1" />,
  "React": <FileCode className="w-3.5 h-3.5 mr-1" />,
  "Next.js": <FileCode className="w-3.5 h-3.5 mr-1" />,
  "Full-Stack": <FileCode className="w-3.5 h-3.5 mr-1" />,
  "SQL": <Database className="w-3.5 h-3.5 mr-1" />,
  "Spreadsheets": <BarChart2 className="w-3.5 h-3.5 mr-1" />,
  "Visualization": <BarChart2 className="w-3.5 h-3.5 mr-1" />,
  "Excel": <BarChart2 className="w-3.5 h-3.5 mr-1" />,
  "Data Analysis": <Activity className="w-3.5 h-3.5 mr-1" />,
  "Java": <Code className="w-3.5 h-3.5 mr-1" />,
  "OOP": <Code className="w-3.5 h-3.5 mr-1" />,
  "CS Basics": <Code className="w-3.5 h-3.5 mr-1" />,
  "Algorithms": <Code className="w-3.5 h-3.5 mr-1" />,
  "C": <Code className="w-3.5 h-3.5 mr-1" />,
  "Developer Experience": <Activity className="w-3.5 h-3.5 mr-1" />,
  "Problem Solving": <Activity className="w-3.5 h-3.5 mr-1" />,
  "Software Engineering": <FileCode className="w-3.5 h-3.5 mr-1" />,
  "APIs": <Code className="w-3.5 h-3.5 mr-1" />,
  "UI Debugging": <FileCode className="w-3.5 h-3.5 mr-1" />
};

const certifications = {
  "Web Development": [
    {
      title: "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide",
      issuer: "Udemy",
      description: "✅ Built and deployed full-stack web applications using the MERN stack—MongoDB, Express.js, React, and Node.js. Gained hands-on experience with RESTful APIs, state management, authentication, CRUD operations, and deploying applications to cloud platforms. ",
      link: "https://www.udemy.com/certificate/UC-22157b14-f898-4d34-9bc3-795b4581350e/",
      logo: "/certifications/udemy.png",
      tags: ["Full-Stack Web Development", "CSS", "JavaScript", "React","React Router","RESTful API Design","API Integration & Fetching","Git & Version Control"]
    }
  ],
  "Data Analytics": [
    {
      title: "Example Now Adding Soon",
      issuer: "Example Issuer",
      description: "Eight-course professional certificate by Google on data analysis, spreadsheets, SQL, and visualization.",
      link: "https://www.udemy.com/certificate/UC-efd97ae2-6008-45e6-a528-4f33b96880d4/",
      logo: "/certifications/ga.png",
      tags: ["Data Analysis", "SQL", "Spreadsheets", "Visualization"]
    }
  ],
  "Software Engineering": [
    {
      title: "Mastering Data Structures & Algorithms using C and C++",
      issuer: "Udemy",
      description: "✅ Gained a strong foundation in core computer science concepts by mastering Data Structures and Algorithms using C and C++. Covered arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, recursion, and dynamic programming, with a focus on problem-solving and time-space optimization.",
      link: "https://www.udemy.com/certificate/UC-efd97ae2-6008-45e6-a528-4f33b96880d4/",
      logo: "/certifications/udemy.png",
      tags: ["Data Structures", "Algorithms","Time & Space Complexity Analysis", "Problem Solving","Memory Management in C/C++", "OOP in C++","Algorithm Optimization Techniques"]
    }
  ],
  "Forage": [
    {
      title: "AWS:Solutions	Architecture Job Simulation",
      issuer: "Forage",
      description: "✅ Designed a simple, scalable, and cost-effective hosting architecture using AWS Elastic Beanstalk to support a client facing rapid growth and performance issues, and clearly communicated the proposed solution in plain language to ensure the client understood how the architecture works and how costs would be calculated.",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_be54ZaKrAZDRCGmJg_1750269613818_completion_certificate.pdf",
      logo: "/certifications/aws.png",
      tags: ["Technical Communication", "AWS Pricing", "Architecture Diagram"]
    },
    {
      title: "Electronic Arts: Software	Engineering	Job	Simulation",
      issuer: "Forage",
      description: "✅ Proposed a new feature for EA Sports College Football with a detailed proposal, designed a C++ class diagram and header file, and optimized the codebase by fixing a bug and improving performance with a better data structure.",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_be54ZaKrAZDRCGmJg_1750254795305_completion_certificate.pdf",
      logo: "/certifications/EA.png",
      tags: ["Class Design", "APIs", "Code Readability","Data Structures", "Feature Design", "Feature Proposal","Game Engine Technology", "Object Oriented Design"]
    }
  ]
};

export default function CertificationsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (category: string) => {
    setOpenSections((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-transparent text-white">
      <StarBackground />
      <main className="relative z-40 px-6 pt-32 pb-20 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">My Certifications</h1>
        <div className="grid gap-8">
          {Object.entries(certifications).map(([category, certs]) => (
            <div key={category}>
              <button
                onClick={() => toggleSection(category)}
                className="bg-transparent backdrop-blur-sm text-left w-full text-2xl font-semibold text-indigo-400 mb-4 border-b border-indigo-700 pb-1 hover:text-indigo-300 transition"
              >
                {category}
              </button>
              <AnimatePresence initial={false}>
                {openSections[category] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certs.map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-gray-900 border border-indigo-600 rounded-lg p-6 shadow-md hover:shadow-indigo-500/20 transition-shadow"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {cert.logo && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Image
                                  src={cert.logo}
                                  alt={`${cert.title} logo`}
                                  width={64}
                                  height={64}
                                  className="rounded"
                                />
                              </motion.div>
                            )}
                            <div>
                              <h3 className="text-lg font-bold leading-tight">{cert.title}</h3>
                              <p className="text-sm text-gray-400">{cert.issuer}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-3 text-sm leading-relaxed">{cert.description}</p>
                          {cert.tags && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {cert.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="bg-indigo-700 text-white text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center"
                                >
                                  {tagIcons[tag] || null}
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <Link
                            href={cert.link}
                            target="_blank"
                            className="text-indigo-400 hover:underline text-sm font-medium"
                          >
                            View Certificate →
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
