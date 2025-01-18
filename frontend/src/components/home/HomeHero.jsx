import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function HomeHero() {
  React.useEffect(() => {
    // GSAP animation for floating effect
    gsap.to(".floating", {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-[#0A0B22] to-[#2B1D55] h-screen flex flex-col items-center justify-center overflow-hidden text-center">
      {/* Hero Text */}
      <motion.h1
        className="text-white text-5xl md:text-6xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        "YOU'VE REACHED THE END. <br /> TIME TO CONNECT WITH OTHERS."
      </motion.h1>

      {/* Download Button */}
      {/* <motion.a
        href="#"
        className="bg-blue-600 text-white py-3 px-6 rounded-full font-medium text-lg hover:bg-blue-500 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Start
      </motion.a> */}

      {/* Big Huddle Word */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-white font-extrabold text-7xl md:text-9xl opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Huddle
      </motion.div>
    </div>
  );
}

export default HomeHero;
