"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToNext = () => {
    const nextSection = document.querySelector("#evolution-section");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

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

      <div className="relative z-20 container mx-auto container-padding text-center text-white">
        <motion.div
          className="mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-lg md:text-xl font-medium mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Driven by performance
          </motion.p>

          <motion.h1
            className="text-white text-hero font-medium mb-6 text-balance text-3xl md:text-4xl lg:text-3xl xl:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="block leading-tight">
              Soft trims and{" "}
              <span className="text-[#0067B1] mt-4">NVH solutions &nbsp;</span>
              <br />
              for seamless rides
            </span>
          </motion.h1>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-white hover:text-gray-300 transition-colors duration-200"
          whileHover={{ y: -5 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Discover More</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    </motion.section>
  );
}
