"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="contact-section"
      ref={ref}
      className="relative section-padding bg-[#0067B1] text-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-white">
                Get in touch
              </h2>
              <div className="w-16 h-1 bg-white mb-8"></div>
              <p className="text-blue-100 text-lg leading-relaxed">
                For general enquiries
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">
                  Address :
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  110, 16th Road, Chembur, Mumbai - 400071
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">
                  Phone :
                </h3>
                <a
                  href="tel:+912225208622"
                  className="text-blue-100 hover:text-white transition-colors text-lg"
                >
                  +91 22 25208622
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">
                  Email :
                </h3>
                <a
                  href="mailto:info@supremegroup.co.in"
                  className="text-blue-100 hover:text-white transition-colors text-lg"
                >
                  info@supremegroup.co.in
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="bg-transparent" variants={itemVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float" />
    </motion.section>
  );
}
