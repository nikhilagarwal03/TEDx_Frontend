import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { buildImg } from "../utils";

// --- DUMMY DATA FALLBACK ---
const DUMMY_SPONSORS = [
  { _id: "spon-1", name: "TechVision", category: "Title Sponsor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
  { _id: "spon-2", name: "GiftBox", category: "Gifting Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
  { _id: "spon-3", name: "GreenEarth", category: "Eco Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
  { _id: "spon-4", name: "SoundWave", category: "Audio Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
  { _id: "spon-5", name: "PixelStudio", category: "Design Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
  { _id: "spon-6", name: "BrewMasters", category: "Beverage Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" }
];

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchSponsors = async () => {
      try {
        const res = await api.get("/sponsors");
        if (!mounted) return;
        const data = res.data?.success ? res.data.data : res.data;
        const list = Array.isArray(data) ? data : [];
        setSponsors(list.length > 0 ? list : DUMMY_SPONSORS);
      } catch (err) {
        if (mounted) setSponsors(DUMMY_SPONSORS);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSponsors();
    return () => { mounted = false; };
  }, []);

  const loopList = useMemo(() => {
    if (sponsors.length === 0) return [];
    // Duplicate 4 times for smooth continuous loop
    return [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  }, [sponsors]);

  if (loading) return null;

  return (
    <section id="sponsors" className="relative py-12 sm:py-16 md:py-20 bg-black overflow-hidden border-t border-white/10">
      
      {/* 1. HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-12 flex flex-col items-center text-center">
        <span className="eyebrow mb-3">Our Supporters</span>
        <h2 className="heading-section">Partners in <span className="text-white">Innovation</span></h2>
      </div>

      {/* 2. MARQUEE WRAPPER */}
      <div className="relative w-full overflow-hidden group py-6 z-10">
        
        {/* Side Gradients (To hide entrance/exit) */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* TRACK */}
        <div className="sponsor-track flex items-center w-max gap-4 sm:gap-6 md:gap-10">
          {loopList.map((sp, idx) => {
            const key = sp._id || `${sp.name}-${idx}`;
            const src = sp._id.startsWith("spon-") ? sp.logo : buildImg(sp.logo || sp.logoUrl);

            return (
              <div
                key={key}
                className="sponsor-item relative flex items-center justify-center 
                           w-40 h-24 sm:w-48 sm:h-28 md:w-64 md:h-36 
                           bg-white/30 backdrop-blur-sm
                           border border-white/10 rounded-xl
                           hover:border-red-600/50 hover:bg-white/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
                           transition-all duration-300 cursor-pointer"
              >
                
                {/* LOGO: Always 100% Opacity, Slight Brightness Boost */}
                <img
                  src={src}
                  alt={sp.name}
                  className="max-h-10 sm:max-h-12 md:max-h-16 max-w-[70%] sm:max-w-[75%] object-contain 
                             opacity-100 brightness-110 filter drop-shadow-lg
                             transform hover:scale-105 transition-transform duration-300"
                />

                {/* Category Label (Always Visible, subtle) */}
                <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover:text-red-500 transition-colors">
                  {sp.category || "Partner"}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CTA */}
      <div className="relative z-10 mt-8 text-center">
        <Link 
          to="/sponsors" 
          className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs font-black text-white uppercase tracking-widest hover:bg-red-600/10 transition-all"
        >
          Become a Sponsor
        </Link>
      </div>

      <style>{`
        .sponsor-track {
          animation: marquee 50s linear infinite;
        }
        
        /* Pause on hover */
        .group:hover .sponsor-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        @media (max-width: 768px) {
          .sponsor-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}