export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  bloodType: string;
  condition: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Critical' | 'Recovered';
  avatar: string;
  vitalSigns: {
    bp: string;
    hr: number;
    temp: number;
    spo2: number;
  };
  nextAppointment: string;
  doctor: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
}
