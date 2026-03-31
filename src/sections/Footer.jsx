import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Your glow animation
const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204,0.9)) drop-shadow(0 0 18px rgba(16, 185, 129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full py-24 bg-black text-white overflow-hidden">
      {/* Soft glow circle behind content */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-700/30 via-transparent to-black blur-3xl opacity-50 pointer-events-none"></div>

      {/* FOOTER CONTENT */}
      <div className="relative z-10 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-semibold leading-none text-white text-center select-none"
          style={{
            fontSize: "clamp(3rem, 5vw, 14rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            padding: "0 3vw",
            whiteSpace: "nowrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Anuj Bhagat
        </motion.h1>

        {/* Underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 90, opacity: 1 }}
          transition={{ duration: 0.6}}
          className="h-[2px] bg-teal-400 mx-auto mt-3"
        ></motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7}}
          className="flex justify-center mt-7 gap-8 text-3xl"
        >
          {/* Twitter/X */}
          <motion.a
            href="https://x.com/Anuj_Bhagat08?t=HSCFY3QF2IBbxfnB-2-Q-w&s=08 "
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-white cursor-pointer"
          >
            <FaXTwitter />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/anuj-bhagat-7303a2350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-white cursor-pointer"
          >
            <FaLinkedin />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/AnujBhagat08"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-white cursor-pointer"
          >
            <FaGithub />
          </motion.a>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{once:true}}
          className="mt-6 italic text-sm text-gray-300 px-4"
        >
          "Success is when preparation meets opportunity."
        </motion.p>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{once:true}}
          className="mt-4 text-xs text-gray-500"
        >
          © {new Date().getFullYear()} Anuj Bhagat. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
