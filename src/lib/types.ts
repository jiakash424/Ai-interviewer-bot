// Interview types and interfaces

export type InterviewMode = 'technical' | 'hr' | 'rapid-fire';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface InterviewConfig {
  mode: InterviewMode;
  difficulty: DifficultyLevel;
  resumeText?: string;
  role?: string;
}

export interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  evaluation?: EvaluationResult;
}

export interface EvaluationResult {
  question: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvement: string;
  modelAnswer: string;
}

export interface InterviewScore {
  technical: number;
  communication: number;
  confidence: number;
  overall: number;
  questionsAnswered: number;
  history: { question: number; score: number }[];
}

export interface InterviewState {
  isActive: boolean;
  config: InterviewConfig | null;
  messages: Message[];
  scores: InterviewScore;
  isAiThinking: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  currentQuestion: number;
}
