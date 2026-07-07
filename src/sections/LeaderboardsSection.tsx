import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leaderboardData = [
  { name: 'A. Chen', score: 2480, rank: 'S', color: 'from-yellow-400 to-yellow-600' },
  { name: 'M. Rossi', score: 2315, rank: 'A', color: 'from-purple-400 to-purple-600' },
  { name: 'J. Park', score: 2100, rank: 'A', color: 'from-purple-400 to-purple-600' },
  { name: 'L. Evans', score: 1890, rank: 'B', color: 'from-blue-400 to-blue-600' },
  { name: 'T. Kumar', score: 1740, rank: 'B', color: 'from-blue-400 to-blue-600' },
];

export default function LeaderboardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left panel from left
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(leftPanelRef.current, { opacity: 1 }, 0.24);

      // Rows staggered
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        scrollTl.fromTo(
          row,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.04
        );
      });

      // Right card from right
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.to(rightCardRef.current, { opacity: 1 }, 0.26);

      // Badges pop
      scrollTl.fromTo(
        badge1Ref.current,
        { scale: 0.4, rotate: -20, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, ease: 'back.out(1.7)' },
        0.12
      );
      scrollTl.fromTo(
        badge2Ref.current,
        { scale: 0.4, rotate: -20, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, ease: 'back.out(1.7)' },
        0.16
      );

      // EXIT
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.76
      );
      rowsRef.current.forEach((row) => {
        if (!row) return;
        scrollTl.fromTo(
          row,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.8
        );
      });
      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.78
      );
      scrollTl.fromTo(
        [badge1Ref.current, badge2Ref.current],
        { scale: 1, opacity: 1 },
        { scale: 0.7, opacity: 0, ease: 'power2.in' },
        0.82
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leaderboards"
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 30 }}
    >
      <div className="w-full h-full relative px-6 lg:px-0">
        {/* Left Panel - Leaderboard */}
        <div
          ref={leftPanelRef}
          className="absolute neon-card overflow-hidden"
          style={{
            left: '6vw',
            top: '14vh',
            width: '42vw',
            height: '72vh',
            minWidth: '360px',
            maxWidth: '560px',
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.06]">
            <h3 className="font-black text-2xl text-white uppercase tracking-tight">
              <span className="text-[#FF2D8F]">Leader</span>board
            </h3>
            <div className="flex justify-between text-xs text-[#A7B0C8] mt-3 px-2">
              <span>Name</span>
              <span>Score</span>
              <span>Rank</span>
            </div>
          </div>

          {/* Rows */}
          <div className="p-4 space-y-2">
            {leaderboardData.map((entry, i) => (
              <div
                key={entry.name}
                ref={(el) => { rowsRef.current[i] = el; }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:bg-white/[0.04] ${
                  i === 0 ? 'bg-[#FF2D8F]/10 border border-[#FF2D8F]/20' : 'bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#A7B0C8] text-sm w-5">{i + 1}</span>
                  <span className="text-white font-medium text-sm">{entry.name}</span>
                </div>
                <span className="text-[#A7B0C8] text-sm font-mono">{entry.score.toLocaleString()}</span>
                <span
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${entry.color} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {entry.rank}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06]">
            <button className="flex items-center gap-2 text-sm text-[#FF2D8F] hover:text-white transition-colors group">
              View full board
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Character Card */}
        <div
          ref={rightCardRef}
          className="absolute neon-card overflow-hidden"
          style={{
            right: '6vw',
            top: '14vh',
            width: '44vw',
            height: '72vh',
            minWidth: '380px',
            maxWidth: '580px',
          }}
        >
          <img
            src="/leaderboard_character.jpg"
            alt="Leaderboard Champion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/60 via-transparent to-transparent" />
        </div>

        {/* Floating Badges */}
        <div
          ref={badge1Ref}
          className="absolute badge-float neon-glow-lime"
          style={{
            right: '4vw',
            top: '10vh',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #12EE64, #0DBF4F)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap className="w-6 h-6 text-white" fill="white" />
        </div>

        <div
          ref={badge2Ref}
          className="absolute badge-float neon-glow-pink"
          style={{
            left: '40vw',
            top: '76vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF2D8F, #FF0066)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '0.7s',
          }}
        >
          <Star className="w-5 h-5 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
