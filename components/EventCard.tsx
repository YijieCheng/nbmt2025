import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EventData } from '../types';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';

interface EventCardProps {
  data: EventData;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div 
      ref={cardRef} 
      className={`relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto py-24 px-4 md:px-8 gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Central Connector Dot (Visible on Desktop) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center z-20">
         <motion.div 
            style={{ scale: scrollYProgress, opacity }}
            className="w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-xl"
         />
      </div>

      {/* Text Content */}
      <motion.div 
        style={{ y, opacity }}
        className={`flex-1 w-full text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}
      >
        <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          <TrendingUp size={14} />
          {data.category}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
          {data.title}
        </h2>
        
        {data.dateRange && (
          <div className={`flex items-center gap-2 text-slate-500 mb-6 font-medium ${isEven ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
            <Calendar size={18} />
            <span>{data.dateRange}</span>
          </div>
        )}

        <p className="text-slate-600 leading-relaxed text-lg mb-8">
          {data.description}
        </p>

        {/* Stats Grid */}
        {data.stats && (
          <div className={`grid grid-cols-2 gap-4 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} max-w-md`}>
            {data.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="text-2xl md:text-3xl font-black text-orange-600 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Image Content */}
      <motion.div 
        style={{ scale: scrollYProgress, opacity }}
        className="flex-1 w-full"
      >
        <div className={`relative group overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] md:aspect-[16/9] ${isEven ? 'origin-left' : 'origin-right'}`}>
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-2">
            <MapPin size={14} className="text-orange-600" />
            Ningbo, China
          </div>
        </div>
      </motion.div>
    </div>
  );
};