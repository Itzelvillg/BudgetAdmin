import { create } from 'zustand';
import { Expense } from '../types';


type BudgetStoreType = {
  budget: number;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  savings: number;
  setBudget: (initialBudget: number) => void;
  resetBudget: () => void;
};

export const useBudgetStore = create<BudgetStoreType>((set) => ({
  budget: 0,
  savings: 0,
  expenses: [],
  setBudget: (initialBudget = 0) => set(() => ({ budget: initialBudget })),
  setExpenses: (expenses) => set(() => ({ expenses })),
  resetBudget: () => set({ budget: 0 }),
}));