import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import {
  Rocket, Star, Zap, LogOut, Trophy, BookOpen,
  CheckCircle, Clock, Diamond, Bell, X,
  Gift, TrendingUp, Award, FlaskConical,
  Calculator, Scroll, Code
} from 'lucide-react';

type Tab = 'missions' | 'exchange' | 'activity' | 'notifications';

const categoryIcons: Record<string, typeof BookOpen> = {
  Reading: BookOpen,
  Math: Calculator,
  Science: FlaskConical,
  History: Scroll,
  English: BookOpen,
  CS: Code,
};

export default function ScholarDashboard() {
  const navigate = useNavigate();
  const {
    scholar, missions, notifications, activityLogs,
    completeMission, submitActivityLog, addNotification,
    markNotificationRead, spendQuarks, shopItems
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>('missions');
  const [showMissionModal, setShowMissionModal] = useState<string | null>(null);
  const [activityDesc, setActivityDesc] = useState('');
  const [xpToRequest, setXpToRequest] = useState(50);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const userRole = useStore((s) => s.userRole);
  const userName = useStore((s) => s.userName);

  useEffect(() => {
    if (userRole !== 'scholar') {
      navigate('/login');
    }
  }, [userRole, navigate]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleCompleteMission = (missionId: string) => {
    completeMission(missionId);
    setShowMissionModal(null);
  };

  const handleSubmitActivity = () => {
    if (!activityDesc.trim()) return;
    submitActivityLog({
      scholarId: scholar.id,
      scholarName: userName || scholar.name,
      missionTitle: 'Custom Activity',
      description: activityDesc,
      xpRequested: xpToRequest,
    });
    setActivityDesc('');
    setXpToRequest(50);
    addNotification({
      title: 'Activity Logged',
      message: 'Your activity has been submitted for approval.',
      type: 'info',
      read: false,
    });
  };

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (scholar.quarks < item.cost) {
      addNotification({
        title: 'Not Enough Quarks',
        message: `You need ${item.cost} Quarks for ${item.name}.`,
        type: 'error',
        read: false,
      });
      return;
    }
    const success = spendQuarks(item.cost);
    if (success) {
      setPurchaseSuccess(item.name);
      setTimeout(() => setPurchaseSuccess(null), 3000);
      addNotification({
        title: 'Purchase Successful!',
        message: `You got ${item.name}!`,
        type: 'success',
        read: false,
      });
    }
  };

  const levelProgress = ((scholar.totalXp % 1000) / 1000) * 100;

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'missions', label: 'Missions', icon: BookOpen },
    { id: 'exchange', label: 'Quantum Exchange', icon: Gift },
    { id: 'activity', label: 'Activity Log', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (userRole !== 'scholar') return null;

  return (
    <div className="min-h-screen bg-[#0B0E18] text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-[#FF2D8F]" />
            <span className="font-bold tracking-tight hidden sm:inline">Quantum Quest</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Stats mini */}
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                <span className="font-mono">{scholar.xp.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Diamond className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono">{scholar.quarks}</span>
              </div>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifPanel(!showNotifPanel)}
              className="relative p-2 rounded-full hover:bg-white/[0.06] transition-colors"
            >
              <Bell className="w-5 h-5 text-[#A7B0C8]" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FF2D8F] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Rank Badge */}
            <div className={`w-8 h-8 rounded-full rank-${scholar.rank.toLowerCase()} flex items-center justify-center text-xs font-bold`}>
              {scholar.rank}
            </div>

            {/* Logout */}
            <button
              onClick={() => { useStore.getState().setUserRole(null); navigate('/'); }}
              className="p-2 rounded-full hover:bg-white/[0.06] transition-colors"
            >
              <LogOut className="w-5 h-5 text-[#A7B0C8]" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="dashboard-card sticky top-24">
            {/* Profile */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#00F0FF] mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
                {(userName || 'S').charAt(0)}
              </div>
              <h3 className="font-bold text-lg">{userName || 'Scholar'}</h3>
              <p className="text-[#A7B0C8] text-sm">Level {scholar.level}</p>
            </div>

            {/* Level Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[#A7B0C8] mb-1">
                <span>Level {scholar.level}</span>
                <span>Level {scholar.level + 1}</span>
              </div>
              <div className="w-full h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full xp-bar-shimmer rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <p className="text-[#A7B0C8] text-xs mt-1 text-center">
                {scholar.totalXp % 1000} / 1000 XP
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <Trophy className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="font-bold">{scholar.rank}</p>
                <p className="text-[#A7B0C8] text-xs">Rank</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <Zap className="w-5 h-5 text-[#12EE64] mx-auto mb-1" />
                <p className="font-bold">{scholar.quarks}</p>
                <p className="text-[#A7B0C8] text-xs">Quarks</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <CheckCircle className="w-5 h-5 text-[#00F0FF] mx-auto mb-1" />
                <p className="font-bold">{scholar.missionsCompleted}</p>
                <p className="text-[#A7B0C8] text-xs">Done</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <Award className="w-5 h-5 text-[#FF2D8F] mx-auto mb-1" />
                <p className="font-bold">{scholar.badges}</p>
                <p className="text-[#A7B0C8] text-xs">Badges</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#FF2D8F]/10 text-[#FF2D8F]'
                        : 'text-[#A7B0C8] hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.id === 'notifications' && unreadCount > 0 && (
                      <span className="ml-auto w-5 h-5 bg-[#FF2D8F] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0E18]/95 backdrop-blur-xl border-t border-white/[0.06] px-2 py-2">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs transition-all ${
                    activeTab === tab.id ? 'text-[#FF2D8F]' : 'text-[#A7B0C8]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-0">
          {/* Tab Header */}
          <div className="mb-6">
            <h1 className="font-black text-2xl uppercase tracking-tight">
              {activeTab === 'missions' && 'Active Missions'}
              {activeTab === 'exchange' && 'Quantum Exchange'}
              {activeTab === 'activity' && 'Activity Log'}
              {activeTab === 'notifications' && 'Notifications'}
            </h1>
            <p className="text-[#A7B0C8] text-sm mt-1">
              {activeTab === 'missions' && 'Complete missions to earn XP and Quarks'}
              {activeTab === 'exchange' && 'Spend your Quarks on exclusive rewards'}
              {activeTab === 'activity' && 'Log your activities and request XP'}
              {activeTab === 'notifications' && 'Stay updated on your progress'}
            </p>
          </div>

          {/* Missions Tab */}
          {activeTab === 'missions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map((mission) => {
                const Icon = categoryIcons[mission.category] || BookOpen;
                return (
                  <div
                    key={mission.id}
                    className={`mission-card ${mission.completed ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#FF2D8F]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-sm truncate ${mission.completed ? 'line-through text-[#A7B0C8]' : 'text-white'}`}>
                            {mission.title}
                          </h3>
                          {mission.completed && (
                            <CheckCircle className="w-4 h-4 text-[#12EE64] flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-[#A7B0C8] text-xs mb-3 line-clamp-2">
                          {mission.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-[#F59E0B]">
                              <Star className="w-3 h-3" fill="#F59E0B" />
                              +{mission.xpReward} XP
                            </span>
                            <span className="flex items-center gap-1 text-[#00F0FF]">
                              <Diamond className="w-3 h-3" />
                              +{mission.quarkReward}
                            </span>
                          </div>
                          {mission.dueDate && (
                            <span className="flex items-center gap-1 text-[#A7B0C8] text-xs">
                              <Clock className="w-3 h-3" />
                              {mission.dueDate}
                            </span>
                          )}
                        </div>
                        {!mission.completed && (
                          <button
                            onClick={() => setShowMissionModal(mission.id)}
                            className="w-full mt-3 neon-button text-xs py-2"
                          >
                            Complete Mission
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quantum Exchange Tab */}
          {activeTab === 'exchange' && (
            <div>
              {/* Balance */}
              <div className="dashboard-card mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[#A7B0C8] text-sm">Your Balance</p>
                  <p className="text-3xl font-black text-[#00F0FF]">
                    {scholar.quarks} <span className="text-lg">Quarks</span>
                  </p>
                </div>
                <Diamond className="w-12 h-12 text-[#00F0FF]/20" />
              </div>

              {/* Purchase success toast */}
              {purchaseSuccess && (
                <div className="mb-4 p-4 rounded-xl bg-[#12EE64]/10 border border-[#12EE64]/30 flex items-center gap-3 notification-enter">
                  <CheckCircle className="w-5 h-5 text-[#12EE64]" />
                  <p className="text-[#12EE64] text-sm">Successfully purchased {purchaseSuccess}!</p>
                </div>
              )}

              {/* Shop Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shopItems.map((item) => (
                  <div key={item.id} className="dashboard-card group hover:border-[#FF2D8F]/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center">
                        <Gift className="w-6 h-6 text-[#FF2D8F]" />
                      </div>
                      <span className="text-xs text-[#A7B0C8] bg-white/[0.04] px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-[#A7B0C8] text-xs mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[#00F0FF] font-bold">
                        <Diamond className="w-4 h-4" />
                        {item.cost}
                      </span>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={scholar.quarks < item.cost}
                        className={`neon-button text-xs py-2 px-4 ${
                          scholar.quarks < item.cost ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              {/* Submit Activity */}
              <div className="dashboard-card">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#FF2D8F]" />
                  Submit Activity
                </h3>
                <textarea
                  value={activityDesc}
                  onChange={(e) => setActivityDesc(e.target.value)}
                  placeholder="Describe what you did..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#FF2D8F]/50 resize-none h-24 text-sm"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <label className="text-[#A7B0C8] text-sm">XP Request:</label>
                    <input
                      type="number"
                      value={xpToRequest}
                      onChange={(e) => setXpToRequest(Math.max(10, Math.min(500, Number(e.target.value))))}
                      className="w-20 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#FF2D8F]/50"
                      min={10}
                      max={500}
                    />
                  </div>
                  <button
                    onClick={handleSubmitActivity}
                    disabled={!activityDesc.trim()}
                    className={`neon-button text-sm py-2 px-4 ${!activityDesc.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    Submit for Approval
                  </button>
                </div>
              </div>

              {/* Activity History */}
              <div>
                <h3 className="font-bold text-white mb-4">Your Submissions</h3>
                {activityLogs.length === 0 ? (
                  <div className="dashboard-card text-center py-12">
                    <Star className="w-12 h-12 text-[#A7B0C8]/30 mx-auto mb-3" />
                    <p className="text-[#A7B0C8]">No activity logs yet</p>
                    <p className="text-[#A7B0C8] text-xs mt-1">Submit your first activity above</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="dashboard-card flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">{log.missionTitle}</p>
                          <p className="text-[#A7B0C8] text-xs mt-1">{log.description}</p>
                          <p className="text-[#A7B0C8] text-xs mt-1">
                            Requested: {log.xpRequested} XP
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            log.status === 'approved'
                              ? 'bg-[#12EE64]/10 text-[#12EE64]'
                              : log.status === 'rejected'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}
                        >
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="dashboard-card text-center py-12">
                  <Bell className="w-12 h-12 text-[#A7B0C8]/30 mx-auto mb-3" />
                  <p className="text-[#A7B0C8]">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`dashboard-card cursor-pointer transition-all ${
                      !n.read ? 'border-l-2 border-l-[#FF2D8F]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          n.type === 'success'
                            ? 'bg-[#12EE64]'
                            : n.type === 'error'
                            ? 'bg-red-400'
                            : n.type === 'warning'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#00F0FF]'
                        }`}
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${!n.read ? 'font-bold text-white' : 'text-[#A7B0C8]'}`}>
                          {n.title}
                        </p>
                        <p className="text-[#A7B0C8] text-xs mt-1">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 bg-[#FF2D8F] rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mission Complete Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="neon-card p-6 max-w-sm w-full">
            {(() => {
              const mission = missions.find((m) => m.id === showMissionModal);
              if (!mission) return null;
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-[#FF2D8F]" />
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">Complete Mission?</h3>
                    <p className="text-[#A7B0C8] text-sm">{mission.title}</p>
                  </div>
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-[#F59E0B] font-bold text-lg">+{mission.xpReward}</p>
                      <p className="text-[#A7B0C8] text-xs">XP</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#00F0FF] font-bold text-lg">+{mission.quarkReward}</p>
                      <p className="text-[#A7B0C8] text-xs">Quarks</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowMissionModal(null)}
                      className="flex-1 neon-button-outline text-sm py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleCompleteMission(mission.id)}
                      className="flex-1 neon-button text-sm py-2"
                    >
                      Complete!
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Notification Panel (overlay) */}
      {showNotifPanel && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNotifPanel(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-[#111727] border-l border-white/[0.06] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Notifications</h3>
              <button
                onClick={() => setShowNotifPanel(false)}
                className="p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5 text-[#A7B0C8]" />
              </button>
            </div>
            <div className="space-y-2">
              {notifications.length === 0 ? (
                <p className="text-[#A7B0C8] text-sm text-center py-8">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => { markNotificationRead(n.id); }}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      !n.read ? 'bg-[#FF2D8F]/5 border border-[#FF2D8F]/10' : 'bg-white/[0.02]'
                    }`}
                  >
                    <p className={`text-sm ${!n.read ? 'font-bold text-white' : 'text-[#A7B0C8]'}`}>
                      {n.title}
                    </p>
                    <p className="text-[#A7B0C8] text-xs mt-1">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
