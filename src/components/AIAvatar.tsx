'use client';

import { motion } from 'framer-motion';

export function AIAvatar({ isSpeaking, isThinking }: { isSpeaking: boolean; isThinking: boolean }) {
  return (
    <div className="relative">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isSpeaking ? {
          boxShadow: [
            '0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(139,92,246,0.1)',
            '0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(59,130,246,0.2)',
            '0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(139,92,246,0.1)',
          ],
          scale: [1, 1.05, 1],
        } : {
          boxShadow: '0 0 20px rgba(59,130,246,0.2)',
          scale: 1,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Avatar circle */}
      <motion.div
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center overflow-hidden"
        animate={isThinking ? { rotate: 360 } : { rotate: 0 }}
        transition={isThinking ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
      >
        {/* Inner gradient overlay */}
        <div className="absolute inset-1 rounded-full bg-[#0F172A] flex items-center justify-center">
          {/* AI Face */}
          <div className="relative">
            {/* Eyes */}
            <div className="flex gap-3 mb-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={isSpeaking ? { scaleY: [1, 0.5, 1] } : isThinking ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={isSpeaking ? { scaleY: [1, 0.5, 1] } : isThinking ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
              />
            </div>
            {/* Mouth - sound wave when speaking */}
            <div className="flex items-center justify-center gap-0.5 h-3">
              {isSpeaking ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                    animate={{ height: ['2px', `${8 + Math.random() * 8}px`, '2px'] }}
                    transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))
              ) : isThinking ? (
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-purple-400"
                      animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-4 h-0.5 rounded-full bg-blue-400/50" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Status indicator */}
      <motion.div
        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0F172A] ${
          isSpeaking ? 'bg-green-400' : isThinking ? 'bg-yellow-400' : 'bg-blue-400'
        }`}
        animate={isSpeaking || isThinking ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
