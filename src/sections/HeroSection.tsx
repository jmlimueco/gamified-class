import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Zap, Diamond } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeARef = useRef<HTMLDivElement>(null);
  const badgeBRef = useRef<HTMLDivElement>(null);
  const badgeCRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Headline animation - word by word
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.75
      );

      // Character card
      tl.fromTo(
        cardRef.current,
        { x: '18vw', scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.3
      );

      // Badges pop in
      tl.fromTo(
        badgeARef.current,
        { scale: 0.3, rotate: -25, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        0.6
      );
      tl.fromTo(
        badgeBRef.current,
        { scale: 0.3, rotate: -25, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        0.68
      );
      tl.fromTo(
        badgeCRef.current,
        { scale: 0.3, rotate: -25, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        0.76
      );

      // Rings
      tl.fromTo(
        [ring1Ref.current, ring2Ref.current],
        { rotate: -15, opacity: 0 },
        { rotate: 0, opacity: 0.35, duration: 1 },
        0.4
      );

      // Scroll-driven EXIT animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subRef.current, ctaRef.current], {
              x: 0, opacity: 1
            });
            gsap.set(cardRef.current, { x: 0, opacity: 1 });
            gsap.set([badgeARef.current, badgeBRef.current, badgeCRef.current], {
              scale: 1, opacity: 1, x: 0, y: 0
            });
            gsap.set([ring1Ref.current, ring2Ref.current], { rotate: 0, opacity: 0.35 });
          }
        },
      });

      // ENTRANCE (0-30%): hold - already visible from load
      // SETTLE (30-70%): hold
      // EXIT (70-100%): animate out
      scrollTl.fromTo(
        [headlineRef.current, subRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [badgeARef.current, badgeBRef.current, badgeCRef.current],
        { scale: 1, opacity: 1, x: 0 },
        { scale: 0.7, opacity: 0, x: (i) => (i === 1 ? '-30px' : '30px'), ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        [ring1Ref.current, ring2Ref.current],
        { rotate: 0, opacity: 0.35 },
        { rotate: 25, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      {/* Decorative Rings */}
      <svg
        ref={ring1Ref}
        className="absolute pointer-events-none"
        style={{ right: '-6vw', top: '18vh', width: '28vw', height: '28vw' }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(255, 45, 143, 0.3)"
          strokeWidth="3"
          strokeDasharray="200 400"
        />
      </svg>
      <svg
        ref={ring2Ref}
        className="absolute pointer-events-none"
        style={{ right: '28vw', top: '70vh', width: '10vw', height: '10vw' }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(0, 240, 255, 0.25)"
          strokeWidth="3"
        />
      </svg>

      {/* Content Container */}
      <div className="w-full h-full relative px-6 lg:px-0">
        {/* Left Text Content */}
        <div
          ref={headlineRef}
          className="absolute"
          style={{ left: '6vw', top: '18vh', width: '54vw' }}
        >
          <h1 className="font-black uppercase leading-[0.95] tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(44px, 5vw, 78px)' }}
          >
            <span className="word inline-block">Learn.</span>{' '}
            <span className="word inline-block">Quest.</span>
            <br />
            <span className="word inline-block text-[#FF2D8F] neon-text-pink">Level</span>{' '}
            <span className="word inline-block text-[#FF2D8F] neon-text-pink">Up.</span>
          </h1>
        </div>

        <p
          ref={subRef}
          className="absolute text-[#A7B0C8] text-base lg:text-lg leading-relaxed"
          style={{ left: '6vw', top: '46vh', width: '40vw', maxWidth: '500px' }}
        >
          Turn lessons into adventures—complete missions, earn points, and climb the ranks.
        </p>

        <div
          ref={ctaRef}
          className="absolute flex items-center gap-4 flex-wrap"
          style={{ left: '6vw', top: '58vh' }}
        >
          <button onClick={() => navigate('/login')} className="neon-button">
            Start a Quest
          </button>
          <button onClick={() => navigate('/login')} className="neon-button-outline">
            View Demo
          </button>
          <p className="w-full text-xs text-[#A7B0C8] mt-2">
            Free for classrooms. No credit card.
          </p>
        </div>

        {/* Right Character Card */}
        <div
          ref={cardRef}
          className="absolute neon-card overflow-hidden"
          style={{
            right: '6vw',
            top: '14vh',
            width: '34vw',
            height: '72vh',
            maxWidth: '480px',
          }}
        >
          <img
            src="/hero_character.jpg"
            alt="Quantum Quest Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/60 via-transparent to-transparent" />
        </div>

        {/* Floating Badges */}
        <div
          ref={badgeARef}
          className="absolute badge-float neon-glow-pink"
          style={{
            right: '3vw',
            top: '12vh',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF2D8F, #FF0066)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Star className="w-7 h-7 text-white" fill="white" />
        </div>

        <div
          ref={badgeBRef}
          className="absolute badge-float neon-glow-lime"
          style={{
            right: '32vw',
            top: '10vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #12EE64, #0DBF4F)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '0.5s',
          }}
        >
          <Zap className="w-6 h-6 text-white" fill="white" />
        </div>

        <div
          ref={badgeCRef}
          className="absolute badge-float neon-glow-cyan"
          style={{
            right: '8vw',
            top: '74vh',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF, #00B8CC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '1s',
          }}
        >
          <Diamond className="w-6 h-6 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
