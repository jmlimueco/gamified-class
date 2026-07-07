import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import LeaderboardsSection from '../sections/LeaderboardsSection';
import ShopSection from '../sections/ShopSection';
import TeachersSection from '../sections/TeachersSection';
import ScholarsSection from '../sections/ScholarsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FinalCTASection from '../sections/FinalCTASection';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  useEffect(() => {
    // Wait for all sections to mount and ScrollTriggers to initialize
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
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
      // Only kill the global snap trigger on unmount
      const allTriggers = ScrollTrigger.getAll();
      const globalSnap = allTriggers.find((st) => st.vars.snap && !st.vars.pin);
      if (globalSnap) globalSnap.kill();
    };
  }, []);

  return (
    <div className="relative bg-[#0B0E18]">
      <Navigation />
      <main className="relative">
        <HeroSection />
        <HowItWorksSection />
        <LeaderboardsSection />
        <ShopSection />
        <TeachersSection />
        <ScholarsSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>

      {/* Footer */}
      <footer className="relative bg-[#0B0E18] border-t border-white/[0.06] py-8 px-6 lg:px-10" style={{ zIndex: 90 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[#A7B0C8] text-sm">
            &copy; 2025 Quantum Quest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#A7B0C8] text-sm hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#A7B0C8] text-sm hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-[#A7B0C8] text-sm hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
