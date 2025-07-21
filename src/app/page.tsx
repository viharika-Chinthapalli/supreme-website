import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/ui/HeroSection';
import Footer from '@/components/ui/Footer';
import { ContactProvider } from '@/contexts/ContactContext';

// Dynamic imports for performance optimization
const EvolutionSection = dynamic(() => import('@/components/ui/EvolutionSection'), {
  loading: () => (
    <div className="section-padding bg-black">
      <div className="container mx-auto container-padding">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  ),
});

const ContactSection = dynamic(() => import('@/components/ui/ContactSection'), {
  loading: () => (
    <div className="section-padding bg-primary">
      <div className="container mx-auto container-padding">
        <div className="animate-pulse">
          <div className="h-8 bg-primary-400 rounded w-48 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-primary-400 rounded"></div>
            <div className="h-64 bg-primary-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <ContactProvider>
      <div className="min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Evolution Section */}
        <Suspense fallback={
          <div className="section-padding bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        }>
          <EvolutionSection />
        </Suspense>
        
        {/* Contact Section */}
        <Suspense fallback={
          <div className="section-padding bg-primary flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        }>
          <ContactSection />
        </Suspense>
        
        {/* Footer */}
        <Footer />
      </div>
    </ContactProvider>
  );
}