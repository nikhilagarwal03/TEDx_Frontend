import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-8 md:py-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">

          {/* Welcoming Header Side */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* <span className="eyebrow mb-4 block">SHORT INTRODUCTION</span> */}
              <h2 className="heading-section leading-[0.9]">
                Where Ideas <br /> <span className="text-red-600 drop-shadow-[0_0_20px_rgba(230,43,30,0.4)]">Find Home.</span>
              </h2>
            </motion.div>
          </div>

          {/* The Welcoming Portal Box */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl md:rounded-[3rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl group hover:border-red-600/30 transition-all duration-700 shadow-2xl relative"
            >
              {/* Subtle Glow behind icon */}
              <div className="absolute top-6 sm:top-8 md:top-10 left-6 sm:left-8 md:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-red-600/10 blur-2xl rounded-full group-hover:bg-red-600/20 transition-all" />

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-6 sm:mb-8 shadow-lg shadow-red-900/40 relative z-10 mx-auto lg:mx-0">
                <Heart size={24} className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
              </div>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Welcome to the Community</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                  TEDxSMEC is more than an event—it's a home for the <span className="text-white">curious souls, the bold dreamers, and the innovators</span>.
                  What started in our classrooms at SMEC has grown into a vibrant platform where your voice can spark a global conversation.
                </p>
                <p className="text-gray-500 text-xs sm:text-sm italic">
                  We believe every great innovation begins with a single, shared spark.
                </p>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-black rounded-full uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white hover:text-red-600 transition-all shadow-[0_10px_30px_rgba(230,43,30,0.3)] w-full sm:w-auto"
              >
                kNOW ABOUT US <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}