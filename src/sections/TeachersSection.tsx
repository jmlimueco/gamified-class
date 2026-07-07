import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Star, FileText, CheckCircle, ShoppingBag, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quests = [
  { title: 'Read Chapter 4', due: 'Due Friday', status: 'active' },
  { title: 'Math Challenge Set', due: 'Due Monday', status: 'pending' },
  { title: 'Science Lab Write-up', due: 'Open', status: 'open' },
];

export default function TeachersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Missions');

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

      // Right card from right
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.to(rightCardRef.current, { opacity: 1 }, 0.26);

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
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.76
      );
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

  const tabs = ['Missions', 'Approvals', 'Shop'];

  return (
    <section
      ref={sectionRef}
      id="teachers"
      className="section-pinned starfield-bg flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div className="w-full h-full relative px-6 lg:px-0">
        {/* Left Panel - Teacher UI */}
        <div
          ref={leftPanelRef}
          className="absolute neon-card"
          style={{
            left: '6vw',
            top: '14vh',
            width: '44vw',
            height: '72vh',
            minWidth: '360px',
            maxWidth: '540px',
          }}
        >
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? 'text-[#FF2D8F]' : 'text-[#A7B0C8] hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-[#FF2D8F]" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-5">
            {activeTab === 'Missions' && (
              <div className="space-y-3">
                {quests.map((quest) => (
                  <div
                    key={quest.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#FF2D8F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{quest.title}</p>
                      <p className="text-[#A7B0C8] text-xs">{quest.due}</p>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        quest.status === 'active'
                          ? 'bg-[#12EE64]'
                          : quest.status === 'pending'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#00F0FF]'
                      }`}
                    />
                  </div>
                ))}

                <button className="w-full mt-4 neon-button flex items-center justify-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  Create Quest
                </button>

                <p className="text-xs text-[#A7B0C8] text-center mt-3">
                  Auto-graded + manual review options.
                </p>
              </div>
            )}

            {activeTab === 'Approvals' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#12EE64]" />
                    <span className="text-white text-sm">3 logs pending review</span>
                  </div>
                  <p className="text-[#A7B0C8] text-xs">
                    Scholars submitted activity logs awaiting your approval.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-white text-sm">2 purchase requests</span>
                  </div>
                  <p className="text-[#A7B0C8] text-xs">
                    Review and approve scholar shop requests.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'Shop' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-white text-sm font-medium mb-1">Shop Catalog</p>
                  <p className="text-[#A7B0C8] text-xs">
                    Manage which items scholars can redeem with their points.
                  </p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                  <span className="text-[#A7B0C8] text-sm">6 active items</span>
                  <span className="text-[#12EE64] text-xs">Live</span>
                </div>
              </div>
            )}
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
            src="/teacher_character.jpg"
            alt="Teacher"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E18]/60 via-transparent to-transparent" />
        </div>

        {/* Floating Badges */}
        <div
          ref={badge1Ref}
          className="absolute badge-float neon-glow-lime"
          style={{
            left: '42vw',
            top: '10vh',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #12EE64, #0DBF4F)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap className="w-5 h-5 text-white" fill="white" />
        </div>

        <div
          ref={badge2Ref}
          className="absolute badge-float neon-glow-pink"
          style={{
            right: '4vw',
            top: '78vh',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF2D8F, #FF0066)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animationDelay: '0.6s',
          }}
        >
          <Star className="w-6 h-6 text-white" fill="white" />
        </div>
      </div>
    </section>
  );
}
