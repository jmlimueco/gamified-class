import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  quarkReward: number;
  completed: boolean;
  dueDate?: string;
  category: string;
}

export interface ActivityLog {
  id: string;
  scholarId: string;
  scholarName: string;
  missionTitle: string;
  description: string;
  xpRequested: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface PurchaseRequest {
  id: string;
  scholarId: string;
  scholarName: string;
  itemName: string;
  itemCost: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  image?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Scholar {
  id: string;
  name: string;
  level: number;
  xp: number;
  totalXp: number;
  quarks: number;
  rank: string;
  badges: number;
  missionsCompleted: number;
}

interface AppState {
  // Auth
  userRole: 'scholar' | 'teacher' | null;
  userName: string;
  setUserRole: (role: 'scholar' | 'teacher' | null, name?: string) => void;

  // Scholar data
  scholar: Scholar;
  missions: Mission[];
  activityLogs: ActivityLog[];
  notifications: Notification[];

  // Teacher data
  scholars: Scholar[];
  purchaseRequests: PurchaseRequest[];
  shopItems: ShopItem[];

  // Actions
  completeMission: (missionId: string) => void;
  submitActivityLog: (log: Omit<ActivityLog, 'id' | 'status' | 'submittedAt'>) => void;
  approveActivityLog: (logId: string, xpAwarded: number) => void;
  rejectActivityLog: (logId: string) => void;
  requestPurchase: (request: Omit<PurchaseRequest, 'id' | 'status' | 'requestedAt'>) => void;
  approvePurchase: (requestId: string) => void;
  rejectPurchase: (requestId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  addXp: (amount: number) => void;
  addQuarks: (amount: number) => void;
  spendQuarks: (amount: number) => boolean;
}

const defaultMissions: Mission[] = [
  { id: '1', title: 'Read Chapter 4', description: 'Read and summarize Chapter 4 of your textbook', xpReward: 100, quarkReward: 10, completed: false, dueDate: 'Friday', category: 'Reading' },
  { id: '2', title: 'Math Challenge Set', description: 'Complete problems 1-20 on page 156', xpReward: 150, quarkReward: 15, completed: false, dueDate: 'Monday', category: 'Math' },
  { id: '3', title: 'Science Lab Write-up', description: 'Document your experiment results', xpReward: 200, quarkReward: 20, completed: false, category: 'Science' },
  { id: '4', title: 'History Timeline', description: 'Create a timeline of major events', xpReward: 120, quarkReward: 12, completed: false, category: 'History' },
  { id: '5', title: 'Creative Writing', description: 'Write a 500-word short story', xpReward: 180, quarkReward: 18, completed: false, category: 'English' },
  { id: '6', title: 'Code Challenge', description: 'Solve 3 coding problems', xpReward: 250, quarkReward: 25, completed: false, category: 'CS' },
];

const defaultShopItems: ShopItem[] = [
  { id: '1', name: 'Extra Credit Pass', description: 'Get 10 bonus points on any assignment', cost: 500, category: 'Power-up' },
  { id: '2', name: 'Homework Skip Token', description: 'Skip one homework assignment', cost: 1200, category: 'Power-up' },
  { id: '3', name: 'Mystery Sticker Box', description: 'Unlock a random cosmic sticker', cost: 800, category: 'Cosmetic' },
  { id: '4', name: 'XP Boost (2x)', description: 'Double XP for 24 hours', cost: 1500, category: 'Power-up' },
  { id: '5', name: 'Cosmic Avatar Frame', description: 'Exclusive glowing avatar border', cost: 2000, category: 'Cosmetic' },
  { id: '6', name: 'Study Buddy Pet', description: 'A cute companion for your dashboard', cost: 3000, category: 'Cosmetic' },
];

const defaultScholars: Scholar[] = [
  { id: '1', name: 'A. Chen', level: 15, xp: 2480, totalXp: 12480, quarks: 450, rank: 'S', badges: 8, missionsCompleted: 42 },
  { id: '2', name: 'M. Rossi', level: 14, xp: 2315, totalXp: 11315, quarks: 380, rank: 'A', badges: 7, missionsCompleted: 38 },
  { id: '3', name: 'J. Park', level: 13, xp: 2100, totalXp: 10100, quarks: 320, rank: 'A', badges: 6, missionsCompleted: 35 },
  { id: '4', name: 'L. Evans', level: 11, xp: 1890, totalXp: 7890, quarks: 280, rank: 'B', badges: 5, missionsCompleted: 28 },
  { id: '5', name: 'T. Kumar', level: 10, xp: 1740, totalXp: 6740, quarks: 250, rank: 'B', badges: 4, missionsCompleted: 25 },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      userRole: null,
      userName: '',
      setUserRole: (role, name = '') => set({ userRole: role, userName: name }),

      scholar: { id: 'scholar-1', name: 'A. Chen', level: 12, xp: 4250, totalXp: 14250, quarks: 350, rank: 'S', badges: 3, missionsCompleted: 18 },
      missions: defaultMissions,
      activityLogs: [],
      notifications: [],

      scholars: defaultScholars,
      purchaseRequests: [],
      shopItems: defaultShopItems,

      completeMission: (missionId) => {
        const state = get();
        const mission = state.missions.find(m => m.id === missionId);
        if (!mission || mission.completed) return;

        const updatedMissions = state.missions.map(m =>
          m.id === missionId ? { ...m, completed: true } : m
        );

        const newXp = state.scholar.xp + mission.xpReward;
        const newTotalXp = state.scholar.totalXp + mission.xpReward;
        const newQuarks = state.scholar.quarks + mission.quarkReward;
        const newLevel = Math.floor(newTotalXp / 1000) + 1;
        const newMissionsCompleted = state.scholar.missionsCompleted + 1;

        let rank = 'C';
        if (newLevel >= 15) rank = 'S';
        else if (newLevel >= 12) rank = 'A';
        else if (newLevel >= 8) rank = 'B';

        const notification: Notification = {
          id: Date.now().toString(),
          title: 'Mission Complete!',
          message: `You earned ${mission.xpReward} XP and ${mission.quarkReward} Quarks!`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          missions: updatedMissions,
          scholar: { ...state.scholar, xp: newXp, totalXp: newTotalXp, quarks: newQuarks, level: newLevel, rank, missionsCompleted: newMissionsCompleted },
          notifications: [notification, ...state.notifications].slice(0, 50),
        });
      },

      submitActivityLog: (log) => {
        const state = get();
        const newLog: ActivityLog = {
          ...log,
          id: Date.now().toString(),
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        const notification: Notification = {
          id: (Date.now() + 1).toString(),
          title: 'Activity Log Submitted',
          message: `Your log for "${log.missionTitle}" is pending approval.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
        };
        set({
          activityLogs: [newLog, ...state.activityLogs],
          notifications: [notification, ...state.notifications].slice(0, 50),
        });
      },

      approveActivityLog: (logId, xpAwarded) => {
        const state = get();
        const updatedLogs = state.activityLogs.map(l =>
          l.id === logId ? { ...l, status: 'approved' as const } : l
        );
        const newXp = state.scholar.xp + xpAwarded;
        const newTotalXp = state.scholar.totalXp + xpAwarded;
        const newLevel = Math.floor(newTotalXp / 1000) + 1;

        let rank = 'C';
        if (newLevel >= 15) rank = 'S';
        else if (newLevel >= 12) rank = 'A';
        else if (newLevel >= 8) rank = 'B';

        const notification: Notification = {
          id: Date.now().toString(),
          title: 'Activity Approved!',
          message: `You earned ${xpAwarded} XP!`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          activityLogs: updatedLogs,
          scholar: { ...state.scholar, xp: newXp, totalXp: newTotalXp, level: newLevel, rank },
          notifications: [notification, ...state.notifications].slice(0, 50),
        });
      },

      rejectActivityLog: (logId) => {
        const state = get();
        const updatedLogs = state.activityLogs.map(l =>
          l.id === logId ? { ...l, status: 'rejected' as const } : l
        );
        set({ activityLogs: updatedLogs });
      },

      requestPurchase: (request) => {
        const state = get();
        const newRequest: PurchaseRequest = {
          ...request,
          id: Date.now().toString(),
          status: 'pending',
          requestedAt: new Date().toISOString(),
        };
        const notification: Notification = {
          id: (Date.now() + 1).toString(),
          title: 'Purchase Requested',
          message: `Request for "${request.itemName}" is pending approval.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
        };
        set({
          purchaseRequests: [newRequest, ...state.purchaseRequests],
          notifications: [notification, ...state.notifications].slice(0, 50),
        });
      },

      approvePurchase: (requestId) => {
        const state = get();
        const request = state.purchaseRequests.find(r => r.id === requestId);
        if (!request) return;
        const updatedRequests = state.purchaseRequests.map(r =>
          r.id === requestId ? { ...r, status: 'approved' as const } : r
        );
        set({ purchaseRequests: updatedRequests });
      },

      rejectPurchase: (requestId) => {
        const state = get();
        const updatedRequests = state.purchaseRequests.map(r =>
          r.id === requestId ? { ...r, status: 'rejected' as const } : r
        );
        set({ purchaseRequests: updatedRequests });
      },

      addNotification: (notification) => {
        const state = get();
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set({ notifications: [newNotification, ...state.notifications].slice(0, 50) });
      },

      markNotificationRead: (id) => {
        const state = get();
        const updatedNotifications = state.notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        set({ notifications: updatedNotifications });
      },

      addXp: (amount) => {
        const state = get();
        const newXp = state.scholar.xp + amount;
        const newTotalXp = state.scholar.totalXp + amount;
        const newLevel = Math.floor(newTotalXp / 1000) + 1;

        let rank = 'C';
        if (newLevel >= 15) rank = 'S';
        else if (newLevel >= 12) rank = 'A';
        else if (newLevel >= 8) rank = 'B';

        set({ scholar: { ...state.scholar, xp: newXp, totalXp: newTotalXp, level: newLevel, rank } });
      },

      addQuarks: (amount) => {
        const state = get();
        set({ scholar: { ...state.scholar, quarks: state.scholar.quarks + amount } });
      },

      spendQuarks: (amount) => {
        const state = get();
        if (state.scholar.quarks < amount) return false;
        set({ scholar: { ...state.scholar, quarks: state.scholar.quarks - amount } });
        return true;
      },
    }),
    {
      name: 'quantum-quest-storage',
      partialize: (state) => ({
        scholar: state.scholar,
        missions: state.missions,
        activityLogs: state.activityLogs,
        notifications: state.notifications,
        purchaseRequests: state.purchaseRequests,
        scholars: state.scholars,
        userRole: state.userRole,
        userName: state.userName,
      }),
    }
  )
);
