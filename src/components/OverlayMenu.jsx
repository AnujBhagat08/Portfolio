import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const menuItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

// Overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.15, 
      ease: "easeInOut",
    },
  },
};

// Menu stagger
const menuVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1, // reverse close
    },
  },
};

// Menu item animation
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -35, // slide UP on close
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function OverlayMenu({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleScroll = (id) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[999999] backdrop-blur-xs bg-black/80 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-3xl transition-transform hover:rotate-90"
          >
            <FiX />
          </button>

          {/* Menu items */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              h-full flex flex-col items-center justify-center
              gap-6 pb-25
              text-[28px] md:text-[28px]
              font-semibold tracking-wide
              font-['Poppins']
            "
          >
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleScroll(item.id)}
                className="
                  cursor-pointer
                  transition-all duration-1
                  hover:text-pink-500
                  hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]
                "
              >
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
