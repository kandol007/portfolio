"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Variants } from "framer-motion";

const slideIn = (
  direction: "left" | "right" | "top",
  delay = 0
): Variants => {
  const x = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const y = direction === "top" ? -50 : 0;

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // ✅ Cubic bezier array is valid Easing
      },
    },
  };
};

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 mt-32 md:mt-40 w-full z-[20]"
    >
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 justify-center text-start">
        <motion.div
          variants={slideIn("top")}
          className="flex items-center gap-2 py-[8px] px-[12px] border border-[#7042f88b] rounded-md opacity-90 max-w-max"
        >
          <SparklesIcon className="text-[#b49bff] h-5 w-5" />
          <h1 className="text-[13px] font-medium text-white">
            Full Stack Developer
          </h1>
        </motion.div>

        <motion.h2
          variants={slideIn("left", 0.3)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight"
        >
          Crafting{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            amazing web experiences
          </span>{" "}
          with modern tech
        </motion.h2>

        <motion.p
          variants={slideIn("left", 0.5)}
          className="text-lg text-gray-400 mt-4 max-w-xl"
        >
          I&apos;m Ritik Kumar, a passionate Full Stack Developer with experience
          in building responsive websites, web apps, and real-world software
          solutions. I love working with React, Next.js, Node.js, and data tools.
        </motion.p>

        <motion.a
          href="projects"
          variants={slideIn("left", 0.8)}
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm px-6 py-3 rounded-lg w-fit"
        >
          Explore Projects →
        </motion.a>
      </div>

      {/* Right Image */}
      <motion.div
        variants={slideIn("right", 0.4)}
        className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="Hero Illustration"
          height={500}
          width={500}
          className="w-full max-w-xs md:max-w-md"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
