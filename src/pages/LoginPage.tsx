import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Rocket, GraduationCap, Users, ArrowLeft, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUserRole = useStore((s) => s.setUserRole);
  const [selectedRole, setSelectedRole] = useState<'scholar' | 'teacher' | null>(null);
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!selectedRole || !name.trim()) return;
    setUserRole(selectedRole, name.trim());
    navigate(selectedRole === 'scholar' ? '/scholar' : '/teacher');
  };

  return (
    <div className="min-h-screen starfield-bg flex items-center justify-center relative">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#A7B0C8] hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Rocket className="w-6 h-6 text-[#FF2D8F]" />
        <span className="font-bold text-white text-lg tracking-tight">Quantum Quest</span>
      </div>

      <div className="w-full max-w-md px-6">
        {/* Login Card */}
        <div className="neon-card p-8">
          <div className="text-center mb-8">
            <h1 className="font-black text-3xl text-white uppercase tracking-tight mb-2">
              Choose Your <span className="text-[#FF2D8F]">Role</span>
            </h1>
            <p className="text-[#A7B0C8] text-sm">
              Select how you want to enter the quest
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedRole('scholar')}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                selectedRole === 'scholar'
                  ? 'border-[#FF2D8F] bg-[#FF2D8F]/10 neon-glow-pink'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  selectedRole === 'scholar'
                    ? 'bg-[#FF2D8F]'
                    : 'bg-white/[0.06]'
                }`}
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">Scholar</p>
                <p className="text-[#A7B0C8] text-xs mt-1">Complete quests</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('teacher')}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                selectedRole === 'teacher'
                  ? 'border-[#00F0FF] bg-[#00F0FF]/10 neon-glow-cyan'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  selectedRole === 'teacher'
                    ? 'bg-[#00F0FF]'
                    : 'bg-white/[0.06]'
                }`}
              >
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">Teacher</p>
                <p className="text-[#A7B0C8] text-xs mt-1">Manage class</p>
              </div>
            </button>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-[#A7B0C8] text-sm mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#FF2D8F]/50 focus:ring-1 focus:ring-[#FF2D8F]/30 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedRole || !name.trim()}
            className={`w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedRole && name.trim()
                ? 'bg-[#FF2D8F] text-white hover:bg-[#FF2D8F]/80 hover:scale-[1.02]'
                : 'bg-white/[0.06] text-[#A7B0C8] cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Enter the Quest
          </button>
        </div>
      </div>
    </div>
  );
}
