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
      title: "Beginner's Guide to Data & Data Analytics, by SF Data School",
      issuer: "Udemy",
      description: "ECompleted the Beginner’s Guide to Data & Data Analytics by SF Data School, gaining foundational knowledge in data analysis, data types, data cleaning, and the role of data in decision-making.",
      link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-e5a24bff-475b-4102-8aec-f091bfec2818.pdf",
      logo: "/certifications/udemy.png",
      tags: ["Data Analytics Fundamentals", "Understanding Structured vs Unstructured Data", "Basic Data Cleaning Techniques", "Introduction to Data-Driven Decision Making", "Analytical Thinking", "Spreadsheet and Tool Familiarity (Excel, Google Sheets)"]
    }
  ],
   "Artificial Intelligence": [
    {
      title: "Introduction to GenAI and Prompting",
      issuer: "Lets Upgrade",
      description: "Completed a foundational course on Generative AI and Prompting, learning how to effectively interact with AI models using techniques like zero-shot, few-shot, and chain-of-thought prompting. Gained practical skills to apply GenAI tools for content creation, summarization, coding, and problem-solving.",
      link: "/certifications/Introduction to GenAI and Prompting.pdf",
      logo: "/certifications/letsupgrade.png",
      tags: ["Generative AI Fundamentals", "Prompt Engineering", "Zero-shot, Few-shot, and Chain-of-Thought Prompting", "Task Automation", "AI Literacy", "Critical Thinking", "Ethical AI Use"]
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
    },
    {
      title: "Hewlett Packard Enterprise: Software Engineering	Job	Simulation",
      issuer: "Forage",
      description: "✅ Designed and implemented a RESTful web service using Java Spring Boot to manage employee data. Wrote a clear project proposal, supported JSON data upload, and developed unit tests to validate performance and reliability.",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/fgHAi6dLhpRsGKyyN/da2T3WZCbMAJD7bNB_fgHAi6dLhpRsGKyyN_be54ZaKrAZDRCGmJg_1751388247161_completion_certificate.pdf",
      logo: "/certifications/hpe.png",
      tags: ["Communication", "GreenLake Cloud Platform","HTTP requests","Java","Java Spring Boot","JSON","JUnit","Mockito","RESTful Development","RESTful Web Development","Unit Testing"]
    }
  ],
  "Goverment Certifications": [
    {
      title: "Bhartiya Nagrik Shurakhsa Sahita, 2023",
      issuer: "Ministry of Home Affaris, Government of India",
      description: "✅ This certification reflects my awareness and understanding of the newly introduced legal framework aimed at enhancing citizen safety and public justice mechanisms in India. It acknowledges my efforts in civic engagement and my commitment to spreading awareness about crucial national legal reforms.",
      link: "/certifications/Bhartiya Nagrik Shurakhsa Sahita, 2023.jpg",
      logo: "/certifications/MoHAgov.png",
      tags: ["Civic Awareness", "Legal Literacy","Analytical Thinking", "Attention to Detail","Responsible Citizenship", "Public Policy Understanding"]
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
