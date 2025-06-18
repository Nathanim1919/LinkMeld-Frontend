import { motion } from "framer-motion";
import { FiTwitter, FiGithub, FiLinkedin, FiDribbble } from "react-icons/fi";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#0A0A0A] text-zinc-400 px-6 lg:px-24 py-16 border-t border-white/5"
    >
      {/* === Quantum Grid Background === */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* === Main Footer Content === */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Section (Wider Column) */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600 mb-4">
              lnked
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 mb-6">
              A cognitive extension for the post-human era. Collect, organize and recall insights at light speed.
            </p>
            
            {/* Subscription Field */}
            <div className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Receive cosmic updates"
                className="bg-white/5 border border-white/10 text-sm rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
              >
                Warp
              </motion.button>
            </div>
          </motion.div>

          {/* Navigation Links (Animated Stagger) */}
          {[
            {
              title: "Orbit",
              links: ["Features", "Pricing", "Demo", "Extensions"]
            },
            {
              title: "Galaxy",
              links: ["About", "Careers", "Manifesto", "Contact"]
            },
            {
              title: "Transmit",
              links: ["Twitter", "GitHub", "LinkedIn", "Dribbble"]
            }
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-zinc-300 mb-4 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href="#" 
                      className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      {link === "Twitter" && <FiTwitter size={14} />}
                      {link === "GitHub" && <FiGithub size={14} />}
                      {link === "LinkedIn" && <FiLinkedin size={14} />}
                      {link === "Dribbble" && <FiDribbble size={14} />}
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* === Divider === */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"
        />

        {/* === Bottom Row === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
        >
          <div className="text-zinc-500">
            © {new Date().getFullYear()} lnked • Interstellar Edition
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs">
              Privacy Singularity
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs">
              Terms of Warp
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs">
              Cookie Nebula
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};