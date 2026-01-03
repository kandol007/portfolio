import React from "react";
import HeroContent from "@/components/sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-260px] h-full w-full left-0 z-[5] object-cover pointer-events-none"
      >
        <source src="/public_blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <HeroContent />
    </div>
  );
};

export default Hero;
