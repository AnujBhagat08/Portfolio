import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

//  IMPORT IMAGES (mobile + desktop versions)
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";

/* 
   Custom Hook → Detect screen width for responsive images
*/
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  /* 
     Project list 
*/
  const projects = useMemo(
    () => [
      {
        title: "nk studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  /* 
    Scroll tracking
  */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky Layer */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start">
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-6"
          }`}
        >
          My Work
        </h2>

        {/* Wrapper for image + title */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center mb-15 px-3 ${
            isMobile ? "mr-17" : "mt-6"
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-[50%] left-1/2 
                -translate-x-1/2 -translate-y-1/2 
                transition-all duration-500 
                mb-0 mt-0 ml-0 
                ${
                  activeIndex === idx
                    ? "opacity-100 z-20"
                    : "opacity-0 z-0 sm:z-10"
                } 
              `}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* Title (slightly hidden behind image) */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)]
                      text-white/95 
                      sm:absolute 
                      sm:-top-21     
                      sm:left-[35%] 
                      lg:left-[-1%]
                      sm:mb-0 italic font-semibold
                      ${isMobile ? "ml-20" : ""}`}
                    style={{
                      zIndex: 5,
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              {/* Image container */}
              <div
                className={`relative w-[88%] max-w-[1250px] 
                  overflow-hidden bg-black/20 shadow-2xl sm:mb  md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] 
                  ${
                    isMobile ? "rounded-lg sm:left-36.5 mb-20 " : "sm:mb-12 mb-10 rounded-xl"
                  } 
                  h-[62vh] sm:h-[70vh] lg:h-[72vh]
                  ml-15  `}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl transition-all duration-200 "
                  style={{
                    position: "relative",
                    filter: "drop-shadow(0,16px 40px rgba(0,0,0, 0.65))",
                    zIndex: 10,
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />

                {/* Top gradient */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg , rgba(0,0,0,0.12) 0% , rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`absolute ${isMobile ? "bottom-5" : "bottom-3"}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferre"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all "
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
