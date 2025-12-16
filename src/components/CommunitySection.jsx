import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Image as ImageIcon, Users } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

const DUMMY_MEDIA = [
  "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3321791/pexels-photo-3321791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

export default function CommunitySection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch Images
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get('/admin/media/public');
        const data = res?.data?.success ? res.data.data : res?.data || [];
        const validImages = (Array.isArray(data) ? data : [])
          .filter(m => !m.type || m.type === 'photo' || m.type === 'image')
          .map(m => buildImg(m.publicUrl || m.url || m.image))
          .slice(0, 5); // Limit to top 5 for the slider

        setImages(validImages.length > 0 ? validImages : DUMMY_MEDIA);
      } catch (err) {
        setImages(DUMMY_MEDIA);
      }
    };
    fetchMedia();
  }, []);

  // 2. Auto-Scroll Logic
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* --- LEFT: MEDIA SLIDESHOW --- */}
        <div className="relative order-1 lg:order-1">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-neutral-900 group">
                
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="Event Moment"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* DOTS NAVIGATION */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex ? "w-8 bg-red-600" : "w-2 bg-white/30 hover:bg-white/60"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-red-600/40 rounded-tl-2xl -z-10" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-red-600/40 rounded-br-2xl -z-10" />
        </div>

        {/* --- RIGHT: TEAM TEXT --- */}
        <div className="text-center lg:text-left order-2 lg:order-2">
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block animate-pulse">
                The Force Behind
            </span>
            
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                Of the Students,<br />
                By the Students,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                    For the World.
                </span>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-8">
                <p>
                   TEDxSMEC is more than just an event; it is a movement fueled by the relentless energy of our student community.
                </p>
                <p>
                    Guided by visionary faculty and driven by passionate volunteers, we work around the clock to create a stage where <span className="text-white font-medium">ideas transcend boundaries</span>.
                </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link 
                    to="/team" 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/40 group"
                >
                    <Users size={20} />
                    <span>Meet the Team</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                    to="/gallery" 
                    className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white font-bold rounded-xl transition-all bg-white/5 hover:bg-white/10 hover:border-red-600/30"
                >
                    <span className="flex items-center justify-center gap-2">
                      <ImageIcon size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    <span>View Gallery</span>
                    </span>
                </Link>
            </div>
        </div>

      </div>
    </section>
  );
}