import { create } from 'zustand';
import { Expense } from '../types';


type BudgetStoreType = {
  budget: number;
  expenses: Expense[];
  savings: number;
  isModalOpen: boolean;
  editingExpense: Expense["id"];
  addExpenses: (expense: Expense) => void;
  addBudget: (initialBudget: number) => void;
  resetBudget: () => void;
  toogleModal: () => void;
  remaningBudget: () => number;
};

export const useBudgetStore = create<BudgetStoreType>((set, get) => ({
  budget: 0,
  savings: 0,
  expenses: [],
  isModalOpen: false,
  editingExpense: "",

  remaningBudget: () => get()?.budget - 5,
  addBudget: (initialBudget = 0) => set(() => ({ budget: initialBudget })),
  addExpenses: (expense: Expense) => set((state) => ({ expenses: [...state.expenses, expense], isModalOpen: false })),
  resetBudget: () => set({ budget: 0 }),
  toogleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}));