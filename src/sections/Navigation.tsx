import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Leaderboards', id: 'leaderboards' },
    { label: 'Shop', id: 'shop' },
    { label: 'Teachers', id: 'teachers' },
    { label: 'Scholars', id: 'scholars' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <Rocket className="w-6 h-6 text-[#FF2D8F] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-lg tracking-tight text-white">
            Quantum Quest
          </span>
        </button>

        {/* Center Nav Links (desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm text-[#A7B0C8] hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF2D8F] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <button
          onClick={() => navigate('/login')}
          className="neon-button text-sm py-2 px-5"
        >
          Start Free
        </button>
      </div>
    </nav>
  );
}
