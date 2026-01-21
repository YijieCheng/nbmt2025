import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS } from '../constants';
import { Calendar, ChevronRight, Zap } from 'lucide-react';

// Adjusted coordinates for a more dramatic, irregular path (High peaks, low valleys)
const POINTS = [
  { x: 10, y: 75 }, 
  { x: 38, y: 25 }, 
  { x: 62, y: 70 }, 
  { x: 92, y: 30 }, 
];

// Increased particle count and speed for more energy
const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 5, // Faster movement
}));

export const OverviewMap: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Faster auto-cycle (5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EVENTS.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  // SVG Path calculation
  const p = POINTS.map(pt => ({ x: pt.x * 10, y: pt.y * 5 }));
  // Smoother, but more irregular cubic bezier curves
  const pathD = `M ${p[0].x} ${p[0].y} 
                 C ${p[0].x + 150} ${p[0].y - 50}, ${p[1].x - 150} ${p[1].y + 50}, ${p[1].x} ${p[1].y} 
                 S ${p[2].x - 100} ${p[2].y - 50}, ${p[2].x} ${p[2].y} 
                 S ${p[3].x - 150} ${p[3].y + 50}, ${p[3].x} ${p[3].y}`;

  return (
    <section className="relative w-full h-[85vh] bg-[#020617] overflow-hidden flex flex-col items-center justify-center border-b border-slate-900/50">
      
      {/* 1. Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-orange-400/20 blur-[1px]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -150, 0], // Larger movement range
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {/* Dynamic Spotlights */}
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="absolute top-10 left-0 right-0 text-center z-20 pointer-events-none">
        <h3 className="text-orange-400 tracking-[0.6em] uppercase text-[10px] font-bold mb-2 opacity-80 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-orange-500/50"></span>
            2025 Vision
            <span className="w-8 h-[1px] bg-orange-500/50"></span>
        </h3>
        <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 italic drop-shadow-xl">
            Strategic Footprint
        </h2>
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-7xl aspect-[2/1] px-4 md:px-12 mt-12">
        
        {/* SVG Layer */}
        <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
              <stop offset="50%" stopColor="#fb923c" stopOpacity="1" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#ea580c" stopOpacity="1" />
               <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base Track */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="2" 
            strokeDasharray="6 8"
            strokeLinecap="round"
            className="opacity-40"
          />

          {/* 2. Fast Traveling Energy Pulse (Comet) */}
          <motion.path 
            d={pathD} 
            fill="none" 
            stroke="url(#activeGradient)" 
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathOffset: 1, pathLength: 0.15 }}
            animate={{ pathOffset: 0 }}
            transition={{ 
                duration: 2.5, // Much faster
                ease: "linear",
                repeat: Infinity 
            }}
            style={{ filter: 'blur(3px)' }}
          />
          
          {/* Main Progress Line filling up */}
          <motion.path 
            d={pathD} 
            fill="none" 
            stroke="#ea580c" 
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: (activeIndex + 1) / EVENTS.length }} // Fills up to current point
            transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
            }}
          />
          
          {/* Vertical Connecting Lines */}
          {POINTS.map((pt, i) => (
            <g key={`line-group-${i}`}>
             {/* Base dim line */}
             <line 
                x1={pt.x * 10} y1={pt.y * 5}
                x2={pt.x * 10} y2={500}
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="2 4"
             />
             {/* Active bright line */}
             <motion.line
                x1={pt.x * 10} y1={pt.y * 5}
                x2={pt.x * 10} y2={500}
                stroke="url(#verticalGradient)"
                strokeWidth="2"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                    opacity: activeIndex === i ? 0.8 : 0,
                    pathLength: activeIndex === i ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
             />
             {/* Scanning Laser Effect on active line */}
             {activeIndex === i && (
                <motion.circle 
                    r="3" 
                    fill="#fff"
                    initial={{ cy: pt.y * 5 }}
                    animate={{ cy: 500 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    cx={pt.x * 10}
                    className="blur-[2px]"
                />
             )}
            </g>
          ))}
        </svg>

        {/* Nodes & Popups Layer */}
        {EVENTS.map((event, index) => {
          const isActive = index === activeIndex;
          const pos = POINTS[index];
          
          return (
            <div 
              key={event.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {/* Node Point */}
              <div className="relative flex items-center justify-center cursor-pointer" onClick={() => setActiveIndex(index)}>
                {/* Energetic Ripple */}
                <AnimatePresence>
                    {isActive && (
                        <>
                            <motion.div 
                                initial={{ scale: 0.5, opacity: 1 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute w-8 h-8 rounded-full border border-orange-400/80 shadow-[0_0_15px_#ea580c]"
                            />
                        </>
                    )}
                </AnimatePresence>

                <motion.div 
                  animate={{ 
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? '#fff' : '#0f172a',
                    borderColor: isActive ? '#ea580c' : '#475569',
                    boxShadow: isActive ? '0 0 20px rgba(234,88,12,0.6)' : 'none'
                  }}
                  className="w-4 h-4 rounded-full border-2 z-20 transition-all duration-300 relative"
                />
              </div>

              {/* 3. Floating, Lively Card */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }} // Snappy entry
                    className={`absolute z-30 w-[300px] md:w-[380px] h-60 md:h-72 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/20 backdrop-blur-md
                        ${pos.y > 50 ? 'bottom-14 md:bottom-16' : 'top-14 md:top-16'} 
                        -left-[150px] md:-left-[190px]
                    `}
                  >
                     {/* Floating Animation Wrapper */}
                     <motion.div
                        className="w-full h-full relative"
                        animate={{ y: [0, -8, 0] }} // Gentle floating
                        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                     >
                        {/* Image Background */}
                        <div className="absolute inset-0 z-0 bg-slate-900">
                            <motion.img 
                                src={event.imageUrl} 
                                alt={event.title} 
                                className="w-full h-full object-cover opacity-90"
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 5 }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
                            
                            {/* Glass Reflection Sweep */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                initial={{ x: '-150%' }}
                                animate={{ x: '150%' }}
                                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Content Container */}
                        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-7 text-left">
                            
                            {/* Decorative number */}
                            <div className="absolute top-2 right-4 text-7xl font-serif font-black text-white/5 select-none z-0">
                                {index + 1}
                            </div>

                            {/* Top Meta Tags */}
                            <div className="flex items-center gap-2 mb-3 z-10">
                                <span className="bg-orange-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(234,88,12,0.4)] border border-orange-400/30">
                                    {event.category}
                                </span>
                                {event.dateRange && (
                                    <span className="text-[10px] text-slate-300 flex items-center gap-1 font-mono bg-black/50 px-2 py-0.5 rounded border border-white/10">
                                        <Calendar size={10} className="text-orange-400" />
                                        {event.dateRange.split(' ')[0]}
                                    </span>
                                )}
                            </div>

                            <h4 className="text-white font-bold text-lg md:text-2xl leading-tight mb-2 drop-shadow-lg font-serif z-10">
                                {event.title}
                            </h4>
                            
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light pl-2 border-l-2 border-orange-500 z-10">
                                {event.description}
                            </p>

                            <div className="mt-3 flex justify-end z-10">
                                <motion.div 
                                    className="flex items-center gap-1 text-[10px] text-orange-400 uppercase tracking-widest cursor-pointer"
                                    whileHover={{ x: 5, color: '#fb923c' }}
                                >
                                    View Details <ChevronRight size={12} />
                                </motion.div>
                            </div>
                        </div>

                        {/* Progress Line */}
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-600 to-yellow-500 z-20"
                        />
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Manual Controls */}
      <div className="absolute bottom-10 flex items-center gap-4 z-20">
        {EVENTS.map((_, i) => (
            <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative flex items-center justify-center p-2"
            >
                <div className={`
                    rounded-full transition-all duration-300
                    ${activeIndex === i ? 'w-4 h-4 bg-orange-500 shadow-[0_0_15px_#ea580c]' : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'}
                `} />
                {activeIndex === i && (
                    <motion.div 
                        layoutId="activeIndicator"
                        className="absolute w-8 h-8 rounded-full border border-orange-500/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </button>
        ))}
      </div>

    </section>
  );
};