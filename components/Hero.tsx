import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/1015/1920/1080" 
          alt="Ningbo City" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/50 to-slate-900" />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-orange-500 tracking-[0.2em] text-sm md:text-lg font-bold mb-4 uppercase">
            Ningbo Convention & Exhibition Tourism
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            2025
          </span>
          <span className="serif italic font-normal text-white">Milestones</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          能级跃升 · 业态精进 · 构筑新生态
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.2, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        className="absolute bottom-12 z-10"
      >
        <ArrowDown className="w-8 h-8 text-orange-500" />
      </motion.div>
    </section>
  );
};