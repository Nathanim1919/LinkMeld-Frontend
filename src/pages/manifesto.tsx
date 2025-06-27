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
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-24">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Knowledge.<br />
            <span className="text-gray-400">Reimagined.</span>
          </h1>
          <div className="h-px w-16 bg-gray-700 mb-8"></div>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            A manifesto for tools that think like you do.
          </p>
        </motion.div>

        {/* Manifesto Content */}
        <div className="space-y-24">
          {manifestoContent.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <h2 className="text-2xl font-light text-gray-300 mb-6 tracking-wide">
                {section.heading}
              </h2>
              <div className="space-y-6">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex}
                    className="text-lg text-gray-400 font-light leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {index < manifestoContent.length - 1 && (
                <div className="h-px w-full bg-gray-800 mt-16"></div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 text-sm">Est. 2023</p>
        </motion.div>
      </div>
    </div>
  );
};