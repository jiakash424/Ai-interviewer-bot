'use client';

import { motion } from 'framer-motion';
import { InterviewScore } from '@/lib/types';
import { TrendingUp, MessageSquare, Shield, Award } from 'lucide-react';

interface ScoreDashboardProps {
  scores: InterviewScore;
}

function ScoreRing({ score, label, color, icon: Icon }: { score: number; label: string; color: string; icon: React.ElementType }) {
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score / 10) * circumference;
  const colorMap: Record<string, string> = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    cyan: '#06B6D4',
    green: '#10B981',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="rgba(148,163,184,0.1)"
            strokeWidth="6"
          />
          <motion.circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke={colorMap[color] || colorMap.blue}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 mb-0.5" style={{ color: colorMap[color] }} />
          <span className="text-lg font-bold text-white">{score.toFixed(1)}</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 text-center">{label}</span>
    </div>
  );
}

export function ScoreDashboard({ scores }: ScoreDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className="relative inline-block">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="rgba(148,163,184,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 36}
              initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 36 - (scores.overall / 10) * 2 * Math.PI * 36 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold gradient-text">{scores.overall.toFixed(1)}</span>
            <span className="text-xs text-slate-400">Overall</span>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreRing score={scores.technical} label="Technical" color="blue" icon={TrendingUp} />
        <ScoreRing score={scores.communication} label="Communication" color="purple" icon={MessageSquare} />
        <ScoreRing score={scores.confidence} label="Confidence" color="cyan" icon={Shield} />
        <ScoreRing score={scores.questionsAnswered > 0 ? scores.overall : 0} label="Performance" color="green" icon={Award} />
      </div>

      {/* Questions Answered */}
      <div className="glass-light rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Questions Answered</span>
          <span className="text-sm font-bold text-white">{scores.questionsAnswered}</span>
        </div>
        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(scores.questionsAnswered * 10, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Score History Mini Chart */}
      {scores.history.length > 0 && (
        <div className="glass-light rounded-xl p-4">
          <p className="text-sm text-slate-400 mb-3">Score Trend</p>
          <div className="flex items-end gap-2 h-20">
            {scores.history.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-500/60 to-purple-500/60 relative group"
                initial={{ height: 0 }}
                animate={{ height: `${(h.score / 10) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-1.5 py-0.5 rounded whitespace-nowrap">
                  {h.score}/10
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            {scores.history.map((h, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-slate-500">Q{h.question}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
