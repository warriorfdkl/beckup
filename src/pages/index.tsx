import { useEffect } from 'react';
import PremiumHeader from '@/components/PremiumHeader';
import ProgressSection from '@/components/ProgressSection';
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700">
      <PremiumHeader />
      <ProgressSection />
      <CallToAction />
    </div>
  );
} 