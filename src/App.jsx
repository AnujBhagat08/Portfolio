import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import { motion } from "framer-motion";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Intro Animation (only shows once until onFinish triggers) */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Main Website */}
      {introDone && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative gradient min-h-screen w-full text-white scroll-smooth"
        >
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </motion.div>
      )}
      <div>
        <CustomCursor />
      </div>
    </>
  );
}
