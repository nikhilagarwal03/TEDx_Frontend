import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Mic2, Users, ChevronDown, Calendar } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

// --- DUMMY DATA (Fallback) ---
const DUMMY_EVENTS = [
  {
    _id: "evt-1",
    slug: "echoes-of-innovation",
    name: "Echoes of Innovation",
    date: new Date(Date.now() + 864000000).toISOString(), // +10 days
    venue: "Grand Auditorium",
    description: "Exploring how past reverberations shape our future technologies.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
  },
  {
    _id: "evt-2",
    slug: "sustainable-horizons",
    name: "Sustainable Horizons",
    date: new Date(Date.now() + 1728000000).toISOString(), // +20 days
    venue: "Green Park Center",
    description: "A deep dive into eco-friendly architecture and living.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    _id: "evt-3",
    slug: "ai-revolution",
    name: "The AI Revolution",
    date: new Date(Date.now() + 2592000000).toISOString(), // +30 days
    venue: "Tech Hub Main Hall",
    description: "Understanding the impact of Generative AI on creative industries.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
  },
  {
    _id: "evt-4",
    slug: "future-med",
    name: "Future of Medicine",
    date: new Date(Date.now() + 3456000000).toISOString(), // +40 days
    venue: "Health Sciences Block",
    description: "Robotics, gene editing, and the new frontier of healthcare.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch Data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const data = res.data?.success ? res.data.data : res.data;
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(DUMMY_EVENTS);
        }
      } catch (err) {
        console.warn("Events API failed, switching to fallback data.", err);
        setEvents(DUMMY_EVENTS);
      }
    };
    fetchEvents();
  }, []);

  // 2. Filter & Sort (Upcoming Only)
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // 3. Logic for "Show 1 on Mobile, 2 on Desktop"
  // If NOT expanded, we take the top 2. 
  // We will handle the "1 on mobile" visibility via CSS classes in the render loop.
  const visibleEvents = isExpanded ? upcomingEvents : upcomingEvents.slice(0, 2);
  const hasHiddenEvents = upcomingEvents.length > 2; // Check if we actually have more events to show

  const StatItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center text-center p-4 border border-white/10 rounded-lg bg-neutral-900/50 backdrop-blur">
      <Icon className="text-red-600 mb-2" size={24} />
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs uppercase tracking-widest text-gray-400">{label}</span>
    </div>
  );

  return (
    <section className="relative bg-black py-24 overflow-hidden min-h-[80vh]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm block mb-2 text-center md:text-left">
              Mark Your Calendars
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Upcoming <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Experiences</span>
            </h2>
          </div>
          <div className="flex gap-4 justify-center md:justify-start w-full md:w-auto">
            <StatItem icon={Mic2} label="Speakers" value="20+" />
            <StatItem icon={Users} label="Attendees" value="500+" />
          </div>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <AnimatePresence>
            {visibleEvents.map((event, idx) => {
               const banner = buildImg(event.banner || event.image);
               const date = new Date(event.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
               
               // LOGIC: If collapsed (!isExpanded) and this is the 2nd item (index 1),
               // hide it on mobile (hidden) but show on desktop (md:block).
               // If isExpanded is true, we show everything everywhere.
               const mobileVisibilityClass = (!isExpanded && idx === 1) ? "hidden md:block" : "block";

               return (
                 <motion.div 
                   key={event._id || idx}
                   layout // smooth layout transition when list expands
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.3 }}
                   onClick={() => navigate(`/events/${event.slug || event._id}`)}
                   className={`group relative h-[400px] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-red-600/50 transition-all duration-300 ${mobileVisibilityClass}`}
                 >
                   {/* Image */}
                   <img src={banner} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-3 text-red-500 text-sm font-bold uppercase tracking-wider">
                          <span className="bg-red-600 text-white px-2 py-1 rounded-sm flex items-center gap-1">
                            <Calendar size={12} /> {date}
                          </span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue || "TBA"}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 leading-none">{event.name}</h3>
                        <p className="text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {event.description}
                        </p>
                        <button className="flex items-center gap-2 text-white font-semibold group-hover:text-red-500 transition-colors">
                          View Details <ArrowRight size={18} />
                        </button>
                      </div>
                   </div>
                 </motion.div>
               )
            })}
          </AnimatePresence>
        </div>

        {/* EXPAND / BLURRED TRIGGER AREA */}
        {!isExpanded && (hasHiddenEvents || upcomingEvents.length > 1) && (
          <div className="relative mt-8 flex justify-center">
            {/* Gradient Fade to make it look like content continues */}
            <div className="absolute bottom-full w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            
            <button 
              onClick={() => setIsExpanded(true)}
              className="group relative flex flex-col items-center gap-2 px-8 py-4"
            >
              {/* Blurred Backdrop Circle */}
              <div className="absolute inset-0 bg-red-600/10 backdrop-blur-md rounded-full border border-red-600/30 group-hover:bg-red-600/20 transition-all duration-300" />
              
              <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-red-500 group-hover:text-red-400 transition-colors">
                View All Upcoming Events 
              </span>
              <ChevronDown className="relative z-10 text-white animate-bounce mt-1" size={24} />
            </button>
          </div>
        )}
        
        {/* COLLAPSE BUTTON (Optional, appears when list is full) */}
        {isExpanded && (
           <div className="mt-8 text-center">
             <button 
               onClick={() => setIsExpanded(false)}
               className="text-gray-500 hover:text-white text-sm uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
             >
               Show Less <ChevronDown className="rotate-180" size={16} />
             </button>
           </div>
        )}

      </div>
    </section>
  );
}