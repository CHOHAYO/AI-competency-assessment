/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { UserInfoForm } from './components/UserInfoForm';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { AnimatePresence } from 'motion/react';

import { useEffect } from 'react';
import { decodeData } from './utils/share';

function AppContent() {
  const { step, setStep, setSharedData } = useAssessment();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shareParam = searchParams.get('share');

    if (shareParam) {
      const decoded = decodeData(shareParam);
      if (decoded) {
        setSharedData(decoded);
        setStep('results');

        // Clean up the URL to prevent re-processing and Keep URL clean
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run exactly once on initial mount

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {step === 'landing' && <LandingPage key="landing" />}
        {step === 'info' && <UserInfoForm key="info" />}
        {step === 'assessment' && <Assessment key="assessment" />}
        {step === 'results' && <Results key="results" />}
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
}

