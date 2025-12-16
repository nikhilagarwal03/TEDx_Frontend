import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mic2, BookOpen } from "lucide-react";

import tedxLogo from "../assets/tedx_logo.png";
import smecLogo from "../assets/smec_logo.jpeg";

const FeatureCard = ({ 
  title, 
  subtitle,
  description, 
  logoSrc, 
  link, 
  linkText, 
  isExternal, 
  variant, 
  Icon 
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`group relative flex flex-col justify-between h-full min-h-[420px] rounded-[2rem] p-8 md:p-10 overflow-hidden border transition-all duration-500 hover:-translate-y-2
      ${isDark 
        ? "bg-black border-red-900 hover:border-red-600 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.9)]" 
        : "bg-white/20 border-gray-200 hover:border-red-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
      }
    `}>
      
      {/* 1. Background Decor (Subtle & Abstract) */}
      <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
        ${isDark 
          ? "bg-gradient-to-br from-red-950/40 via-transparent to-transparent" 
          : "bg-gradient-to-br from-red-50/80 via-transparent to-transparent"
        }`} 
      />

      {/* 2. Top Section: Icon & Visible Logo */}
      <div className="relative z-10 flex justify-between items-start mb-8">
        {/* Animated Icon Box */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors duration-300
          ${isDark 
            ? "bg-white/5 border-white/10 text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600" 
            : "bg-gray-50 border-gray-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600"
          }`}>
          <Icon size={26} strokeWidth={2} />
        </div>

        {/* LOGO: Distinct and Visible */}
        <div className={`h-12 w-auto px-4 py-2 rounded-lg flex items-center justify-center backdrop-blur-sm border
           ${isDark ? "bg-white/10 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
          <img 
            src={logoSrc} 
            alt="Logo" 
            className="h-full w-auto object-contain" 
          />
        </div>
      </div>

      {/* 3. Text Content */}
      <div className="relative z-10 flex-grow">
        <span className={`block text-xs font-bold tracking-[0.2em] uppercase mb-3
          ${isDark ? "text-red-500" : "text-red-600"}`}>
          {subtitle}
        </span>
        
        <h3 className={`text-3xl md:text-4xl font-black mb-4 leading-tight
          ${isDark ? "text-red-600" : "text-red-700"}`}>
          {title}
        </h3>
        
        <p className={`text-base md:text-lg leading-relaxed mb-8 font-medium
          ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-white-500 group-hover:text-white-700"}`}>
          {description}
        </p>
      </div>

      {/* 4. Action Footer */}
      <div className="relative z-10 pt-6 mt-auto border-t border-solid border-opacity-20 
        ${isDark ? 'border-gray-700' : 'border-gray-300'}">
        {isExternal ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer" 
            className={`inline-flex items-center gap-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:gap-5
              ${isDark ? "text-white hover:text-red-500" : "text-black hover:text-red-600"}`}
          >
            {linkText} <ArrowRight size={18} />
          </a>
        ) : (
          <Link 
            to={link} 
            className={`inline-flex items-center gap-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:gap-5
              ${isDark ? "text-white hover:text-red-500" : "text-black hover:text-red-600"}`}
          >
            {linkText} <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Minimalist Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
            Two Forces 
            <span className="text-red-600"> One Vision</span>
          </h2>
          <div className="h-1 w-24 bg-red-600 rounded-full mb-6" />

        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD 1: TEDx (Dark Theme) */}
          <FeatureCard 
            variant="dark"
            subtitle="The Platform"
            title="Ideas Worth Spreading"
            description={
              <>
                A global movement finding its voice in our community. We curate talks that spark conversation, challenge conventions, and inspire deep connection among diverse minds.
              </>
            }
            logoSrc={tedxLogo}
            Icon={Mic2}
            link="/about"
            linkText="Discover Our Mission"
            isExternal={false}
          />

          {/* CARD 2: SMEC (White Theme) */}
          <FeatureCard 
            variant="light"
            subtitle="The Foundation"
            title="Excellence in Action"
            description={
              <>
                St. Martin's Engineering College provides the intellectual soil where innovation takes root. Fostering a culture where academic brilliance meets creative execution.
              </>
            }
            logoSrc={smecLogo}
            Icon={BookOpen}
            link="https://smec.ac.in"
            linkText="Visit SMEC Official"
            isExternal={true}
          />

        </div>
      </div>
    </section>
  );
}