
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FileCode } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const StarBackground = dynamic(() => import("@/components/StarBackground"), { ssr: false });



const certifications = {
  "Web Development": [
    {
      title: "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide",
      issuer: "Udemy",
      description: "✅ Built and deployed full-stack web applications using the MERN stack—MongoDB, Express.js, React, and Node.js. Gained hands-on experience with RESTful APIs, state management, authentication, CRUD operations, and deploying applications to cloud platforms. ",
      link: "https://www.udemy.com/certificate/UC-22157b14-f898-4d34-9bc3-795b4581350e/",
      logo: "/certifications/udemy.png",
      tags: ["Full-Stack Web Development", "CSS", "JavaScript", "React", "React Router", "RESTful API Design", "API Integration & Fetching", "Git & Version Control"]
    },
    {
      title: "GraphQL for Beginners",
      issuer: "Lets Upgrade",
      description: "Completed a beginner-level course on GraphQL, learning how to design, query, and manage APIs using schema-based data fetching. Gained hands-on experience with queries, mutations, resolvers, and integrating GraphQL into modern web applications.",
      link: "/certifications/GraphQL for Beginners.pdf",
      logo: "/certifications/letsupgrade.png",
      tags: ["GraphQL", "API Development", "Web Development", "Backend Development", "Queries and Mutations", "Schema Design", "Modern Web APIs"]
    },
    {
      title: "JavaScript Bootcamp",
      issuer: "Lets Upgrade",
      description: "Completed an intensive bootcamp covering core JavaScript fundamentals, DOM manipulation, asynchronous programming, and essential concepts for modern web development. Built hands-on skills to create interactive and dynamic web applications.",
      link: "/certifications/JavaScript Bootcamp.pdf",
      logo: "/certifications/letsupgrade.png",
      tags: ["JavaScript", "Web Development", "Frontend Development", "Async Programming", "DOM Manipulation", "ES6+", "Programming Fundamentals"]
    }
  ],
  "Data Analytics": [

  ],
  "Artificial Intelligence": [
    {
      title: "Introduction to GenAI and Prompting",
      issuer: "Lets Upgrade",
      description: "Completed a foundational course on Generative AI and Prompting, learning how to effectively interact with AI models using techniques like zero-shot, few-shot, and chain-of-thought prompting. Gained practical skills to apply GenAI tools for content creation, summarization, coding, and problem-solving.",
      link: "/certifications/Introduction to GenAI and Prompting.pdf",
      logo: "/certifications/letsupgrade.png",
      tags: ["Generative AI Fundamentals", "Prompt Engineering", "Zero-shot, Few-shot, and Chain-of-Thought Prompting", "Task Automation", "AI Literacy", "Critical Thinking", "Ethical AI Use"]
    },

  ],
  "Software Engineering": [
    {
      title: "Mastering Data Structures & Algorithms using C and C++",
      issuer: "Udemy",
      description: "✅ Gained a strong foundation in core computer science concepts by mastering Data Structures and Algorithms using C and C++. Covered arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, recursion, and dynamic programming, with a focus on problem-solving and time-space optimization.",
      link: "https://www.udemy.com/certificate/UC-efd97ae2-6008-45e6-a528-4f33b96880d4/",
      logo: "/certifications/udemy.png",
      tags: ["Data Structures", "Algorithms", "Time & Space Complexity Analysis", "Problem Solving", "Memory Management in C/C++", "OOP in C++", "Algorithm Optimization Techniques"]
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
      tags: ["Class Design", "APIs", "Code Readability", "Data Structures", "Feature Design", "Feature Proposal", "Game Engine Technology", "Object Oriented Design"]
    },
    {
      title: "Hewlett Packard Enterprise: Software Engineering	Job	Simulation",
      issuer: "Forage",
      description: "✅ Designed and implemented a RESTful web service using Java Spring Boot to manage employee data. Wrote a clear project proposal, supported JSON data upload, and developed unit tests to validate performance and reliability.",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/fgHAi6dLhpRsGKyyN/da2T3WZCbMAJD7bNB_fgHAi6dLhpRsGKyyN_be54ZaKrAZDRCGmJg_1751388247161_completion_certificate.pdf",
      logo: "/certifications/hpe.png",
      tags: ["Communication", "GreenLake Cloud Platform", "HTTP requests", "Java", "Java Spring Boot", "JSON", "JUnit", "Mockito", "RESTful Development", "RESTful Web Development", "Unit Testing"]
    }
  ],
  "Goverment Certifications": [
    {
      title: "Bhartiya Nagrik Shurakhsa Sahita, 2023",
      issuer: "Ministry of Home Affaris, Government of India",
      description: "✅ This certification reflects my awareness and understanding of the newly introduced legal framework aimed at enhancing citizen safety and public justice mechanisms in India. It acknowledges my efforts in civic engagement and my commitment to spreading awareness about crucial national legal reforms.",
      link: "/certifications/Bhartiya Nagrik Shurakhsa Sahita, 2023.jpg",
      logo: "/certifications/MoHAgov.png",
      tags: ["Civic Awareness", "Legal Literacy", "Analytical Thinking", "Attention to Detail", "Responsible Citizenship", "Public Policy Understanding"]
    }
  ]
};

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...Object.keys(certifications)];

  const filteredCerts = activeTab === "All"
    ? Object.values(certifications).flat()
    : certifications[activeTab as keyof typeof certifications] || [];

  return (
    <div className="min-h-screen overflow-hidden bg-transparent text-white">
      <StarBackground />
      <main className="relative z-40 px-4 pt-32 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Certifications
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my professional certifications and achievements across various domains.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === category
                ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                : "bg-gray-800/40 border-white/10 text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={`${cert.title}-${index}`}
                className="group relative bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all shadow-lg flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                  {cert.logo ? (
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                      <Image
                        src={cert.logo}
                        alt={cert.issuer}
                        width={48}
                        height={48}
                        className="rounded object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                      <FileCode className="w-8 h-8" />
                    </div>
                  )}
                  <Link
                    href={cert.link}
                    target="_blank"
                    className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1"
                  >
                    View <span className="hidden sm:inline">Certificate</span> →
                  </Link>
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-indigo-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 font-medium flex items-center gap-2">
                    {cert.issuer}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {cert.tags?.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-indigo-200 bg-indigo-500/10 px-2 py-1 rounded md:bg-transparent md:border md:border-indigo-500/20 md:group-hover:bg-indigo-500/10 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {cert.tags && cert.tags.length > 4 && (
                      <span className="text-xs text-gray-500 px-1 py-1">+{cert.tags.length - 4} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No certifications found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
