import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Content pulled from your single-event focus
const MAIN_EVENT = {
  name: "Echoes of Innovation",
  date: "March 20, 2026",
  time: "10:00 AM - 05:00 PM",
  venue: "Grand Auditorium, SMEC",
  description: "A transformative journey through the reverberations of past breakthroughs and their impact on our future. Join us for a day of ideas that don't just speak—they resonate.",
  image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
  agenda: [
    { time: "10:00 AM", title: "Opening: The First Echo", desc: "Introductory remarks and performance." },
    { time: "11:30 AM", title: "Session I: Neural Networks", desc: "Exploring the connectivity of modern ideas." },
    { time: "02:00 PM", title: "Session II: Future Silence", desc: "The impact of technology on human connection." },
    { time: "04:30 PM", title: "Closing: The Final Resonance", desc: "Concluding thoughts and networking." }
  ]
};

export default function EventsSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12 md:py-24 bg-black relative overflow-hidden selection:bg-red-600">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 md:mb-16 text-center md:text-left">
          <span className="eyebrow block mb-3 md:mb-4">The Main Event</span>
          <h2 className="heading-section">
            Upcoming <span className="text-red-600">Experience.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-stretch">
          
          {/* LEFT: Event Identity */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] bg-neutral-900/40 border border-white/5 relative group"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 md:mb-8">
                <div className="px-3 sm:px-4 py-2 bg-red-600 rounded-full text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 sm:gap-2">
                  <Calendar size={11} /> {MAIN_EVENT.date}
                </div>
                <div className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 sm:gap-2">
                  <MapPin size={11} /> {MAIN_EVENT.venue}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 md:mb-6 uppercase italic tracking-tighter leading-none">
                {MAIN_EVENT.name}
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 md:mb-10">
                {MAIN_EVENT.description}
              </p>
            </div>

            <Link 
              to="/events" 
              className="group inline-flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black rounded-full uppercase tracking-widest text-[10px] sm:text-xs hover:bg-red-600 hover:text-white transition-all shadow-xl"
            >
              Full Event Info <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* RIGHT: Agenda Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 flex flex-col p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] border border-white/5 bg-gradient-to-br from-neutral-900/20 to-transparent"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-6 md:mb-10">
              <Clock className="text-red-600" size={20} />
              <h4 className="text-white font-black uppercase tracking-widest text-xs sm:text-sm">The Agenda Preview</h4>
            </div>

            <div className="space-y-4 sm:space-y-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-white/5" />

              {MAIN_EVENT.agenda.map((item, i) => (
                <motion.div 
                  key={i}
                  onClick={() => setActiveStep(i)}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`relative pl-10 sm:pl-12 cursor-pointer sm:cursor-default transition-all duration-500 ${activeStep === i ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                >
                  {/* Point */}
                  <div className={`absolute left-0 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${activeStep === i ? 'bg-red-600 border-red-600 scale-110 shadow-[0_0_20px_rgba(230,43,30,0.5)]' : 'bg-black border-white/20'}`}>
                    <Zap size={12} className={activeStep === i ? 'text-white' : 'text-gray-600'} />
                  </div>

                  <div className="space-y-1">
                    <span className="text-red-500 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">{item.time}</span>
                    <h5 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">{item.title}</h5>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="text-gray-500 text-xs sm:text-sm overflow-hidden"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}