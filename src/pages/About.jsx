import React from "react";
import { Link } from "react-router-dom";
import { 
  Lightbulb, Quote, School, 
  Globe, Rocket, Heart 
} from "lucide-react";
import ContactSection from "../components/ContactSection";

// --- LEADERSHIP DATA ---
const LEADERSHIP = [
  {
    role: "Chairman",
    name: "Sri. M. Laxman Reddy",
    image: "https://smec.ac.in/assets/images/chairman.jpg", 
    quote: "We are not just building engineers; we are shaping the thought leaders of tomorrow."
  },
  {
    role: "Executive Director",
    name: "Sri. G. Chandrasekhar Yadav",
    image: "https://smec.ac.in/assets/images/ed.jpg", 
    quote: "Innovation begins when we allow young minds to question the impossible."
  },
  {
    role: "Principal",
    name: "Dr. K. Ravindra",
    image: "https://smec.ac.in/assets/images/principal.jpg", 
    quote: "TEDxSMEC is the bridge between academic excellence and global perspective."
  }
];

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-red-900/30">
      <main className="pt-24 md:pt-32 pb-20">
        
        {/* 1. HERO: The Pitch */}
        <section className="relative px-6 pb-20 pt-10 text-center max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
            Our Shared Vision
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Future of Ideas.</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            TEDxSMEC represents the powerful union of St. Martin's Engineering College and the global TED movement. We are creating a stage where technical brilliance meets human storytelling.
          </p>
        </section>

        {/* 2. THE SYNERGY (Visual Split) */}
        <section className="py-20 bg-neutral-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: The Narrative */}
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Why We <span className="text-red-600">Exist</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  At <span className="text-white font-medium">St. Martin's Engineering College (SMEC)</span>, we have always championed academic rigour and research. But we believe that true innovation requires more than just technical skills—it requires the ability to dream, articulate, and inspire.
                </p>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  By bringing <span className="text-white font-medium">TEDx</span> to our campus, we are opening a gateway for our students and faculty to connect with the world. We are moving beyond the classroom to answer the diverse challenges of our time with creativity and courage.
                </p>
              </div>

              {/* Stats / Quick Facts */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                 <div>
                    <h4 className="text-2xl md:text-3xl font-black text-white">Global</h4>
                    <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Platform</span>
                 </div>
                 <div>
                    <h4 className="text-2xl md:text-3xl font-black text-white">Local</h4>
                    <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Impact</span>
                 </div>
              </div>
            </div>

            {/* Right: Visual Representation */}
            <div className="relative h-[400px] w-full bg-black rounded-3xl overflow-hidden border border-white/10 group order-1 lg:order-2">
               {/* Background Image */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
               
               {/* Overlay Content */}
               <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-red-600/90 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                    <Lightbulb size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ideas Worth Spreading</h3>
                  <p className="text-white/80 text-sm max-w-xs">From the labs of SMEC to the global stage.</p>
               </div>
            </div>

          </div>
        </section>

        {/* 3. THE PILLARS (Why Collaborate?) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join the <span className="text-red-600">Innovation Wave</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              We invite visionaries, industry leaders, and creators to collaborate with us. Here is what we stand for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">A Global Stage</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                TEDx talks are shared with millions online. Collaborating with us means putting your ideas and your brand on a globally recognized platform for excellence.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
                <Rocket size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Fueling Innovation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                SMEC is a hub for patents, projects, and startups. We don't just talk about the future; we build it. Join a community that is actively shaping tomorrow.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Community Impact</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We are student-led and faculty-guided. Your involvement directly empowers the next generation of engineers, artists, and leaders.
              </p>
            </div>

          </div>
        </section>

        {/* 4. LEADERSHIP (Patrons) */}
        <section className="py-20 bg-neutral-900/20 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-red-600 font-bold tracking-widest uppercase text-[10px] mb-2 block">
                  The Patrons
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Leadership & <span className="text-red-600">Guidance</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {LEADERSHIP.map((leader, idx) => (
                  <div key={idx} className="group bg-black border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-300">
                     <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-white/10 p-1 group-hover:border-red-600 transition-colors">
                           <img 
                             src={leader.image} 
                             alt={leader.name} 
                             className="w-full h-full object-cover rounded-full bg-neutral-800 grayscale group-hover:grayscale-0 transition-all duration-500"
                             onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Leader"} 
                           />
                        </div>
                        
                        <h4 className="text-lg font-bold text-white text-center">{leader.name}</h4>
                        <span className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-4">{leader.role}</span>
                        
                        <div className="relative w-full">
                          <Quote size={16} className="text-white/20 absolute top-0 left-0" />
                          <p className="text-gray-400 text-xs italic text-center px-6 pt-2 leading-relaxed">
                            {leader.quote}
                          </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </section>

      </main>

      <ContactSection />
    </div>
  );
}