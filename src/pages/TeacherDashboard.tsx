import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import {
  Rocket, LogOut, Users, CheckCircle, XCircle, Star,
  Diamond, Bell, X, TrendingUp, Award,
  BarChart3, FileText, ShoppingBag, ChevronRight,
  Edit3, Save
} from 'lucide-react';

type Tab = 'overview' | 'approvals' | 'purchases' | 'class';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const {
    scholars, activityLogs, purchaseRequests, notifications,
    approveActivityLog, rejectActivityLog, approvePurchase, rejectPurchase,
    markNotificationRead, addNotification
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [editingLog, setEditingLog] = useState<string | null>(null);
  const [editXpValue, setEditXpValue] = useState(50);
  const userRole = useStore((s) => s.userRole);
  const userName = useStore((s) => s.userName);

  useEffect(() => {
    if (userRole !== 'teacher') {
      navigate('/login');
    }
  }, [userRole, navigate]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingLogs = activityLogs.filter((l) => l.status === 'pending');
  const pendingPurchases = purchaseRequests.filter((r) => r.status === 'pending');

  const handleApproveLog = (logId: string, xp: number) => {
    approveActivityLog(logId, xp);
    addNotification({
      title: 'Activity Approved',
      message: `Approved activity log with ${xp} XP.`,
      type: 'success',
      read: false,
    });
    setEditingLog(null);
  };

  const handleRejectLog = (logId: string) => {
    rejectActivityLog(logId);
    addNotification({
      title: 'Activity Rejected',
      message: 'Activity log has been rejected.',
      type: 'warning',
      read: false,
    });
  };

  const handleApprovePurchase = (requestId: string) => {
    approvePurchase(requestId);
    addNotification({
      title: 'Purchase Approved',
      message: 'Purchase request has been approved.',
      type: 'success',
      read: false,
    });
  };

  const handleRejectPurchase = (requestId: string) => {
    rejectPurchase(requestId);
    addNotification({
      title: 'Purchase Rejected',
      message: 'Purchase request has been rejected.',
      type: 'warning',
      read: false,
    });
  };

  // Analytics
  const totalScholars = scholars.length;
  const totalXp = scholars.reduce((sum, s) => sum + s.totalXp, 0);
  const avgLevel = Math.round(scholars.reduce((sum, s) => sum + s.level, 0) / totalScholars);
  const totalMissions = scholars.reduce((sum, s) => sum + s.missionsCompleted, 0);

  const tabs: { id: Tab; label: string; icon: typeof BarChart3; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'approvals', label: 'Approvals', icon: FileText, badge: pendingLogs.length },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag, badge: pendingPurchases.length },
    { id: 'class', label: 'Class', icon: Users },
  ];

  if (userRole !== 'teacher') return null;

  return (
    <div className="min-h-screen bg-[#0B0E18] text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0B0E18]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-bold tracking-tight hidden sm:inline">Quantum Quest</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-[#A7B0C8] text-sm">
              {totalScholars} Scholars
            </span>

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

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF2D8F] flex items-center justify-center text-xs font-bold">
              {(userName || 'T').charAt(0)}
            </div>

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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF2D8F] mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
                {(userName || 'T').charAt(0)}
              </div>
              <h3 className="font-bold text-lg">{userName || 'Teacher'}</h3>
              <p className="text-[#A7B0C8] text-sm">Class Manager</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <Users className="w-5 h-5 text-[#00F0FF] mx-auto mb-1" />
                <p className="font-bold">{totalScholars}</p>
                <p className="text-[#A7B0C8] text-xs">Scholars</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] text-center">
                <Star className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" fill="#F59E0B" />
                <p className="font-bold">{(totalXp / 1000).toFixed(1)}k</p>
                <p className="text-[#A7B0C8] text-xs">Total XP</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
                        : 'text-[#A7B0C8] hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="ml-auto w-5 h-5 bg-[#FF2D8F] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                        {tab.badge}
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
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs transition-all relative ${
                    activeTab === tab.id ? 'text-[#00F0FF]' : 'text-[#A7B0C8]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px]">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#FF2D8F] rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-0">
          <h1 className="font-black text-2xl uppercase tracking-tight mb-6">
            {activeTab === 'overview' && 'Class Overview'}
            {activeTab === 'approvals' && 'Activity Approvals'}
            {activeTab === 'purchases' && 'Purchase Requests'}
            {activeTab === 'class' && 'Class Manager'}
          </h1>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="dashboard-card">
                  <Users className="w-6 h-6 text-[#00F0FF] mb-2" />
                  <p className="text-2xl font-black">{totalScholars}</p>
                  <p className="text-[#A7B0C8] text-xs">Total Scholars</p>
                </div>
                <div className="dashboard-card">
                  <TrendingUp className="w-6 h-6 text-[#12EE64] mb-2" />
                  <p className="text-2xl font-black">{avgLevel}</p>
                  <p className="text-[#A7B0C8] text-xs">Avg Level</p>
                </div>
                <div className="dashboard-card">
                  <Star className="w-6 h-6 text-[#F59E0B] mb-2" />
                  <p className="text-2xl font-black">{totalMissions}</p>
                  <p className="text-[#A7B0C8] text-xs">Missions Done</p>
                </div>
                <div className="dashboard-card">
                  <Award className="w-6 h-6 text-[#FF2D8F] mb-2" />
                  <p className="text-2xl font-black">{totalXp.toLocaleString()}</p>
                  <p className="text-[#A7B0C8] text-xs">Total XP</p>
                </div>
              </div>

              {/* Pending Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setActiveTab('approvals')}
                  className="dashboard-card cursor-pointer hover:border-[#FF2D8F]/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#FF2D8F]" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Pending Logs</p>
                        <p className="text-[#A7B0C8] text-xs">{pendingLogs.length} awaiting review</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A7B0C8] group-hover:text-[#FF2D8F] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                <div
                  onClick={() => setActiveTab('purchases')}
                  className="dashboard-card cursor-pointer hover:border-[#00F0FF]/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-[#00F0FF]" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Purchase Requests</p>
                        <p className="text-[#A7B0C8] text-xs">{pendingPurchases.length} awaiting approval</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A7B0C8] group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>

              {/* Top Scholars */}
              <div className="dashboard-card">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F59E0B]" />
                  Top Scholars
                </h3>
                <div className="space-y-3">
                  {scholars.slice(0, 5).map((scholar, i) => (
                    <div key={scholar.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-xs font-bold text-[#A7B0C8]">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-white text-sm font-medium">{scholar.name}</p>
                          <p className="text-[#A7B0C8] text-xs">Level {scholar.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#F59E0B] text-sm font-mono">{scholar.totalXp.toLocaleString()} XP</span>
                        <span className={`w-7 h-7 rounded-full rank-${scholar.rank.toLowerCase()} flex items-center justify-center text-xs font-bold`}>
                          {scholar.rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Approvals Tab */}
          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {pendingLogs.length === 0 ? (
                <div className="dashboard-card text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#12EE64]/30 mx-auto mb-3" />
                  <p className="text-[#A7B0C8]">All caught up!</p>
                  <p className="text-[#A7B0C8] text-xs mt-1">No pending activity logs</p>
                </div>
              ) : (
                pendingLogs.map((log) => (
                  <div key={log.id} className="dashboard-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-bold">{log.scholarName}</p>
                        <p className="text-[#A7B0C8] text-xs">{log.missionTitle}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                        Pending
                      </span>
                    </div>
                    <p className="text-[#A7B0C8] text-sm mb-4 bg-white/[0.02] p-3 rounded-xl">
                      {log.description}
                    </p>

                    {editingLog === log.id ? (
                      <div className="flex items-center gap-3 mb-4">
                        <label className="text-[#A7B0C8] text-sm">XP:</label>
                        <input
                          type="number"
                          value={editXpValue}
                          onChange={(e) => setEditXpValue(Math.max(10, Math.min(500, Number(e.target.value))))}
                          className="w-24 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#FF2D8F]/50"
                        />
                        <button
                          onClick={() => handleApproveLog(log.id, editXpValue)}
                          className="neon-button text-xs py-2 px-3"
                        >
                          <Save className="w-3 h-3 inline mr-1" />
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-[#A7B0C8] mb-4">
                        Requested: <span className="text-[#F59E0B] font-bold">{log.xpRequested} XP</span>
                      </p>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditXpValue(log.xpRequested);
                          setEditingLog(log.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-[#00F0FF]/30 text-[#00F0FF] text-sm hover:bg-[#00F0FF]/10 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit XP
                      </button>
                      <button
                        onClick={() => handleApproveLog(log.id, log.xpRequested)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#12EE64]/10 text-[#12EE64] text-sm hover:bg-[#12EE64]/20 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectLog(log.id)}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* All Logs History */}
              {activityLogs.filter((l) => l.status !== 'pending').length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-white mb-4">Processed Logs</h3>
                  <div className="space-y-2">
                    {activityLogs
                      .filter((l) => l.status !== 'pending')
                      .map((log) => (
                        <div key={log.id} className="dashboard-card flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                log.status === 'approved' ? 'bg-[#12EE64]' : 'bg-red-400'
                              }`}
                            />
                            <div>
                              <p className="text-white text-sm">{log.scholarName} — {log.missionTitle}</p>
                              <p className="text-[#A7B0C8] text-xs">{log.description}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              log.status === 'approved'
                                ? 'bg-[#12EE64]/10 text-[#12EE64]'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === 'purchases' && (
            <div className="space-y-4">
              {pendingPurchases.length === 0 ? (
                <div className="dashboard-card text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#12EE64]/30 mx-auto mb-3" />
                  <p className="text-[#A7B0C8]">No pending purchases</p>
                  <p className="text-[#A7B0C8] text-xs mt-1">All purchase requests have been processed</p>
                </div>
              ) : (
                pendingPurchases.map((request) => (
                  <div key={request.id} className="dashboard-card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-[#FF2D8F]" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{request.scholarName}</p>
                          <p className="text-[#A7B0C8] text-xs">wants to redeem</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                        Pending
                      </span>
                    </div>
                    <div className="bg-white/[0.02] p-4 rounded-xl mb-4">
                      <p className="text-white font-bold text-lg">{request.itemName}</p>
                      <p className="flex items-center gap-1 text-[#00F0FF] text-sm mt-1">
                        <Diamond className="w-4 h-4" />
                        {request.itemCost} Quarks
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprovePurchase(request.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#12EE64]/10 text-[#12EE64] text-sm font-medium hover:bg-[#12EE64]/20 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectPurchase(request.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Processed Requests */}
              {purchaseRequests.filter((r) => r.status !== 'pending').length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-white mb-4">Processed Requests</h3>
                  <div className="space-y-2">
                    {purchaseRequests
                      .filter((r) => r.status !== 'pending')
                      .map((request) => (
                        <div key={request.id} className="dashboard-card flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                request.status === 'approved' ? 'bg-[#12EE64]' : 'bg-red-400'
                              }`}
                            />
                            <p className="text-white text-sm">
                              {request.scholarName} — {request.itemName}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              request.status === 'approved'
                                ? 'bg-[#12EE64]/10 text-[#12EE64]'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Class Tab */}
          {activeTab === 'class' && (
            <div className="space-y-4">
              {scholars.map((scholar) => (
                <div key={scholar.id} className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full rank-${scholar.rank.toLowerCase()} flex items-center justify-center text-lg font-bold`}>
                        {scholar.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{scholar.name}</p>
                        <p className="text-[#A7B0C8] text-xs">Level {scholar.level} · Rank {scholar.rank}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium">
                      {scholar.totalXp.toLocaleString()} XP
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                      <p className="text-[#F59E0B] font-bold text-sm">{scholar.xp}</p>
                      <p className="text-[#A7B0C8] text-[10px]">Current XP</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                      <p className="text-[#00F0FF] font-bold text-sm">{scholar.quarks}</p>
                      <p className="text-[#A7B0C8] text-[10px]">Quarks</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                      <p className="text-[#12EE64] font-bold text-sm">{scholar.missionsCompleted}</p>
                      <p className="text-[#A7B0C8] text-[10px]">Missions</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                      <p className="text-[#FF2D8F] font-bold text-sm">{scholar.badges}</p>
                      <p className="text-[#A7B0C8] text-[10px]">Badges</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Notification Panel */}
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
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      !n.read ? 'bg-[#00F0FF]/5 border border-[#00F0FF]/10' : 'bg-white/[0.02]'
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
