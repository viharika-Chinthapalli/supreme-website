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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <motion.div
            className="flex items-center space-x-3 flex-shrink-0"
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
                className="h-8 sm:h-9 lg:h-10 w-auto"
                priority
              />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact-section"
                className="border border-[#00BFFF] bg-[#5CD6FF] hover:bg-cyan-500 text-gray-900 px-4 lg:px-6 py-2 rounded-full font-medium transition-colors duration-200 text-xs sm:text-sm"
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
                className="h-4 w-4 lg:h-5 lg:w-5"
              />
            </motion.a>

            <motion.div
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={Language} 
                alt="Language" 
                width={52} 
                height={22}
                className="h-4 w-auto lg:h-5"
              />
            </motion.div>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <motion.span
                  className="block h-0.5 w-5 bg-gray-700 mb-1"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    translateY: isMobileMenuOpen ? 3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-5 bg-gray-700 mb-1"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-5 bg-gray-700"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    translateY: isMobileMenuOpen ? -3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        <motion.div
          className={`md:hidden overflow-hidden ${
            isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: isMobileMenuOpen ? 0 : -20,
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="#contact-section"
                className="block w-full text-center border border-[#00BFFF] bg-[#5CD6FF] hover:bg-cyan-500 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors duration-200 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </motion.div>

            <div className="flex items-center justify-center space-x-6">
              <motion.a
                href="https://linkedin.com/company/supreme-group"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md transition-colors duration-200 hover:bg-gray-100"
                aria-label="LinkedIn"
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: isMobileMenuOpen ? 0 : -20,
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
                transition={{ delay: 0.2 }}
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
                className="flex items-center space-x-2 cursor-pointer p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: isMobileMenuOpen ? 0 : -20,
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
                transition={{ delay: 0.3 }}
              >
                <Image 
                  src={Language} 
                  alt="Language" 
                  width={52} 
                  height={22}
                  className="h-5 w-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}