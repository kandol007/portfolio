import React from "react";
import HeroContent from "@/components/sub/HeroContent";

const Hero = () => {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      id="about-me"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute left-1/2 top-[36%] z-[5] h-[112%] w-[112%] min-h-[600px] min-w-[600px] -translate-x-1/2 -translate-y-1/2 rotate-180 object-cover object-center sm:top-[40%] sm:h-[128%] sm:w-[128%] md:top-1/2 md:h-[150%] md:w-[150%]"
      >
        <source src="/public_blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <HeroContent />
    </div>
  );
};

export default Hero;
