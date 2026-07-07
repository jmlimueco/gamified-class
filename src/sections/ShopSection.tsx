import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Diamond, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const shopItems = [
  { name: 'Extra Credit Pass', cost: 500, icon: Star },
  { name: 'Homework Skip Token', cost: 1200, icon: Diamond },
  { name: 'Mystery Sticker Box', cost: 800, icon: ShoppingBag },
];

export default function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
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

      // Shop items staggered
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        scrollTl.fromTo(
          item,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14 + i * 0.05
        );
      });

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

      // Ring
      scrollTl.fromTo(
        ringRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.2, ease: 'none' },
        0
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
      itemsRef.current.forEach((item) => {
        if (!item) return;
        scrollTl.fromTo(
          item,
          { y: 0, opacity: 1 },
          { y: '-3vh', opacity: 0, ease: 'power2.in' },
          0.82
        );
      });
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
      id="shop"
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 40 }}
    >
      {/* Decorative Ring */}
      <svg
        ref={ringRef}
        className="absolute pointer-events-none"
        style={{ right: '-8vw', top: '20vh', width: '25vw', height: '25vw' }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(255, 45, 143, 0.2)"
          strokeWidth="2"
          strokeDasharray="150 350"
        />
      </svg>

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
            src="/shop_character.jpg"
            alt="Rewards Shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/60 via-transparent to-transparent" />
        </div>

        {/* Right Panel - Shop */}
        <div
          ref={rightPanelRef}
          className="absolute neon-card"
          style={{
            right: '6vw',
            top: '14vh',
            width: '42vw',
            height: '72vh',
            minWidth: '340px',
            maxWidth: '520px',
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.06]">
            <h3 className="font-black text-2xl text-white uppercase tracking-tight">
              Rewards <span className="text-[#FF2D8F]">Shop</span>
            </h3>
          </div>

          {/* Items */}
          <div className="p-4 space-y-3">
            {shopItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-[#FF2D8F]/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#FF2D8F]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-[#A7B0C8] text-xs">{item.cost} pts</p>
                    </div>
                  </div>
                  <button className="neon-button-outline text-xs py-2 px-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    Redeem
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06]">
            <p className="text-xs text-[#A7B0C8]">
              Teachers control the catalog. Prizes reset each term.
            </p>
          </div>
        </div>

        {/* Floating Badges */}
        <div
          ref={badge1Ref}
          className="absolute badge-float neon-glow-pink"
          style={{
            left: '4vw',
            top: '10vh',
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
            top: '78vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF, #00B8CC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '0.8s',
          }}
        >
          <Diamond className="w-5 h-5 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
