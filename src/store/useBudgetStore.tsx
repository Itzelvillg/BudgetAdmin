import { create } from 'zustand';
import { Category, Expense } from '../types';


type BudgetStoreType = {
  budget: number;
  expenses: Expense[];
  savings: number;
  isModalOpen: boolean;
  editingExpense: Expense["id"];
  currentCategory: Category["id"];

  getTotalExpenses: () => number;
  getRemaningBudget: () => number;
  addExpenses: (expense: Expense) => void;
  addBudget: (initialBudget: number) => void;
  resetApp: () => void;
  toogleModal: () => void;
  setCurrentCategory: (categoryID: string) => void;
};

export const useBudgetStore = create<BudgetStoreType>((set, get) => ({
  budget: 0,
  savings: 0,
  expenses: [],
  isModalOpen: false,
  editingExpense: "",
  currentCategory: "",

  getTotalExpenses: () => {
    return get().expenses.reduce((acc, expense) => acc + expense.amount, 0);
  },
  getRemaningBudget: () => {
    return get().budget - get().getTotalExpenses();
  },

  setCurrentCategory: (categoryID) => set(() => ({ currentCategory: categoryID })),
  addBudget: (initialBudget = 0) => set(() => ({ budget: initialBudget })),
  addExpenses: (expense: Expense) => set((state) => ({ expenses: [...state.expenses, expense], isModalOpen: false, editingExpense: "" })),
  resetApp: () => set({ budget: 0, editingExpense: "", expenses: [], isModalOpen: false, currentCategory: "" }),
  toogleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}));