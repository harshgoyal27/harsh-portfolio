import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Custom designed cursor */}
      <CustomCursor />

      {/* Premium VLSI preloader system */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Portfolio Sections Container */}
      <main
        className="relative w-full"
        style={{ overflowX: 'clip', background: '#0C0C0C' }}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
