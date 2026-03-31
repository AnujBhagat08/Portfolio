import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import emailjs from "@emailjs/browser";
import img from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_ID = import.meta.env.VITE_PUBLIC_ID;

const initialFormData = { name: "", email: "", subject: "", message: "" };

// Toast Component
const Toast = ({ message, type }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
      exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.95 }}
      className={`absolute top-10 left-1/2 z-50 px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
        backdrop-blur-xl border flex items-center gap-3 min-w-[320px] transition-all
        ${
          isSuccess
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}
    >
      {/* Icon based on status */}
      <div
        className={`p-1 rounded-full ${isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"}`}
      >
        {isSuccess ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>

      <span className="text-sm font-medium tracking-wide">{message}</span>

      {/* Modern Progress Bar (Optional but looks cool) */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 4, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-[0.5 rounded-full
          ${isSuccess ? "bg-emerald-500/40" : "bg-red-500/40"}`}
      />
    </motion.div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation Logic
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_ID) {
      showToast("Config error: Check Environment Variables", "error");
      return;
    }

    setLoading(true);
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_ID)
      .then(() => {
        showToast("Message sent successfully!", "success");
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        showToast("Failed to send message. Try again.", "error");
      })
      .finally(() => setLoading(false));
  };

  // Helper to trigger toast
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const inputStyles =
    "w-full p-3 rounded-lg bg-transparent border border-gray-400 outline-none placeholder-gray-400 focus:border-blue-500 transition duration-200";

  return (
    <>
      <section
        id="contact"
        className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
      >
        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} />}
        </AnimatePresence>

        {/* Bg flotting particles  */}
        <ParticlesBackground />

        <div className="w-full md:w-1/2 flex justify-center z-10">
          <motion.img
            src={img}
            alt="Contact"
            className="w-[80%] md:w-[500px] rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-black/40 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-blue-400">
            Get in Touch
          </h2>

          {["name", "email", "subject"].map((field) => (
            <div className="mb-4" key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                value={formData[field]}
                onChange={handleChange}
                className={inputStyles}
              />
              {errors[field] && (
                <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="mb-6">
            <textarea
              name="message"
              rows="4"
              placeholder="Message *"
              value={formData.message}
              onChange={handleChange}
              className={inputStyles}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </section>
    </>
  );
}
