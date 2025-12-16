import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api";
import { buildImg } from "../utils";
import { Instagram, Linkedin, Twitter, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Fallback Data
const DUMMY_SPEAKER = [
  {
    id: "dummy-virat",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-2",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-3",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-4",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-5",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-6",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  }
];

const SpeakerSkeleton = () => (
  <div className="min-w-full sm:min-w-[50%] lg:min-w-[calc(25%-18px)] snap-center">
    <div className="relative h-[450px] rounded-xl bg-neutral-900 border border-white/5 overflow-hidden animate-pulse">
      <div className="w-full h-full bg-neutral-800/50" />
      <div className="absolute bottom-0 left-0 w-full p-6 space-y-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="w-12 h-1 bg-neutral-700 rounded" />
        <div className="h-8 w-3/4 bg-neutral-700 rounded" />
        <div className="h-4 w-1/2 bg-neutral-700 rounded" />
      </div>
    </div>
  </div>
);

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSpeakers = async () => {
      try {
        const endpoints = ["/admin/speakers/public/list", "/speakers"];
        let data = [];
        let success = false;

        for (const ep of endpoints) {
          try {
            const res = await api.get(ep);
            if (res.data?.success) {
              data = res.data.data;
              success = true;
              break;
            } else if (Array.isArray(res.data)) {
              data = res.data;
              success = true;
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (isMounted) {
          const list = Array.isArray(data) ? data : (data?.list || []);
          if (list.length > 0) {
            setSpeakers(list);
          } else {
            // API worked but returned empty -> Show Dummy
            setSpeakers(DUMMY_SPEAKER);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load speakers", err);
        if (isMounted) {
          // API Failed completely -> Show Dummy
          setSpeakers(DUMMY_SPEAKER);
          setLoading(false);
        }
      }
    };

    fetchSpeakers();
    return () => { isMounted = false; };
  }, []);

  const getSocial = (speaker, key) => {
    if (!speaker) return undefined;
    const sl = speaker.socialLinks || {};
    return sl[key] || speaker[key] || speaker[`${key}Url`] || null;
  };

  // Scroll Handlers
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -el.offsetWidth : el.offsetWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Card renderer (shared between carousel and grid)
  const renderCard = (speaker, idx, clickable = true) => {
    const img = speaker.id === 'dummy-virat' ? speaker.photo : buildImg(speaker.photo || speaker.imageUrl || speaker.image);
    const id = speaker._id || speaker.id || speaker.slug || idx;
    const linkedin = getSocial(speaker, "linkedin");
    const instagram = getSocial(speaker, "instagram");
    const twitter = getSocial(speaker, "twitter");

    const handleActivate = (e) => {
      if (!clickable) return;
      if (id !== 'dummy-virat') window.location.href = `/speakers/${id}`;
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate(e);
      }
    };

    return (
      <div 
        key={id || idx}
        className="min-w-[90%] sm:min-w-[48%] lg:min-w-[23%] snap-center flex-shrink-0"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          role={clickable ? 'link' : undefined}
          tabIndex={clickable ? 0 : -1}
          onKeyDown={onKeyDown}
          className="group relative h-[380px] overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/5 hover:border-red-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-red-700/30"
          onClick={handleActivate}
          aria-label={`Open speaker ${speaker.name}`}
        >
          {/* Image Layer */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <img
              src={img}
              alt={speaker.name}
              loading="lazy"
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/400x600?text=TEDx+Speaker";
              }}
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

          {/* Socials */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {[
              { icon: Linkedin, link: linkedin },
              { icon: Twitter, link: twitter },
              { icon: Instagram, link: instagram }
            ].map((social, i) => social.link && (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label={`Open ${speaker.name}'s ${social.link.includes('instagram') ? 'Instagram' : social.link.includes('linkedin') ? 'LinkedIn' : 'Twitter'}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Text */}
          <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-12 h-1 bg-red-600 mb-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
              {speaker.name?.split(" ")[0]}
              <span className="block text-red-600/80 group-hover:text-white transition-colors">
                {speaker.name?.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            <p className="text-sm font-medium text-gray-300 line-clamp-2">
              {speaker.designation}
            </p>
          </div>

        </motion.div>
      </div>
    );
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              The Lineup
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Speakers</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Scroll Buttons (visible on mobile carousel only) */}
            <div className="flex md:hidden gap-2">
              <button 
                onClick={() => scroll("left")}
                className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/speakers"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                aria-label="View all speakers"
              >
                View All Speakers
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal carousel (touch/swipe) */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Speakers carousel"
          >
            {loading ? (
              <>
                <SpeakerSkeleton />
                <SpeakerSkeleton />
                <SpeakerSkeleton />
                <SpeakerSkeleton />
              </>
            ) : (
              speakers.map((speaker, idx) => renderCard(speaker, idx))
            )}
          </div>
        </div>

        {/* Desktop: responsive grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {loading ? (
            <>
              <SpeakerSkeleton />
              <SpeakerSkeleton />
              <SpeakerSkeleton />
              <SpeakerSkeleton />
            </>
          ) : (
            speakers.map((speaker, idx) => (
              <div key={speaker._id || speaker.id || idx} className="w-full">
                {renderCard(speaker, idx, false)}
              </div>
            ))
          )}
        </div>
        
        {/* Mobile Swipe Indicator (Optional) */}
        <div className="md:hidden flex justify-center mt-4 gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">Swipe to explore</span>
        </div>

      </div>
    </section>
  );
}