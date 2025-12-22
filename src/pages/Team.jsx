import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

// --- DUMMY DATA FALLBACKS ---
const DUMMY_COORDINATORS = [
  { _id: "c1", name: "Dr. Anjali Sharma", designation: "Faculty Mentor", department: "Computer Science", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
  { _id: "c2", name: "Prof. Rajesh Verma", designation: "Faculty Advisor", department: "Electronics", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600" },
];

const DUMMY_ORGANIZERS = [
  { _id: "o1", name: "Aryan Gupta", role: "Lead Organizer", bio: "Passionate about bringing ideas to life.", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" },
  { _id: "o2", name: "Sneha Reddy", role: "Curator", bio: "Curating talks that inspire change.", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
  { _id: "o3", name: "Vikram Singh", role: "Tech Lead", bio: "Building the digital infrastructure.", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" },
  { _id: "o4", name: "Neha Patel", role: "Design Head", bio: "Crafting the visual identity of TEDx.", photo: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&q=80&w=600" },
];

export default function TeamPage() {
  const [coordinators, setCoordinators] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTeam = async () => {
      try {
        const [coordRes, orgRes] = await Promise.allSettled([
          api.get('/admin/coordinators/public/list'),
          api.get('/admin/organizers/public/list')
        ]);

        const extract = (res) => (res.status === 'fulfilled' && res.value?.data?.success)
          ? res.value.data.data
          : (res.value?.data || []);

        const fetchedCoords = extract(coordRes);
        const fetchedOrgs = extract(orgRes);

        setCoordinators(Array.isArray(fetchedCoords) && fetchedCoords.length > 0 ? fetchedCoords : DUMMY_COORDINATORS);
        setOrganizers(Array.isArray(fetchedOrgs) && fetchedOrgs.length > 0 ? fetchedOrgs : DUMMY_ORGANIZERS);

      } catch (err) {
        setCoordinators(DUMMY_COORDINATORS);
        setOrganizers(DUMMY_ORGANIZERS);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTeam();
  }, []);

  // "ID Card" Style Component
  const TeamCard = ({ member, type }) => {
    const role = member.role || member.designation || member.department || "Team Member";

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">

        <div className="group relative w-full h-[450px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-xl">
          {/* Full Height Image */}
          <div className="absolute inset-0">
            <img
              src={buildImg(member.photo)}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              onError={(e) => e.currentTarget.src = "https://placehold.co/600x800/222/FFF?text=TEDx+Member"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
          </div>

          {/* Info Slide Up */}
          <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-full" />

            <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{member.name}</h3>
            <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">{role}</p>

            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
              <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                {member.bio || `A dedicated ${type} contributing to the success of TEDxSMEC.`}
              </p>
              <div className="flex gap-4 pt-2 border-t border-white/10">
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>}
                {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>}
                {member.email && <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">LOADING TEAM...</div>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      <div className="bg-black min-h-screen pt-24 pb-20 px-6">

        <div className="max-w-7xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            The <span className="text-red-600">Force</span> Behind
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the visionaries and the executers working tirelessly to bring ideas to the stage.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-24">

          {/* 1. FACULTY COORDINATORS */}
          {coordinators.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                <span className="text-4xl font-black text-red-600 opacity-20">01</span>
                <h2 className="text-3xl font-bold text-white">Faculty Coordinators</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {coordinators.map((c, i) => <TeamCard key={c._id || i} member={c} type="Coordinator" />)}
              </div>
            </section>
          )}

          {/* 2. ORGANIZERS */}
          {organizers.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                <span className="text-4xl font-black text-red-600 opacity-20">02</span>
                <h2 className="text-3xl font-bold text-white">Organizing Team</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {organizers.map((o, i) => <TeamCard key={o._id || i} member={o} type="Organizer" />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}