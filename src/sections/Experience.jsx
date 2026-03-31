import React, { useRef, useState, useEffect, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const experiences = [
  {
    role: "Web Developer Intern",
    company: "SS Infotech Solutions",
    duration: "July 2025 - Dec 2025",
    description:
      "Worked on frontend development tasks, improved UI responsiveness, and contributed to real client-based web modules.",
  },
  {
    role: "Frontend Developer (Major Project)",
    company: "Final Year College Project",
    duration: "2026 (Ongoing)",
    description:
      "Developing a modern, scalable web application using React and Node.js as part of the engineering major project.",
  },
  {
    role: "Open for Internships & Full-Time Roles",
    company: "Available for Hiring",
    duration: "2026",
    description:
      "Eager to join a dynamic team and apply my frontend development skills in real projects.",
  },
];

// Memoized Card for performance
const ExperienceCard = memo(({ exp, index, isMobile }) => {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "end 0.6"], // Adjusted for early trigger and smoother transition
  });

  // Softer Spring for organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, // Reduced stiffness for less "jumpy" movement
    damping: 25, // Increased damping for smoother stop
    restDelta: 0.001,
  });

  // Optimized transforms
  const opacity = useTransform(smoothProgress, [0, 0.7], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 0.7], [0.9, 1]);
  const y = useTransform(smoothProgress, [0, 0.7], [60, 0]); // Reduced Y distance for subtle feel

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="relative w-full mb-32 md:mb-48 last:mb-0 will-change-transform"
    >
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : opacity,
          scale: shouldReduceMotion ? 1 : scale,
          y: shouldReduceMotion ? 0 : y,
        }}
        className={`flex w-full ${
          isMobile
            ? "justify-start pl-10"
            : isEven
              ? "justify-start pr-[50%]"
              : "justify-end pl-[50%]"
        }`}
      >
        {/* Connector Dot - GPU Optimized */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-blue-500 border-[3px] border-black shadow-[0_0_15px_rgba(59,130,246,0.6)] 
          ${isMobile ? "left-[-9px]" : "left-1/2 -translate-x-1/2"}`}
        />

        {/* Content Box - Modern SaaS Glassmorphism */}
        <div className="w-full max-w-lg p-7 md:p-9 rounded-4xl bg-gray-900/40 backdrop-blur-md border border-white/5 shadow-2xl hover:border-blue-500/30 transition-colors duration-500">
          <div className="flex mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-tighter border border-blue-500/20">
              {exp.duration}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
            {exp.role}
          </h3>
          <p className="text-blue-400/90 text-sm mb-4 font-medium">
            {exp.company}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed font-normal">
            {exp.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
});

export default function Experience() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const lineSize = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  return (
    <section
      id="experience"
      className="relative bg-black py-40 px-6 sm:px-12 overflow-hidden selection:bg-blue-500/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-40"
        >
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative z-10">
            Experience
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-white/10 to-transparent ${isMobile ? "left-0" : "left-1/2 -translate-x-1/2"}`}
          >
            <motion.div
              style={{ scaleY: lineSize }}
              className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-600 via-cyan-400 to-blue-500 origin-top will-change-transform"
            />
          </div>

          <div className="flex flex-col relative">
            {experiences.map((exp, idx) => (
              <ExperienceCard
                key={idx}
                exp={exp}
                index={idx}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-40" />
    </section>
  );
}
