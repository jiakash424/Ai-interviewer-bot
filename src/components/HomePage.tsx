'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  MessageSquare,
  Mic,
  BarChart3,
  RefreshCw,
  Settings2,
  FileText,
  Video,
  ChevronRight,
  Star,
  Quote,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';

/* ───── SECTION WRAPPER ───── */
function Section({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ───── FEATURE CARD ───── */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 group-hover:border-blue-500/40 group-hover:shadow-blue-500/10',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20 group-hover:border-purple-500/40 group-hover:shadow-purple-500/10',
    cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10',
    green: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10',
  };
  const iconColor: Record<string, string> = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    green: 'text-emerald-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div
        className={`relative h-full rounded-2xl bg-gradient-to-b ${colorMap[color]} border p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1`}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 ${iconColor[color]} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ───── TUTORIAL STEP ───── */
function TutorialStep({
  step,
  icon: Icon,
  title,
  desc,
  delay,
}: {
  step: number;
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative flex gap-6 group"
    >
      {/* Connector line */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
          {step}
        </div>
        {step < 3 && (
          <div className="w-0.5 flex-1 mt-4 bg-gradient-to-b from-blue-500/50 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ───── REVIEW CARD ───── */
function ReviewCard({
  name,
  role,
  text,
  rating,
  delay,
}: {
  name: string;
  role: string;
  text: string;
  rating: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="h-full rounded-2xl bg-slate-800/30 border border-slate-700/30 p-8 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5">
        <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
        <p className="text-slate-300 leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
              }`}
            />
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   MAIN HOME PAGE
   ═════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-8"
          >
            <Zap className="w-4 h-4" />
            AI-Powered Interview Preparation
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight tracking-tight"
          >
            <span className="text-white">Smart</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Interviewer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Get ready to approach interviews with confidence and lay the groundwork for
            your career success with Smart Interviewer Trainer AI
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link href="/interview">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                Start Now
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
            <a href="#tutorials">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-slate-300 font-semibold text-lg border border-slate-600/50 hover:border-slate-500 hover:bg-slate-800/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                See How It Works
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: '10K+', label: 'Interviews Conducted' },
              { value: '95%', label: 'User Satisfaction' },
              { value: '50+', label: 'Question Categories' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <Section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4"
            >
              <BrainCircuit className="w-4 h-4" />
              Features
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Practice Interview With{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Everything you need to ace your next interview, powered by cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={MessageSquare}
              title="Diverse Interview Questions"
              desc="Various types of commonly asked job interview questions, including technical, behavioral, and general knowledge."
              color="blue"
              delay={0}
            />
            <FeatureCard
              icon={BarChart3}
              title="Personalized Feedback"
              desc="Immediate and personalized feedback based on your performance — scores, strengths, and improvement areas."
              color="purple"
              delay={0.1}
            />
            <FeatureCard
              icon={Settings2}
              title="Experience Customization"
              desc="Select interview modes, difficulty levels, target roles, and upload your resume for tailored questions."
              color="cyan"
              delay={0.2}
            />
            <FeatureCard
              icon={RefreshCw}
              title="Repetitive Practice"
              desc="Practice repeatedly with various interview scenarios, track progress over time and continuously improve."
              color="green"
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      {/* ─── HOW IT WORKS / TUTORIALS ─── */}
      <Section id="tutorials" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Steps */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-4"
              >
                <Sparkles className="w-4 h-4" />
                How It Works
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">
                Three Simple{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Steps
                </span>
              </h2>

              <div className="space-y-0">
                <TutorialStep
                  step={1}
                  icon={FileText}
                  title="Submit Job Description"
                  desc="Submit a job role description and receive customized interview queries designed to match the position's requirements."
                  delay={0}
                />
                <TutorialStep
                  step={2}
                  icon={Mic}
                  title="Record Your Responses"
                  desc="Record your responses using audio to simulate an authentic interview scenario with real-time AI interaction."
                  delay={0.15}
                />
                <TutorialStep
                  step={3}
                  icon={CheckCircle2}
                  title="Get Instant Feedback"
                  desc="Obtain immediate AI-generated feedback along with enhanced sample responses to refine your interview technique."
                  delay={0.3}
                />
              </div>
            </div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-8 shadow-2xl">
                {/* Mock interview UI */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-slate-500">Smart Interviewer</span>
                </div>

                <div className="space-y-4">
                  {/* AI message */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <BrainCircuit className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-slate-200">
                        Tell me about a time you had to solve a complex problem under tight deadlines. How did you approach it?
                      </p>
                    </div>
                  </motion.div>

                  {/* User message */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3 justify-end"
                  >
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-blue-100">
                        In my last project, I broke the problem into smaller tasks, prioritized the critical path...
                      </p>
                    </div>
                  </motion.div>

                  {/* Score card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-300">Score: 8.5/10</span>
                      </div>
                      <span className="text-xs text-slate-400">Great answer!</span>
                    </div>
                  </motion.div>
                </div>

                {/* Voice input bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-700/50"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    {[3, 5, 7, 4, 8, 5, 3, 6, 9, 4, 7, 5, 3].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-blue-400 rounded-full"
                        animate={{ height: [h * 2, h * 4, h * 2] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Recording...</span>
                </motion.div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── REVIEWS ─── */}
      <Section id="reviews" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm mb-4"
            >
              <Star className="w-4 h-4" />
              Reviews
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              See what our users have to say about their interview preparation experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard
              name="Priya Sharma"
              role="Software Engineer at Google"
              text="Smart Interviewer helped me prepare for my Google interview. The AI feedback was incredibly accurate and helped me identify blind spots I didn't know I had."
              rating={5}
              delay={0}
            />
            <ReviewCard
              name="Rahul Mehta"
              role="Product Manager at Microsoft"
              text="The behavioral interview practice was a game changer. It felt like a real interview with personalized follow-up questions. Highly recommend!"
              rating={5}
              delay={0.1}
            />
            <ReviewCard
              name="Ananya Patel"
              role="Data Scientist at Amazon"
              text="I practiced with Smart Interviewer every day for a week before my interview. The variety of questions and instant scoring helped me track my improvement."
              rating={4}
              delay={0.2}
            />
          </div>
        </div>
      </Section>

      {/* ─── CTA SECTION ─── */}
      <Section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Ready to Ace Your{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Interview?
                </span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-10">
                Start practicing now and walk into your next interview with confidence. No credit card required.
              </p>
              <Link href="/interview">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow cursor-pointer"
                >
                  Start Interview Now
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
