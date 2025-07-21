"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../../assets/Logo.png";
import bg from "../../assets/Bg.png";
import Image from "next/image";

const footerSections = {
  applications: {
    title: "APPLICATIONS",
    links: [
      { label: "Apparel", href: "#apparel" },
      { label: "Automotive", href: "#automotive" },
      { label: "Filtration", href: "#filtration" },
      { label: "Customised Solutions", href: "#solutions" },
    ],
  },
  company: {
    title: "COMPANY",
    links: [
      { label: "Innovation", href: "#about" },
      { label: "Global Competency", href: "#competency" },
      { label: "About Us", href: "#innovation" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  more: {
    title: "MORE",
    links: [
      { label: "Careers", href: "#careers" },
      { label: "Privacy Policy", href: "#competency" },
      { label: "Terms and Conditions", href: "#innovation" },
    ],
  },
  followUs: {
    title: "FOLLOW US",
    links: [
      { label: "Twitter", href: "#linkedin" },
      { label: "LinkedIn", href: "#linkedin" },
      { label: "Instagram", href: "#linkedin" },
      { label: "Medium", href: "#linkedin" },
    ],
  },
};

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      className="bg-white text-gray-600 border-t border-gray-100 relative overflow-hidden min-h-[600px] text-left"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute bottom-0 right-0 w-[26%] h-[75%]">
        <Image
          src={bg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          objectPosition="right"
          className="z-0"
          priority={false}
        />
      </div>

      <div className="container mx-auto px-6 py-20 max-w-7xl relative z-10">
        <motion.div className="mb-20" variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center space-x-4"
            aria-label="Supreme Group Home"
          >
            <Image
              src={Logo}
              alt="Supreme Group Logo"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {Object.entries(footerSections).map(([key, section]) => (
            <motion.div key={key} className="text-left" variants={itemVariants}>
              <h3 className="font-bold text-gray-800 mb-8 text-lg tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="space-y-5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-base block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="relative z-10" variants={itemVariants}>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-base text-gray-600">
            <motion.p variants={itemVariants} className="font-medium">
              ©2024. All Rights Reserved.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-center md:text-right font-medium"
            >
              Supreme House, 110, 16th Road, Chembur, Mumbai - 400071
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
