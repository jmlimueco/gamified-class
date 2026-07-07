import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, CheckCircle, Coins } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '1',
    title: 'Assign',
    description: 'Create quests from your lessons in seconds.',
    image: '/how_step1.jpg',
    icon: FileText,
    color: '#FF2D8F',
  },
  {
    num: '2',
    title: 'Complete',
    description: 'Scholars finish tasks and log evidence.',
    image: '/how_step2.jpg',
    icon: CheckCircle,
    color: '#00F0FF',
  },
  {
    num: '3',
    title: 'Earn',
    description: 'Points, ranks, and real rewards.',
    image: '/how_step3.jpg',
    icon: Coins,
    color: '#12EE64',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

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

      // Title entrance
      scrollTl.fromTo(
        titleRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(titleRef.current, { opacity: 1 }, 0.18);

      // Card 1 from left
      scrollTl.fromTo(
        card1Ref.current,
        { x: '-55vw', rotate: -6, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.to(card1Ref.current, { opacity: 1 }, 0.26);

      // Card 2 from bottom
      scrollTl.fromTo(
        card2Ref.current,
        { y: '60vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );
      scrollTl.to(card2Ref.current, { opacity: 1 }, 0.3);

      // Card 3 from right
      scrollTl.fromTo(
        card3Ref.current,
        { x: '55vw', rotate: 6, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.14
      );
      scrollTl.to(card3Ref.current, { opacity: 1 }, 0.34);

      // Ring
      scrollTl.fromTo(
        ringRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 0.25, ease: 'none' },
        0
      );

      // EXIT phase (70-100%)
      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        card1Ref.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.78
      );
      scrollTl.fromTo(
        card2Ref.current,
        { y: 0, opacity: 1 },
        { y: '-26vh', opacity: 0, ease: 'power2.in' },
        0.8
      );
      scrollTl.fromTo(
        card3Ref.current,
        { x: 0, opacity: 1 },
        { x: '28vw', opacity: 0, ease: 'power2.in' },
        0.82
      );
      scrollTl.fromTo(
        ringRef.current,
        { rotate: 0, opacity: 0.25 },
        { rotate: 20, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 20 }}
    >
      {/* Decorative Ring */}
      <svg
        ref={ringRef}
        className="absolute pointer-events-none"
        style={{ right: '-10vw', top: '-10vh', width: '35vw', height: '35vw' }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="2"
          strokeDasharray="120 380"
        />
      </svg>

      <div className="w-full h-full relative px-6 lg:px-0">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="absolute font-black text-white uppercase tracking-tight"
          style={{
            left: '6vw',
            top: '10vh',
            fontSize: 'clamp(30px, 3.2vw, 48px)',
          }}
        >
          Three steps to <span className="text-[#FF2D8F]">adventure</span>
        </h2>

        {/* Step Cards */}
        {[card1Ref, card2Ref, card3Ref].map((ref, i) => {
          const step = steps[i];
          const Icon = step.icon;
          const leftPositions = ['6vw', '37vw', '68vw'];
          return (
            <div
              key={step.num}
              ref={ref}
              className="absolute neon-card overflow-hidden group hover:border-[#FF2D8F]/30 transition-all duration-300"
              style={{
                left: leftPositions[i],
                top: '34vh',
                width: '26vw',
                height: '44vh',
                minWidth: '260px',
                maxWidth: '360px',
              }}
            >
              {/* Card Image */}
              <div className="h-1/2 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="h-1/2 p-5 flex flex-col justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: `${step.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">
                  <span style={{ color: step.color }}>{step.num})</span>{' '}
                  {step.title}
                </h3>
                <p className="text-sm text-[#A7B0C8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
