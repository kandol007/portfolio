"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import StarBackground from "@/components/StarBackground";
import { BadgeCheck, Code, Database, FileCode2, Layers, Server, BarChart2, BookOpen, Brain, TerminalSquare, Code2, Settings2, } from "lucide-react";

const skills = [
  { name: "React.js", level: 90, icon: <Code className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Next.js", level: 85, icon: <BadgeCheck className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Node.js", level: 80, icon: <Server className="w-4 h-4 mr-2 inline-block" /> },
  { name: "MongoDB", level: 75, icon: <Database className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Tailwind CSS", level: 90, icon: <Layers className="w-4 h-4 mr-2 inline-block" /> },
  { name: "TypeScript", level: 80, icon: <FileCode2 className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Java", level: 65, icon: <TerminalSquare className="w-4 h-4 mr-2 inline-block" /> },
  { name: "C", level: 80, icon: <Code2 className="w-4 h-4 mr-2 inline-block" /> },
  { name: "C++", level: 85, icon: <Settings2 className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Excel", level: 90, icon: <BarChart2 className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Confluence", level: 70, icon: <BookOpen className="w-4 h-4 mr-2 inline-block" /> },
  { name: "DSA", level: 50, icon: <Brain className="w-4 h-4 mr-2 inline-block" /> },
  { name: "Python", level: 85, icon: <FileCode2 className="w-4 h-4 mr-2 inline-block" /> },
];

const timeline = [
  { year: "2024", event: "Started Building multiple MERN projects" },
  { year: "2025", event: "Joined open source community" },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden">
      <StarBackground />

      <main className="relative z-20 mt-28 pb-20">
        {/* Section 1: About Me */}
        <motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4"
>
  {/* Text Section */}
  <div className="flex-1">
    <h1 className="text-4xl font-bold mb-4">About Me</h1>
    <p className="text-gray-300 leading-relaxed text-justify">
       👋 I&apos;m Ritik Kumar, a passionate full stack developer and data enthusiast from Meerut, India. I specialize in crafting beautiful, functional web experiences using modern technologies like <strong>React</strong>, <strong>Next.js</strong>, and <strong>Node.js</strong>, while also exploring the power of <strong>Python</strong> and <strong>machine learning</strong> to solve real-world problems.
         <br /><br />
       💡 With a strong eye for design and scalable architecture, I bridge the gap between elegant frontend interfaces and robust backend systems. I enjoy building tools that make a difference—from intuitive UI components to automation tools, job systems, AI interview assistants, and real-time dashboards.
         <br /><br />
        📊 I'm also proficient in data analytics using tools like <strong>SQL</strong>, <strong>Power BI</strong>, and <strong>Excel</strong>, and I love visualizing insights that drive decisions. Currently, I&apos;m diving deeper into data visualization, microservices, and serverless architectures.
         <br /><br />
        🚀 I believe in writing clean, maintainable code and collaborating on products that are fast, secure, and accessible. Let&apos;s build something meaningful together! 🤝
    </p>
  </div>

  {/* Image Section */}
  <div className="flex-shrink-0">
    <Image
      src="/profile.jpg"
      alt="Ritik Kumar"
      width={180}
      height={180}
      className="rounded-full border-4 border-indigo-500"
    />
  </div>
</motion.div>

        {/* Section 2: Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-4 bg-transparent">
            <div className="bg-gray-800 p-4 rounded-lg bg-transparent backdrop-blur-sm border-l-4 border-indigo-500">
              <h3 className="text-indigo-400 font-bold">Master of Computer Applications - AIML</h3>
              <p className="text-gray-300">UPES, Dehradun | 2023 - 2025</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg bg-transparent backdrop-blur-sm border-l-4 border-indigo-500">
              <h3 className="text-indigo-400 font-bold">Bachelor of Computer Applications</h3>
              <p className="text-gray-300">VICT, Meerut | 2019 - 2022</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg bg-transparent backdrop-blur-sm border-l-4 border-indigo-500">
              <h3 className="text-indigo-400 font-bold">12th Standards</h3>
              <p className="text-gray-300">DPS, Meerut | 2018 - 2019</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Skills */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="bg-indigo-600 h-4 rounded-full mb-4 relative overflow-hidden"
            >
              <span className="absolute left-2 text-xs text-white">
                {skill.icon} {skill.name}
              </span>
              <span className="absolute right-2 text-xs text-white">{skill.level}%</span>
            </motion.div>
          ))}
        </div>

        {/* Section 4: Timeline */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Developer Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="bg-transparent backdrop-blur-sm rounded-lg p-4 border-l-4 border-indigo-500"
              >
                <h3 className="text-indigo-400 font-bold">{item.year}</h3>
                <p className="text-gray-300">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 5: Resume Download Button */}
        <div className="relative z-[100] mt-20 text-center">
          <motion.a
             whileHover={{ scale: 1.1 }}
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-green-700 text-white font-lg font-bold rounded-full shadow-md"
          >
            Download Resume
          </motion.a>
        </div>
      </main>
    </div>
  );
}