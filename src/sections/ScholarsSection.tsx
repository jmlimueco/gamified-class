import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Diamond, ArrowRight, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScholarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

      // Left card from left
      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(leftCardRef.current, { opacity: 1 }, 0.24);

      // Right panel from right
      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.to(rightPanelRef.current, { opacity: 1 }, 0.26);

      // Stats
      scrollTl.fromTo(
        statsRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Mission card
      scrollTl.fromTo(
        missionRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.21
      );

      // Badges
      scrollTl.fromTo(
        badge1Ref.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.1
      );
      scrollTl.fromTo(
        badge2Ref.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.14
      );

      // EXIT
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.76
      );
      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.78
      );
      scrollTl.fromTo(
        [statsRef.current, missionRef.current],
        { y: 0, opacity: 1 },
        { y: '-2vh', opacity: 0, ease: 'power2.in' },
        0.82
      );
      scrollTl.fromTo(
        [badge1Ref.current, badge2Ref.current],
        { scale: 1, opacity: 1 },
        { scale: 0.7, opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scholars"
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 60 }}
    >
      <div className="w-full h-full relative px-6 lg:px-0">
        {/* Left Character Card */}
        <div
          ref={leftCardRef}
          className="absolute neon-card overflow-hidden"
          style={{
            left: '6vw',
            top: '14vh',
            width: '44vw',
            height: '72vh',
            minWidth: '380px',
            maxWidth: '580px',
          }}
        >
          <img
            src="/scholar_character.jpg"
            alt="Scholar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/60 via-transparent to-transparent" />
        </div>

        {/* Right Panel - Scholar Dashboard */}
        <div
          ref={rightPanelRef}
          className="absolute neon-card"
          style={{
            right: '6vw',
            top: '14vh',
            width: '44vw',
            height: '72vh',
            minWidth: '360px',
            maxWidth: '540px',
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.06]">
            <h3 className="font-black text-2xl text-white uppercase tracking-tight">
              Your <span className="text-[#FF2D8F]">Dashboard</span>
            </h3>
          </div>

          <div className="p-5 space-y-4">
            {/* Stats Row */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <TrendingUp className="w-5 h-5 text-[#FF2D8F] mx-auto mb-1" />
                <p className="text-white font-bold text-lg">Lv. 12</p>
                <p className="text-[#A7B0C8] text-xs">Level</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <Star className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" fill="#F59E0B" />
                <p className="text-white font-bold text-lg">4,250</p>
                <p className="text-[#A7B0C8] text-xs">XP</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <Award className="w-5 h-5 text-[#00F0FF] mx-auto mb-1" />
                <p className="text-white font-bold text-lg">3</p>
                <p className="text-[#A7B0C8] text-xs">Badges</p>
              </div>
            </div>

            {/* Active Mission */}
            <div
              ref={missionRef}
              className="p-4 rounded-xl bg-gradient-to-br from-[#FF2D8F]/10 to-[#FF2D8F]/5 border border-[#FF2D8F]/20"
            >
              <p className="text-[#A7B0C8] text-xs uppercase tracking-wider mb-1">
                Current Mission
              </p>
              <p className="text-white font-bold text-lg mb-3">History Timeline</p>
              <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#FF2D8F] to-[#00F0FF] rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A7B0C8] text-xs">65% complete</span>
                <button
                  onClick={() => navigate('/login')}
                  className="neon-button text-xs py-2 px-4"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Link */}
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-sm text-[#A7B0C8] hover:text-[#FF2D8F] transition-colors group w-full justify-center"
            >
              View all missions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Floating Badges */}
        <div
          ref={badge1Ref}
          className="absolute badge-float neon-glow-pink"
          style={{
            left: '4vw',
            top: '78vh',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF2D8F, #FF0066)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Star className="w-6 h-6 text-white" fill="white" />
        </div>

        <div
          ref={badge2Ref}
          className="absolute badge-float neon-glow-cyan"
          style={{
            right: '6vw',
            top: '10vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF, #00B8CC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '0.9s',
          }}
        >
          <Diamond className="w-5 h-5 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
