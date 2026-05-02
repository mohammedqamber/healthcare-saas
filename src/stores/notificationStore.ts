import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  permission: NotificationPermission;
  addNotification: (title: string, body: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  requestPermission: () => Promise<boolean>;
  showLocalNotification: (title: string, body: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  permission: 'default' as NotificationPermission,

  addNotification: (title, body) => {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      title,
      body,
      timestamp: Date.now(),
      read: false,
    };
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 50),
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  clearAll: () => set({ notifications: [] }),

  requestPermission: async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }
    const permission = await Notification.requestPermission();
    set({ permission });
    return permission === 'granted';
  },

  showLocalNotification: (title, body) => {
    const { permission } = get();
    get().addNotification(title, body);
    if (permission === 'granted' && 'Notification' in window) {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      } catch (e) {
        console.warn('Notification display failed:', e);
      }
    }
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title,
        body,
      });
    }
  },
}));
