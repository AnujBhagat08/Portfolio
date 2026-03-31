import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

// Icons
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTypescript,
  SiFastapi,
  SiPython,
  SiDocker,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";

export default function Skills() {
  // All skills icons + names
  const skills = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <FaGitAlt />, name: "Git" },
  ];

  // Duplicate skills list (for seamless infinite loop)
  const repeated = [...skills, ...skills];

  // Motion value for horizontal movement
  const x = useMotionValue(0);

  // Section visibility (for activating animation only when visible)
  const [active, setActive] = useState(false);

  // Direction of scroll: -1 = left, 1 = right
  const [dir, setDir] = useState(-1);

  // Refs
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null); // For touch-scroll direction

  // Detect when section is visible using IntersectionObserver
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activates animation only when at least 20% visible
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0.2] }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  // Detect scroll direction (mouse wheel or touch)
  useEffect(() => {
    if (!active) return;

    // Mouse wheel → direction
    const handleWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);

    // Touch start capture Y position
    const handleTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    // Touch move → detect direction
    const handleTouchMove = (e) => {
      if (touchY.current == null) return;
      const newY = e.touches[0].clientY;
      setDir(newY > touchY.current ? 1 : -1);
      touchY.current = newY;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [active]);

  // Infinite scrolling animation loop
  useEffect(() => {
    let frame;
    let last = performance.now();
    const speed = 80; // px/sec movement speed

    const animate = (now) => {
      const dt = (now - last) / 1000; // Time since last frame
      last = now;

      // Total width of one full loop
      const loopWidth = (trackRef.current?.scrollWidth || 0) / 2;

      // If width not loaded yet → retry next frame
      if (!loopWidth) {
        frame = requestAnimationFrame(animate);
        return;
      }

      // New x position
      let next = x.get() + speed * dir * dt;

      // Loop reset logic
      if (next <= -loopWidth) next += loopWidth;
      if (next >= 0) next -= loopWidth;

      x.set(next);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dir]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background glowing gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full 
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-20 blur-[120px] animate-pulse"
        />

        <div
          className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full 
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-20 blur-[120px] animate-pulse delay-500"
        />
      </div>

      {/* Section heading */}
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold 
        bg-clip-text text-transparent bg-gradient-to-r 
        from-[#1cd8d2] via-[#00df8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Infinite loop track */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
          style={{
            x, // Motion-based horizontal movement
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              title={s.name}
            >
              {/* Icon hover scale */}
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>

              {/* Skill name */}
              <p className="text-sm">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
