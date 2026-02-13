'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff, Square } from 'lucide-react';

interface MicButtonProps {
  isListening: boolean;
  isDisabled: boolean;
  onToggle: () => void;
}

export function MicButton({ isListening, isDisabled, onToggle }: MicButtonProps) {
  return (
    <div className="relative">
      {/* Ripple effects when listening */}
      {isListening && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20"
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500/20"
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />
        </>
      )}

      <motion.button
        onClick={onToggle}
        disabled={isDisabled}
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening
            ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30'
            : isDisabled
            ? 'bg-slate-700 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
        }`}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
      >
        {isListening ? (
          <Square className="w-6 h-6 text-white fill-white" />
        ) : (
          <Mic className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {/* Sound wave bars when listening */}
      {isListening && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-purple-500"
              animate={{
                height: ['4px', `${8 + Math.random() * 16}px`, '4px'],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: i * 0.08,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MicButtonSmall({ isListening, isDisabled, onToggle }: MicButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      disabled={isDisabled}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isListening
          ? 'bg-red-500 shadow-lg shadow-red-500/30'
          : isDisabled
          ? 'bg-slate-700 cursor-not-allowed opacity-50'
          : 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30'
      }`}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
    >
      {isListening ? (
        <MicOff className="w-4 h-4 text-white" />
      ) : (
        <Mic className="w-4 h-4 text-blue-400" />
      )}
    </motion.button>
  );
}
