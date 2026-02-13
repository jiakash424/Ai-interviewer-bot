'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Upload,
  BriefcaseBusiness,
} from 'lucide-react';
import { InterviewMode, DifficultyLevel, InterviewConfig } from '@/lib/types';
import { ParticleBackground } from './ParticleBackground';
import { AIAvatar } from './AIAvatar';
import { ResumeUpload } from './ResumeUpload';

interface LandingPageProps {
  onStartInterview: (config: InterviewConfig) => void;
}

const modes: { id: InterviewMode; label: string; desc: string; icon: React.ElementType; color: string }[] = [
  { id: 'technical', label: 'Technical', desc: 'DSA, System Design, Coding', icon: Code2, color: 'blue' },
  { id: 'hr', label: 'HR / Behavioral', desc: 'Communication, Leadership', icon: Users, color: 'purple' },
  { id: 'rapid-fire', label: 'Rapid Fire', desc: 'Quick questions, fast pace', icon: Zap, color: 'cyan' },
];

const difficulties: { id: DifficultyLevel; label: string; emoji: string }[] = [
  { id: 'easy', label: 'Easy', emoji: '🌱' },
  { id: 'medium', label: 'Medium', emoji: '⚡' },
  { id: 'hard', label: 'Hard', emoji: '🔥' },
];

export function LandingPage({ onStartInterview }: LandingPageProps) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<InterviewMode>('technical');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [resumeText, setResumeText] = useState('');
  const [role, setRole] = useState('');

  const handleStart = () => {
    onStartInterview({
      mode,
      difficulty,
      resumeText: resumeText || undefined,
      role: role || undefined,
    });
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex-1 flex flex-col items-center justify-center px-4 text-center"
            >
              {/* AI Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="w-28 h-28 mx-auto">
                    <AIAvatar isSpeaking={false} isThinking={false} />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                <span className="gradient-text">Meet Your</span>
                <br />
                <span className="text-white">AI Interviewer</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-slate-400 max-w-xl mb-10"
              >
                Practice interviews with AI that adapts to your level. Get real-time feedback, scores, and improvement tips.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => setStep(1)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-2">
                  Start Interview
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap justify-center gap-3 mt-12"
              >
                {['Real-time Feedback', 'Voice Support', 'Score Tracking', 'Resume Analysis', 'Adaptive Questions'].map(
                  (feat, i) => (
                    <motion.span
                      key={feat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="px-4 py-1.5 rounded-full glass-light text-xs text-slate-300"
                    >
                      {feat}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-16"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="w-6 h-6 text-slate-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex-1 flex flex-col items-center justify-center px-4 py-12"
            >
              <div className="w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">Configure Your Interview</h2>
                  <p className="text-slate-400">Customize the experience to match your needs</p>
                </div>

                {/* Interview Mode */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Interview Mode</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {modes.map((m) => {
                      const Icon = m.icon;
                      const isActive = mode === m.id;
                      const colorClasses: Record<string, string> = {
                        blue: 'border-blue-500 bg-blue-500/10 shadow-blue-500/20',
                        purple: 'border-purple-500 bg-purple-500/10 shadow-purple-500/20',
                        cyan: 'border-cyan-500 bg-cyan-500/10 shadow-cyan-500/20',
                      };

                      return (
                        <motion.button
                          key={m.id}
                          onClick={() => setMode(m.id)}
                          className={`glass rounded-xl p-4 text-left transition-all duration-300 ${
                            isActive ? `${colorClasses[m.color]} shadow-lg` : 'hover:bg-slate-800/30'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon
                            className={`w-6 h-6 mb-2 ${
                              isActive
                                ? m.color === 'blue'
                                  ? 'text-blue-400'
                                  : m.color === 'purple'
                                  ? 'text-purple-400'
                                  : 'text-cyan-400'
                                : 'text-slate-400'
                            }`}
                          />
                          <p className="text-sm font-semibold text-white">{m.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Difficulty */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Difficulty Level</label>
                  <div className="flex gap-3">
                    {difficulties.map((d) => (
                      <motion.button
                        key={d.id}
                        onClick={() => setDifficulty(d.id)}
                        className={`flex-1 glass rounded-xl py-3 px-4 text-center transition-all duration-300 ${
                          difficulty === d.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                            : 'hover:bg-slate-800/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl mb-1 block">{d.emoji}</span>
                        <span className="text-sm font-medium text-white">{d.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Role Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Target Role <span className="text-slate-500 normal-case font-normal">(optional)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
                    className="w-full bg-slate-800/30 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </motion.div>

                {/* Resume Upload */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Resume <span className="text-slate-500 normal-case font-normal">(optional)</span>
                    </label>
                  </div>
                  <ResumeUpload onResumeText={setResumeText} resumeText={resumeText} />
                </motion.div>

                {/* Start Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <motion.button
                    onClick={handleStart}
                    className="w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Begin Interview
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Back button */}
                <div className="text-center">
                  <button
                    onClick={() => setStep(0)}
                    className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    ← Back to home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
