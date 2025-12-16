import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, School, X } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
            The Convergence
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Global Vision. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Local Roots.</span>
          </h2>
        </div>

        {/* DUAL CARDS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">

          {/* CARD 1: TEDx Mission */}
          <div className="group relative bg-neutral-900/40 border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-neutral-900/60 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
               <Globe size={150} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
                  <span className="text-white font-black text-xl"></span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">The Global Spark</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At TEDxSMEC, we combine the global philosophy of <span className="text-white">"Ideas Worth Spreading"</span> with our unique community spirit.
              </p>

              <Link to="/about" className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs md:text-sm hover:text-white transition-colors">
                Read Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* CARD 2: SMEC Foundation */}
          <div className="group relative bg-neutral-900/40 border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-neutral-900/60 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-rotate-12 duration-700">
               <School size={150} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-black font-black text-xl"></span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent"></div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">The Academic Core</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                St. Martin's Engineering College provides the intellectual ecosystem where these ideas take root. As a hub of excellence in Hyderabad, SMEC nurtures the <span className="text-white">critical thinking</span> needed to turn abstract concepts into reality.
              </p>

              <a href="https://smec.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/70 font-bold uppercase tracking-wider text-xs md:text-sm hover:text-red-500 transition-colors">
                Visit SMEC <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}