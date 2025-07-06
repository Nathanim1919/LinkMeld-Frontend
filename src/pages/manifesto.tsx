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
    <div className="min-h-screen bg-black text-[#f5f5f7] relative overflow-hidden">
      {/* Soft background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.015] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 space-y-28">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-center space-y-6"
        >
          <h1 className="text-[3.5rem] sm:text-[4.5rem] font-light leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white to-[#d1d1d6] bg-clip-text text-transparent">
              Knowledge.
            </span>
            <br />
            <span className="text-[#8e8e93]">Reimagined.</span>
          </h1>

          <motion.div
            className="h-[1px] w-24 bg-[#2c2c2e] mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />

          <p className="text-xl sm:text-2xl font-light text-[#a1a1a6] max-w-2xl mx-auto">
            A manifesto for tools that think like you do.
          </p>
        </motion.div>

        {/* Manifesto Sections */}
        <div className="space-y-32">
          {manifestoContent.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Dot Indicator */}
              <motion.div
                className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-[#0a84ff] shadow-[0_0_12px_2px_rgba(10,132,255,0.4)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.2 }}
              />

              <h2 className="text-3xl sm:text-4xl font-light mb-8 text-[#f5f5f7] tracking-tight">
                {section.heading}
              </h2>

              <div className="space-y-6 sm:space-y-8 pl-3">
                {section.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-[#a1a1a6] font-light leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {index < manifestoContent.length - 1 && (
                <motion.div
                  className="mt-24 h-px w-full bg-[#2c2c2e]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="pt-16 border-t border-[#2c2c2e] text-center"
        >
          <p className="text-[#636366] text-sm tracking-wider uppercase">Established 2023</p>
        </motion.div>
      </div>
    </div>
  );
};
