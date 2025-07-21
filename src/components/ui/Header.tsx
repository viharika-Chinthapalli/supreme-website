"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../../assets/Logo.png";
import Linkedin from "../../assets/linkedin.png";
import Language from "../../assets/Language.png";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const heroHalfPoint = heroHeight / 2;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < heroHalfPoint) {
        setIsVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > heroHalfPoint
      ) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container py-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label="Supreme Group Home"
            >
              <Image
                src={Logo}
                alt="Supreme Group Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </motion.div>

          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact-section"
                className="border border-[#00BFFF] bg-[#5CD6FF] hover:bg-cyan-500 text-gray-900 px-6 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.a
              href="https://linkedin.com/company/supreme-group"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn"
            >
              <Image
                src={Linkedin}
                alt="LinkedIn"
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </motion.a>

            <motion.div
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={Language} alt="Language" width={52} height={22} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
