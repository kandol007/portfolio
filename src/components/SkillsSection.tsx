// components/SkillsSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", icon: "/skills/html.png" },
  { name: "CSS", icon: "/skills/css.png" },
  { name: "JavaScript", icon: "/skills/js.png" },
  { name: "React", icon: "/skills/react.png" },
  { name: "Next.js", icon: "/skills/next.png" },
  { name: "Node.js", icon: "/skills/node-js.png" },
  { name: "Tailwind CSS", icon: "/skills/tailwind.png" },
  { name: "MongoDB", icon: "/skills/mongodb.png" },
  { name: "MUI", icon: "/skills/mui.png" },
  { name: "MySQL", icon: "/skills/mysql.svg" },
  { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
  { name: "React Native", icon: "/skills/ReactNative .png" },
  { name: "React Query", icon: "/skills/reactquery.png" },
  { name: "Stripe", icon: "/skills/stripe.webp" },
  { name: "TypeScript", icon: "/skills/typescript.svg" },
  { name: "Redux", icon: "/skills/redux.png" },
  { name: "GraphQL", icon: "/skills/graphql.png" },
  { name: "Framer Motion", icon: "/skills/framer.png" },
  { name: "Firebase", icon: "/skills/Firebase.png" },
  { name: "Figma", icon: "/skills/figma.png" },
  { name: "Docker", icon: "/skills/docker.svg" },
  { name: "Express.js", icon: "/skills/express.png" },
  { name: "Python", icon: "/skills/python.svg" },
  { name: "C++", icon: "/skills/c++.svg" },
  { name: "Java", icon: "/skills/java.svg" },
  { name: "C", icon: "/skills/c.svg" },
  { name: "Github", icon: "/skills/github.svg" },
  { name: "Atom", icon: "/skills/atom.svg" },
  { name: "Notepad++", icon: "/skills/notepad++.png" },
  { name: "PHP", icon: "/skills/php.png" },
];

const SkillsSection = () => {
  return (
    <section className="relative z-[40] py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          My Tech Stack
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 place-items-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="absolute top-full mt-2 text-center text-sm md:text-base font-medium text-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 min-w-[120px]">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
