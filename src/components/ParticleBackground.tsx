'use client';

import { motion } from 'framer-motion';

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating dots */}
      {[
        { left: 5, top: 12, y: -35, dur: 7, del: 1 },
        { left: 15, top: 45, y: -42, dur: 9, del: 3 },
        { left: 25, top: 78, y: -50, dur: 6, del: 0 },
        { left: 35, top: 22, y: -38, dur: 11, del: 2 },
        { left: 45, top: 65, y: -45, dur: 8, del: 4 },
        { left: 55, top: 33, y: -55, dur: 10, del: 1 },
        { left: 65, top: 88, y: -30, dur: 7, del: 3 },
        { left: 75, top: 50, y: -48, dur: 12, del: 0 },
        { left: 85, top: 15, y: -40, dur: 6, del: 2 },
        { left: 95, top: 70, y: -52, dur: 9, del: 4 },
        { left: 10, top: 55, y: -36, dur: 8, del: 1 },
        { left: 20, top: 90, y: -44, dur: 11, del: 3 },
        { left: 30, top: 8, y: -50, dur: 7, del: 0 },
        { left: 40, top: 42, y: -38, dur: 10, del: 2 },
        { left: 50, top: 75, y: -46, dur: 6, del: 4 },
        { left: 60, top: 18, y: -54, dur: 9, del: 1 },
        { left: 70, top: 60, y: -32, dur: 12, del: 3 },
        { left: 80, top: 35, y: -42, dur: 8, del: 0 },
        { left: 90, top: 82, y: -48, dur: 7, del: 2 },
        { left: 50, top: 50, y: -40, dur: 10, del: 4 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{
            y: [0, dot.y, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.dur,
            repeat: Infinity,
            delay: dot.del,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
