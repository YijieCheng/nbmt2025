import React, { useRef } from 'react';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { OverviewMap } from './components/OverviewMap';
import { EVENTS } from './constants';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero />
      
      {/* New Automatic Route Map Section */}
      <OverviewMap />

      <main ref={containerRef} className="relative pb-32 overflow-hidden">
        
        {/* The Timeline "Footprint" Path */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 h-full bg-slate-200 z-0">
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="w-full h-full bg-gradient-to-b from-orange-500 via-red-500 to-orange-500"
          />
        </div>

        {/* Section Heading */}
        <div className="relative z-10 text-center py-20">
          <div className="inline-block bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm mb-4">
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Deep Dive</span>
          </div>
          <h3 className="text-4xl font-serif text-slate-800">Detailed Milestones</h3>
        </div>

        {/* Events Loop */}
        <div className="flex flex-col gap-0">
          {EVENTS.map((event, index) => (
            <EventCard key={event.id} data={event} index={index} />
          ))}
        </div>

        {/* Ending Node */}
        <div className="relative z-10 flex justify-center mt-12">
            <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                2026
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold mb-2">宁波会展旅业</h4>
                <p className="text-slate-400 text-sm">Building a world-class exhibition and tourism destination.</p>
            </div>
            <div className="flex gap-6 text-slate-400 text-sm">
                <span>© 2025 Ningbo Convention & Exhibition.</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;