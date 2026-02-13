'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  StopCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  LogOut,
  Timer,
  ChevronRight,
  ChevronLeft,
  Download,
} from 'lucide-react';
import { InterviewConfig, Message, InterviewScore, EvaluationResult } from '@/lib/types';
import { ChatArea } from './ChatArea';
import { MicButton } from './MicButton';
import { ScoreDashboard } from './ScoreDashboard';
import { AIAvatar } from './AIAvatar';
import { ParticleBackground } from './ParticleBackground';

interface InterviewScreenProps {
  config: InterviewConfig;
  onEnd: () => void;
}

export function InterviewScreen({ config, onEnd }: InterviewScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<InterviewScore>({
    technical: 0,
    communication: 0,
    confidence: 0,
    overall: 0,
    questionsAnswered: 0,
    history: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speakAbortRef = useRef<AbortController | null>(null);
  const interviewStartedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Text-to-Speech via Resemble AI
  const speak = useCallback(async (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined') return;

    // Cancel any in-flight TTS request
    if (speakAbortRef.current) {
      speakAbortRef.current.abort();
      speakAbortRef.current = null;
    }

    // Stop any currently playing audio
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const abortController = new AbortController();
    speakAbortRef.current = abortController;

    try {
      setIsSpeaking(true);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: abortController.signal,
      });

      if (abortController.signal.aborted) return;

      if (!response.ok) {
        setIsSpeaking(false);
        return;
      }

      const audioBlob = await response.blob();
      if (abortController.signal.aborted) return;

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      await audio.play();
    } catch {
      if (!abortController.signal.aborted) {
        setIsSpeaking(false);
      }
    }
  }, [ttsEnabled]);

  const stopSpeaking = useCallback(() => {
    if (speakAbortRef.current) {
      speakAbortRef.current.abort();
      speakAbortRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Speech Recognition
  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputText(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening]);

  // Send message to AI
  const sendMessage = useCallback(async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText && messages.length > 0) return;

    // Stop listening if active
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    stopSpeaking();

    const isFirstMessage = messages.length === 0;

    // Add user message (skip for first message - it's auto-triggered)
    let updatedMessages = [...messages];
    if (!isFirstMessage) {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      };
      updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
    }

    setInputText('');
    setIsAiThinking(true);

    try {
      // Build chat history for API
      const chatHistory = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // For first message, send start signal
      if (isFirstMessage) {
        chatHistory.push({
          role: 'user' as const,
          content: 'Start the interview. Greet me and ask your first question.',
        });
      }

      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          config,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'API request failed');
      }

      const data = await response.json();

      // Build AI message content
      let aiContent = '';
      let evaluation: EvaluationResult | undefined;

      if (data.evaluation) {
        evaluation = data.evaluation;

        // Update scores
        const newScore = data.evaluation.score;
        setScores((prev) => {
          const newQuestionsAnswered = prev.questionsAnswered + 1;
          const newHistory = [...prev.history, { question: newQuestionsAnswered, score: newScore }];
          const avgScore =
            newHistory.reduce((sum, h) => sum + h.score, 0) / newHistory.length;

          return {
            technical: config.mode === 'technical' ? avgScore : prev.technical || avgScore * 0.7,
            communication: Math.min(10, avgScore + (Math.random() * 1 - 0.5)),
            confidence: Math.min(10, avgScore + (Math.random() * 1.5 - 0.75)),
            overall: avgScore,
            questionsAnswered: newQuestionsAnswered,
            history: newHistory,
          };
        });
      }

      if (data.feedback) {
        aiContent += data.feedback;
      }

      if (data.nextQuestion) {
        if (aiContent) aiContent += '\n\n';
        aiContent += `📋 ${data.nextQuestion}`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: aiContent || 'Let me think about the next question...',
        timestamp: new Date(),
        evaluation,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speak the next question
      if (data.nextQuestion) {
        speak(data.nextQuestion);
      } else if (data.feedback) {
        speak(data.feedback);
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Something went wrong';
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'ai',
        content: `⚠️ Error: ${errMsg}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiThinking(false);
    }
  }, [inputText, messages, isListening, stopSpeaking, config, speak]);

  // Auto-start interview (guarded against StrictMode double-fire)
  useEffect(() => {
    if (messages.length === 0 && !interviewStartedRef.current) {
      interviewStartedRef.current = true;
      sendMessage('start');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Download report
  const downloadReport = () => {
    let report = `AI Interview Report\n${'='.repeat(50)}\n\n`;
    report += `Mode: ${config.mode}\n`;
    report += `Difficulty: ${config.difficulty}\n`;
    report += `Duration: ${formatTime(elapsed)}\n`;
    report += `Questions Answered: ${scores.questionsAnswered}\n`;
    report += `Overall Score: ${scores.overall.toFixed(1)}/10\n\n`;
    report += `${'='.repeat(50)}\nConversation\n${'='.repeat(50)}\n\n`;

    messages.forEach((m) => {
      report += `[${m.role.toUpperCase()}] ${m.content}\n`;
      if (m.evaluation) {
        report += `Score: ${m.evaluation.score}/10\n`;
        report += `Strengths: ${m.evaluation.strengths.join(', ')}\n`;
        report += `Weaknesses: ${m.evaluation.weaknesses.join(', ')}\n`;
        report += `Improvement: ${m.evaluation.improvement}\n`;
        report += `Model Answer: ${m.evaluation.modelAnswer}\n`;
      }
      report += '\n';
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      <ParticleBackground />

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="glass border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AIAvatar isSpeaking={isSpeaking} isThinking={isAiThinking} />
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                AI Interviewer
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                  config.mode === 'technical'
                    ? 'bg-blue-500/20 text-blue-400'
                    : config.mode === 'hr'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {config.mode}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  config.difficulty === 'easy'
                    ? 'bg-green-500/20 text-green-400'
                    : config.difficulty === 'hard'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {config.difficulty}
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {isSpeaking ? '🔊 Speaking...' : isAiThinking ? '🤔 Thinking...' : '🟢 Ready'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <Timer className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-sm font-mono text-white">{formatTime(elapsed)}</span>
            </div>

            {/* TTS Toggle */}
            <motion.button
              onClick={() => { setTtsEnabled(!ttsEnabled); if (isSpeaking) stopSpeaking(); }}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={ttsEnabled ? 'Mute AI voice' : 'Enable AI voice'}
            >
              {ttsEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </motion.button>

            {/* Download Report */}
            <motion.button
              onClick={downloadReport}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download report"
            >
              <Download className="w-4 h-4 text-slate-400" />
            </motion.button>

            {/* Sidebar Toggle */}
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </motion.button>

            {/* End Interview */}
            <motion.button
              onClick={onEnd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-3.5 h-3.5" />
              End
            </motion.button>
          </div>
        </div>

        {/* Chat Area */}
        <ChatArea messages={messages} isAiThinking={isAiThinking} isSpeaking={isSpeaking} />

        {/* Input Area */}
        <div className="glass border-t border-slate-700/50 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            {/* Mic Button */}
            <MicButton
              isListening={isListening}
              isDisabled={isAiThinking}
              onToggle={toggleListening}
            />

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? 'Listening... speak now' : 'Type your answer...'}
                disabled={isAiThinking}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
              />
              {isListening && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-blue-400 rounded-full"
                      animate={{ height: ['4px', '12px', '4px'] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Send Button */}
            <motion.button
              onClick={() => sendMessage()}
              disabled={isAiThinking || (!inputText.trim() && messages.length > 0)}
              className={`p-3 rounded-xl transition-all ${
                inputText.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
              whileHover={inputText.trim() ? { scale: 1.05 } : {}}
              whileTap={inputText.trim() ? { scale: 0.95 } : {}}
            >
              {isAiThinking ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <StopCircle className="w-5 h-5" />
                </motion.div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Score Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass border-l border-slate-700/50 overflow-y-auto relative z-10"
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                📊 Live Dashboard
              </h2>
              <ScoreDashboard scores={scores} />

              {/* Quick Stats */}
              <div className="mt-6 space-y-3">
                <div className="glass-light rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Duration</span>
                  <span className="text-sm font-mono text-white">{formatTime(elapsed)}</span>
                </div>
                <div className="glass-light rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Mode</span>
                  <span className={`text-sm font-medium capitalize ${
                    config.mode === 'technical' ? 'text-blue-400' :
                    config.mode === 'hr' ? 'text-purple-400' : 'text-cyan-400'
                  }`}>{config.mode}</span>
                </div>
                <div className="glass-light rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Difficulty</span>
                  <span className="text-sm font-medium text-white capitalize">{config.difficulty}</span>
                </div>
                {config.role && (
                  <div className="glass-light rounded-xl p-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Role</span>
                    <span className="text-sm font-medium text-white truncate ml-2">{config.role}</span>
                  </div>
                )}
              </div>

              {/* Restart Button */}
              <motion.button
                onClick={onEnd}
                className="w-full mt-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 transition-colors text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <RotateCcw className="w-4 h-4" />
                New Interview
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
