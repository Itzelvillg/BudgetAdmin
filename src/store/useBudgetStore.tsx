import { create } from 'zustand';
import { Expense } from '../types';


type BudgetStoreType = {
  budget: number;
  expenses: Expense[];
  savings: number;
  addExpenses: (expense: Expense) => void;
  isModalOpen: boolean;
  addBudget: (initialBudget: number) => void;
  resetBudget: () => void;
  toogleModal: () => void;
};

export const useBudgetStore = create<BudgetStoreType>((set) => ({
  budget: 0,
  savings: 0,
  expenses: [],
  isModalOpen: false,
  addBudget: (initialBudget = 0) => set(() => ({ budget: initialBudget })),
  addExpenses: (expense: Expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
  resetBudget: () => set({ budget: 0 }),
  toogleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}));