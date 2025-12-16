import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Ticket, ArrowLeft, ArrowRight, PlayCircle,
  Linkedin, Twitter, Share2, Info 
} from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

// --- EXTENDED DUMMY DATA (Includes Past Events for Fallback) ---
const DUMMY_EVENTS = [
  // 1. UPCOMING EVENT
  {
    _id: "evt-1",
    slug: "echoes-of-innovation",
    name: "Echoes of Innovation",
    date: new Date(Date.now() + 864000000).toISOString(), // Future
    venue: "Grand Auditorium",
    price: "Rs. 999",
    status: "upcoming",
    description: `Join us for a transformative evening where we explore the subtle yet powerful reverberations of past innovations on our future.`,
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
    speakers: [
      { _id: "spk-1", name: "Dr. Elena Rostova", designation: "AI Ethicist", bio: "Leading researcher in ethical AI.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
    ],
    agenda: [{ time: "10:00 AM", title: "Opening Remarks" }]
  },
  // 2. PAST EVENT
  {
    _id: "evt-3",
    slug: "digital-frontiers",
    name: "Digital Frontiers",
    date: new Date(Date.now() - 864000000).toISOString(), // Past
    venue: "Tech Hub",
    price: "₹499",
    status: "past",
    description: "Navigating the complexities of the metaverse and AI. This event brought together industry leaders to discuss the next phase of the internet.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    videoUrl: "https://youtube.com", // Example video link
    speakers: [
       { _id: "spk-3", name: "Sarah Jenkins", designation: "Digital Anthropologist", bio: "Studying human behavior in the metaverse.", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" }
    ]
  }
];

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${slug}`);
        const data = res.data?.success ? res.data.data : res.data;
        if (data) setEvent(data);
        else throw new Error("No data returned");
      } catch (err) {
        console.warn("Event API failed, searching fallback data...", err);
        // Fallback Search (Supports both ID and Slug)
        const found = DUMMY_EVENTS.find(e => e.slug === slug || e._id === slug);
        if (found) setEvent(found);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-red-600 font-bold tracking-widest animate-pulse">LOADING EXPERIENCE...</div>
    </div>
  );

  if (!event) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <button onClick={() => navigate('/events')} className="text-red-500 hover:underline">Return to Calendar</button>
    </div>
  );

  // Logic to determine if event is past
  const isUpcoming = new Date(event.date) > new Date();
  const banner = buildImg(event.banner || event.image);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-black min-h-screen text-white pb-24 font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={banner} 
            alt={event.name} 
            className={`w-full h-full object-cover scale-105 ${!isUpcoming ? 'grayscale-[50%]' : ''}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
        
        <div className="absolute top-24 left-6 z-20">
          <button 
            onClick={() => navigate('/events')} 
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-sm font-bold hover:bg-red-600 hover:border-red-600 transition-all duration-300"
          >
            <ArrowLeft size={16} /> Back to Calendar
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 pb-12 pt-32 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="mb-6 flex items-center gap-3">
               <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${isUpcoming ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
                 {isUpcoming ? "Registration Open" : "Event Concluded"}
               </span>
               {event.venue && (
                 <span className="flex items-center gap-1 text-sm font-semibold text-gray-300">
                    <MapPin size={14} className="text-red-500" /> {event.venue}
                 </span>
               )}
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight max-w-4xl shadow-black drop-shadow-lg">
              {event.name}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-lg font-medium text-gray-200 border-t border-white/10 pt-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <Calendar className="text-red-600" size={24} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-red-600" size={24} />
                <span>{formattedTime}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Details */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className={`w-1.5 h-8 rounded-full ${isUpcoming ? 'bg-red-600' : 'bg-gray-600'}`}></span> 
              About the Event
            </h2>
            <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </section>

          {event.speakers && event.speakers.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className={`w-1.5 h-8 rounded-full ${isUpcoming ? 'bg-red-600' : 'bg-gray-600'}`}></span> 
                Meet the Speakers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {event.speakers.map((speaker, idx) => (
                  <div key={speaker._id || idx} className="group bg-neutral-900 border border-white/5 rounded-xl p-6 hover:border-red-600/30 transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <img 
                          src={buildImg(speaker.photo)} 
                          alt={speaker.name} 
                          className={`w-20 h-20 rounded-lg object-cover border-2 transition-all ${isUpcoming ? 'border-transparent group-hover:border-red-600' : 'border-gray-800 grayscale'}`} 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1 border border-white/10">
                           <Linkedin size={12} className="text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{speaker.name}</h4>
                        <p className="text-red-500 text-sm font-semibold uppercase tracking-wide mb-2">{speaker.designation}</p>
                        <p className="text-sm text-gray-400 line-clamp-2">{speaker.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {event.agenda && (
             <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className={`w-1.5 h-8 rounded-full ${isUpcoming ? 'bg-red-600' : 'bg-gray-600'}`}></span> 
                  Agenda
                </h2>
                <div className="space-y-4 border-l-2 border-white/10 ml-3 pl-8 relative">
                   {event.agenda.map((item, i) => (
                     <div key={i} className="relative">
                        <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-black border-2 ${isUpcoming ? 'border-red-600' : 'border-gray-600'}`} />
                        <span className="text-red-500 font-mono text-sm block mb-1">{item.time}</span>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                     </div>
                   ))}
                </div>
             </section>
          )}
        </div>

        {/* RIGHT: Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            
            <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className={`h-2 w-full ${isUpcoming ? 'bg-red-600' : 'bg-gray-600'}`} />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Ticket Price</p>
                     <p className="text-3xl font-black text-white mt-1">{event.price || "Free"}</p>
                   </div>
                   <div className="bg-white/5 p-2 rounded-lg">
                      <Ticket className={isUpcoming ? "text-red-500" : "text-gray-500"} size={24} />
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">{event.venue || "Venue TBA"}</span>
                  </div>
                </div>

                {isUpcoming ? (
                  // UPCOMING: BOOK BUTTON
                  <button 
                    onClick={() => navigate(`/events/${event.slug || event._id || event.id}/book`)}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg uppercase tracking-wider transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  // PAST: RECORDING OR DISABLED BUTTON
                  event.videoUrl ? (
                    <a 
                      href={event.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <PlayCircle size={18} className="text-red-600" />
                      <span>Watch Recording</span>
                    </a>
                  ) : (
                    <button disabled className="w-full py-4 bg-neutral-800 text-gray-500 font-bold rounded-lg uppercase tracking-wider cursor-not-allowed border border-white/5">
                      Event Concluded
                    </button>
                  )
                )}
                
                {isUpcoming && (
                  <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <Info size={12} /> Limited capacity event
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-neutral-900 border border-white/10 hover:bg-white hover:text-black hover:border-white p-3 rounded-lg transition-all flex justify-center items-center text-gray-400">
                <Share2 size={20} />
              </button>
              <button className="flex-1 bg-neutral-900 border border-white/10 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] p-3 rounded-lg transition-all flex justify-center items-center text-gray-400">
                <Twitter size={20} />
              </button>
              <button className="flex-1 bg-neutral-900 border border-white/10 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] p-3 rounded-lg transition-all flex justify-center items-center text-gray-400">
                <Linkedin size={20} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}