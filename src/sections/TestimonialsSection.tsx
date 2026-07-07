import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'My students actually ask for more homework now.',
    author: 'Ms. Rivera',
    role: '7th Grade Science',
    offset: '6vw',
  },
  {
    quote: "It's like a game, but the learning sticks.",
    author: 'Mr. Osei',
    role: 'High School History',
    offset: '34vw',
  },
  {
    quote: 'The shop makes points feel real.',
    author: 'A. Chen',
    role: 'Student Captain',
    offset: '10vw',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative starfield-bg py-20 lg:py-28"
      style={{ zIndex: 70 }}
    >
      <div className="px-6 lg:px-0">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-black text-white uppercase tracking-tight mb-12 lg:mb-16"
          style={{
            marginLeft: '6vw',
            fontSize: 'clamp(30px, 3.2vw, 48px)',
            maxWidth: '46vw',
          }}
        >
          Loved by <span className="text-[#FF2D8F]">classrooms</span>
        </h2>

        {/* Testimonial Cards */}
        <div className="space-y-6 lg:space-y-8">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="neon-card p-6 lg:p-8 group hover:border-[#FF2D8F]/20 transition-all duration-300"
              style={{
                marginLeft: t.offset,
                width: 'min(38vw, 480px)',
                minWidth: '300px',
              }}
            >
              <Quote className="w-8 h-8 text-[#FF2D8F]/40 mb-4" />
              <p className="text-white text-lg lg:text-xl font-medium leading-relaxed mb-4">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#00F0FF] flex items-center justify-center text-white font-bold text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.author}</p>
                  <p className="text-[#A7B0C8] text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
