import { create } from 'zustand';
import { Category, Expense } from '../types';


type BudgetStoreType = {
  budget: number;
  expenses: Expense[];
  savings: number;
  currentCategory: Category['id'];
  isModalOpen: boolean;
  editingExpense: Expense['id'];


  setBudget: (initialBudget: number) => void;
  resetBudget: () => void;
  addExpense: (expenses: Expense[]) => void;
  setCurrentCategory: (category: Category['id']) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingExpense: (expenseId: Expense['id']) => void;
  setSavings: (savings: number) => void;
  deleteExpense: (expenseId: Expense['id']) => void;
}

export const useBudgetStore = create<BudgetStoreType>((set) => ({
  budget: 0,
  savings: 0,
  expenses: [],
  currentCategory: '',
  isModalOpen: false,
  editingExpense: '',

  setBudget: (initialBudget) => set(() => ({ budget: initialBudget })),
  resetBudget: () => set({ budget: 0 }),
  addExpense: (expenses) => set(() => ({ expenses })),
  setCurrentCategory: (category) => set(() => ({ currentCategory: category })),
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
  setEditingExpense: (expenseId) => set(() => ({ editingExpense: expenseId })),
  setSavings: (savings) => set(() => ({ savings })),
  deleteExpense: (expenseId) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== expenseId),
    })),
}))