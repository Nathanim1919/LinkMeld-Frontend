import React from "react";
import { motion } from "framer-motion";

export const Manifesto: React.FC = () => {
  const manifestoContent = [
    {
      heading: "The Future of Knowledge",
      paragraphs: [
        "We believe in tools that disappear—so the work can appear.",
        "Technology should amplify human potential, not demand our attention."
      ]
    },
    {
      heading: "Our Principles",
      paragraphs: [
        "Simplicity is the ultimate sophistication. We remove everything that isn't essential.",
        "Privacy isn't a feature—it's the foundation. Your data belongs to you, period.",
        "Interoperability creates value. Closed systems become obsolete."
      ]
    },
    {
      heading: "Our Promise",
      paragraphs: [
        "We will never compromise on craftsmanship.",
        "We will always respect your attention.",
        "We build for the long term—not quarterly growth."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIgLz48L3N2Zz4=')] opacity-5" />
      
      <div className="max-w-4xl mx-auto px-8 py-32 relative">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32"
        >
          <h1 className="text-6xl font-light mb-8 tracking-tight leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f7] to-[#a1a1a6]">
              Knowledge.
            </span>
            <br />
            <span className="text-[#a1a1a6]">Reimagined.</span>
          </h1>
          <motion.div 
            className="h-[1px] w-20 bg-[#2c2c2e] mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <p className="text-2xl text-[#a1a1a6] font-light leading-relaxed max-w-2xl">
            A manifesto for tools that think like you do.
          </p>
        </motion.div>

        {/* Manifesto Content */}
        <div className="space-y-32">
          {manifestoContent.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              {/* Section indicator (like Apple's subtle design elements) */}
              <motion.div 
                className="absolute -left-10 top-1 h-2 w-2 rounded-full bg-[#2997ff]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3 }}
              />
              
              <h2 className="text-3xl font-light text-[#f5f5f7] mb-8 tracking-tight">
                {section.heading}
              </h2>
              
              <div className="space-y-8 pl-4">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <motion.p
                    key={pIndex}
                    className="text-xl text-[#a1a1a6] font-light leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.15 + pIndex * 0.1 + 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {index < manifestoContent.length - 1 && (
                <motion.div 
                  className="h-[1px] w-full bg-[#2c2c2e] mt-24"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    delay: index * 0.15 + section.paragraphs.length * 0.1 + 0.3,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              )}
            </motion.section>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-40 pt-8 border-t border-[#2c2c2e]"
        >
          <p className="text-[#636366] text-sm tracking-wider">ESTABLISHED 2023</p>
        </motion.div>
      </div>
    </div>
  );
};