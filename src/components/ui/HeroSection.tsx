"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleVideoPlay = () => {
    setIsVideoLoaded(true);
  };

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 hero-pattern opacity-30" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={handleVideoPlay}
          onLoadedData={handleVideoPlay}
        >
          <source src="/videos/automotive.mp4" type="video/mp4" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            }}
          />
        </video>
      </div>

      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center text-white">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-4 sm:mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Performance in motion
          </motion.p>

          <motion.h1
            className="text-white font-medium mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontSize: 'clamp(1.75rem, 4vw + 1rem, 3.5rem)',
              lineHeight: 'clamp(2rem, 4.5vw + 1.2rem, 4rem)'
            }}
          >
            <span className="block">
              Soft trims and{" "}
              <span className="text-[#0067B1]">NVH solutions</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              for seamless rides
            </span>
          </motion.h1>
        </motion.div>
      </div>


      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-2xl sm:blur-3xl animate-float" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 h-24 sm:w-48 sm:h-48 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
    </motion.section>
  );
}