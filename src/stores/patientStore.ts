import { create } from 'zustand';
import { Patient } from '@/types';
import { mockPatients } from '@/data/patients';

interface PatientStore {
  patients: Patient[];
  viewMode: 'grid' | 'list';
  searchQuery: string;
  statusFilter: string;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  getFilteredPatients: () => Patient[];
  getPatientById: (id: string) => Patient | undefined;
  updatePatientStatus: (id: string, status: Patient['status']) => void;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'All',

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  getFilteredPatients: () => {
    const { patients, searchQuery, statusFilter } = get();
    return patients.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  },

  getPatientById: (id) => get().patients.find((p) => p.id === id),

  updatePatientStatus: (id, status) => {
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, status } : p
      ),
    }));
  },
}));
