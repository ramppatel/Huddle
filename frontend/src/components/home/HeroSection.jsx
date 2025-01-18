import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation variants for floating elements
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#404EED] overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B22] to-[#2B1D55]">
        {/* Animated blurred shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full blur-3xl"
            style={{
              background: i % 2 === 0 ? "#7289DA" : "#9B84EC",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-16 pb-32 relative z-10">
        {/* Hero Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ONE PLATFORM
            <br />
            ENDLESS POSSIBILITIES
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From casual chats to building the next big idea, Huddle is where
            communities thrive and connections grow.
          </motion.p>
        </motion.div>

        {/* Device Mockups */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop App */}
          <motion.div
            className="bg-[#36393F] rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* App Header */}
            <div className="h-8 bg-[#202225] flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* App Content */}
            <div className="grid grid-cols-12 h-[480px]">
              {/* Sidebar */}
              <div className="col-span-2 bg-[#2F3136] p-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gray-700 mb-3 mx-auto"
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>

              {/* Channel List */}
              <div className="col-span-2 bg-[#2F3136] border-l border-gray-800">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="px-2 py-1 mx-2 my-1 rounded hover:bg-gray-700 cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </motion.div>
                ))}
              </div>

              {/* Main Chat */}
              <div className="col-span-6 bg-[#36393F] p-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Member List */}
              <div className="col-span-2 bg-[#2F3136] p-4">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-2 mb-3"
                    whileHover={{ x: -4 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -left-16 top-1/4"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            <div className="w-24 h-24 bg-purple-500 rounded-2xl transform rotate-12" />
          </motion.div>

          <motion.div
            className="absolute -right-8 bottom-1/4"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          >
            <div className="w-20 h-20 bg-blue-500 rounded-2xl transform -rotate-12" />
          </motion.div>

          {/* Mobile Device */}
          <motion.div
            className="absolute -right-4 bottom-0 w-64"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-black rounded-3xl p-2">
              <div className="bg-[#36393F] rounded-2xl h-[400px] overflow-hidden">
                {/* Mobile App Content */}
                <div className="p-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 mb-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + 0.1 * i }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
