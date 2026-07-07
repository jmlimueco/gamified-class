import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Zap, Diamond } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
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

      // Headline from top
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-14vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(headlineRef.current, { opacity: 1 }, 0.2);

      // Subheadline
      scrollTl.fromTo(
        subRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.to(subRef.current, { opacity: 1 }, 0.24);

      // CTA button
      scrollTl.fromTo(
        ctaRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.1
      );
      scrollTl.to(ctaRef.current, { opacity: 1 }, 0.28);

      // Link
      scrollTl.fromTo(
        linkRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Bottom card from bottom
      scrollTl.fromTo(
        cardRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );
      scrollTl.to(cardRef.current, { opacity: 1 }, 0.3);

      // Badges
      scrollTl.fromTo(
        badge1Ref.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.14
      );
      scrollTl.fromTo(
        badge2Ref.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.18
      );
      scrollTl.fromTo(
        badge3Ref.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.22
      );

      // Ring
      scrollTl.fromTo(
        ringRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 0.2, ease: 'none' },
        0
      );

      // EXIT
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.82
      );
      scrollTl.fromTo(
        subRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
      scrollTl.fromTo(
        ctaRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.88
      );
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.8
      );
      scrollTl.fromTo(
        [badge1Ref.current, badge2Ref.current, badge3Ref.current],
        { scale: 1, opacity: 1 },
        { scale: 0.7, opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 80 }}
    >
      {/* Decorative Ring */}
      <svg
        ref={ringRef}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '5vh',
          transform: 'translateX(-50%)',
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
        }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(255, 45, 143, 0.15)"
          strokeWidth="2"
          strokeDasharray="100 300"
        />
      </svg>

      <div className="w-full h-full relative px-6 lg:px-0 flex flex-col items-center">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="absolute font-black text-white uppercase tracking-tight text-center"
          style={{
            left: '50%',
            top: '18vh',
            transform: 'translateX(-50%)',
            width: '80vw',
            fontSize: 'clamp(40px, 5vw, 72px)',
          }}
        >
          Ready to <span className="text-[#FF2D8F] neon-text-pink">launch?</span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="absolute text-[#A7B0C8] text-base lg:text-lg text-center leading-relaxed"
          style={{
            left: '50%',
            top: '38vh',
            transform: 'translateX(-50%)',
            width: 'min(52vw, 600px)',
          }}
        >
          Bring quests, leaderboards, and rewards to your classroom—free to start.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={() => navigate('/login')}
          className="absolute neon-button text-lg py-4 px-10"
          style={{
            left: '50%',
            top: '50vh',
            transform: 'translateX(-50%)',
          }}
        >
          Start Free
        </button>

        {/* Supporting Link */}
        <button
          ref={linkRef}
          onClick={() => navigate('/login')}
          className="absolute text-sm text-[#A7B0C8] hover:text-[#FF2D8F] transition-colors underline underline-offset-4"
          style={{
            left: '50%',
            top: '60vh',
            transform: 'translateX(-50%)',
          }}
        >
          Request a school demo
        </button>

        {/* Bottom Character Card */}
        <div
          ref={cardRef}
          className="absolute neon-card overflow-hidden"
          style={{
            left: '6vw',
            top: '66vh',
            width: '88vw',
            height: '26vh',
          }}
        >
          <img
            src="/final_character.jpg"
            alt="Launch"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/80 via-[#0B0E18]/20 to-transparent" />
        </div>

        {/* Floating Badges */}
        <div
          ref={badge1Ref}
          className="absolute badge-float neon-glow-pink"
          style={{
            left: '6vw',
            top: '14vh',
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
          className="absolute badge-float neon-glow-lime"
          style={{
            right: '8vw',
            top: '16vh',
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
          <Zap className="w-5 h-5 text-white" fill="white" />
        </div>

        <div
          ref={badge3Ref}
          className="absolute badge-float neon-glow-cyan"
          style={{
            right: '6vw',
            top: '78vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF, #00B8CC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '1s',
          }}
        >
          <Diamond className="w-5 h-5 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
