'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Message, EvaluationResult } from '@/lib/types';
import { AIAvatar } from './AIAvatar';
import { CheckCircle, AlertCircle, Lightbulb, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ChatAreaProps {
  messages: Message[];
  isAiThinking: boolean;
  isSpeaking: boolean;
}

function EvaluationCard({ evaluation }: { evaluation: EvaluationResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-3 space-y-3"
    >
      {/* Score Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-white">Score:</span>
        </div>
        <div className="flex-1 h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              evaluation.score >= 8
                ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                : evaluation.score >= 5
                ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                : 'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            initial={{ width: '0%' }}
            animate={{ width: `${evaluation.score * 10}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className={`text-lg font-bold ${
          evaluation.score >= 8 ? 'text-green-400' : evaluation.score >= 5 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {evaluation.score}/10
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Strengths */}
        {evaluation.strengths.length > 0 && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Strengths</span>
            </div>
            <ul className="space-y-1">
              {evaluation.strengths.map((s, i) => (
                <li key={i} className="text-xs text-green-200/80 flex items-start gap-1.5">
                  <span className="text-green-500 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {evaluation.weaknesses.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Weaknesses</span>
            </div>
            <ul className="space-y-1">
              {evaluation.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-red-200/80 flex items-start gap-1.5">
                  <span className="text-red-500 mt-0.5">•</span>{w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Improvement */}
      {evaluation.improvement && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Suggestion</span>
          </div>
          <p className="text-xs text-blue-200/80">{evaluation.improvement}</p>
        </div>
      )}

      {/* Model Answer */}
      {evaluation.modelAnswer && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Star className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Model Answer</span>
          </div>
          <p className="text-xs text-purple-200/80 italic">{evaluation.modelAnswer}</p>
        </div>
      )}
    </motion.div>
  );
}

export function ChatArea({ messages, isAiThinking, isSpeaking }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="flex-shrink-0 mt-1">
                <AIAvatar isSpeaking={false} isThinking={false} />
              </div>
            )}

            <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 ml-auto'
                    : 'glass-light'
                }`}
              >
                <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{msg.content}</p>
                
                {/* Evaluation Card */}
                {msg.evaluation && <EvaluationCard evaluation={msg.evaluation} />}
              </div>
              
              <p className={`text-[10px] text-slate-500 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mt-1">
                <span className="text-sm font-bold text-white">Y</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* AI Thinking Indicator */}
      {isAiThinking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 justify-start"
        >
          <div className="flex-shrink-0 mt-1">
            <AIAvatar isSpeaking={false} isThinking={true} />
          </div>
          <div className="glass-light rounded-2xl px-5 py-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-purple-400"
                animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <span className="text-xs text-slate-400 ml-2">AI is thinking...</span>
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
