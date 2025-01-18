import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-b from-[#0A0B22] to-[#2B1D55] text-center text-gray-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center space-x-8 mb-6"
      >
        {/* Add your social media icons or other elements here */}
      </motion.div>

      {/* Company Info */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-semibold text-lg text-gray-100"
      >
        Huddle - Where Communities Thrive
      </motion.p>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 text-sm"
      >
        © {new Date().getFullYear()} Huddle. All rights reserved.
      </motion.p>
    </footer>
  );
}

export default Footer;
