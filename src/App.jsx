// frontend/src/App.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderFinish = () => {
    setLoading(false);
  };

  if (loading) {
    return <Preloader onFinish={handlePreloaderFinish} />;
  }

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const navbarHeight = document.getElementById("navbar")?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-tedx-red/30">
      <Navbar onNavigate={handleNavigate} id="navbar" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
