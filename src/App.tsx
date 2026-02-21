import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import IntroSection from './sections/IntroSection';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import ChildhoodSection from './sections/ChildhoodSection';
import CakeSection from './sections/CakeSection';
import MessageSection from './sections/MessageSection';
import FinaleSection from './sections/FinaleSection';
import ClosingSection from './sections/ClosingSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [musicEnabled, setMusicEnabled] = useState(false);

  // Initialize smooth scrolling and global snap
  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Music toggle handler
  const toggleMusic = () => {
    setMusicEnabled(prev => !prev);
  };

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Persistent header */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="font-pixel text-xs text-violet-dark">Sweety</span>
        </div>
        
        <div className="pointer-events-auto flex gap-2">
          <button 
            onClick={toggleMusic}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg transition-transform hover:scale-110"
          >
            <svg className="w-5 h-5 text-violet-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {musicEnabled ? (
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93L17.66 6.34C19.8 8.48 19.8 11.52 17.66 13.66l1.41 1.41C21.6 12.58 21.6 8.42 19.07 4.93zM15.54 8.46l-1.06 1.06c.69.69.69 1.8 0 2.48l1.06 1.06c1.22-1.22 1.22-3.2 0-4.4z"/>
              ) : (
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Main sections */}
      <main className="relative">
        <IntroSection />
        <StorySection />
        <GallerySection />
        <ChildhoodSection />
        <CakeSection />
        <MessageSection />
        <FinaleSection />
        <ClosingSection />
      </main>
    </div>
  );
}

export default App;
