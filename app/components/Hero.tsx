"use client";
import { motion } from "framer-motion";
import { Train } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-railway-navy to-railway-blue text-white pt-16 pb-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <Train size={48} className="text-railway-orange" />
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
        >
          Your AI-Powered <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-railway-orange to-yellow-400">
            Railway Travel Assistant
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-railway-light max-w-2xl mx-auto"
        >
          Ask about trains, routes, delays, or travel tips. RailSathi AI is designed to make your journey across Indian Railways seamless and stress-free.
        </motion.p>
      </div>
    </div>
  );
}