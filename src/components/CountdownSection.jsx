import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RollingDigit = ({ value }) => (
  <div className="relative h-16 w-10 sm:h-24 md:h-32 sm:w-16 md:w-20 overflow-hidden bg-neutral-900 rounded-lg flex items-center justify-center border border-white/5 shadow-inner">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute text-3xl sm:text-5xl md:text-7xl font-mono font-black text-red-600"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

export default function CountdownSection() {
  const targetDate = new Date("2026-03-20T00:00:00"); // Set your event date here
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
      const mins = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, "0");
      const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, "0");

      setTimeLeft({ days, hours, mins, secs });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="eyebrow text-gray-500 mb-8 sm:mb-12">The Countdown Begins</h2>
        
        <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div className="flex gap-1 sm:gap-2">
                <RollingDigit value={value[0]} />
                <RollingDigit value={value[1]} />
              </div>
              <span className="mt-2 sm:mt-3 md:mt-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-red-500/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}