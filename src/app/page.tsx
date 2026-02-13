'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from '@/components/LandingPage';
import { InterviewScreen } from '@/components/InterviewScreen';
import { InterviewConfig } from '@/lib/types';

export default function Home() {
  const [activeInterview, setActiveInterview] = useState<InterviewConfig | null>(null);

  const handleStartInterview = (config: InterviewConfig) => {
    setActiveInterview(config);
  };

  const handleEndInterview = () => {
    setActiveInterview(null);
  };

  return (
    <AnimatePresence mode="wait">
      {activeInterview ? (
        <InterviewScreen
          key="interview"
          config={activeInterview}
          onEnd={handleEndInterview}
        />
      ) : (
        <LandingPage key="landing" onStartInterview={handleStartInterview} />
      )}
    </AnimatePresence>
  );
}
