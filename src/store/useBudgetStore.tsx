import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { Category, Expense } from "../types";

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
  updateExpense: (expense: Expense) => void;
  deleteExpense: (expenseID: string) => void;
  addBudget: (initialBudget: number) => void;
  resetApp: () => void;
  toggleModal: () => void;
  setCurrentCategory: (categoryID: string) => void;
  setEditingExpense: (expenseID: string) => void;
};
export const useBudgetStore = create<BudgetStoreType>()(
  persist(
    (set, get) => ({
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
      deleteExpense: (expenseID) =>
        set(() => ({
          expenses: get().expenses.filter(
            (expense) => expense.id !== expenseID
          ),
        })),
      setCurrentCategory: (categoryID) =>
        set(() => ({ currentCategory: categoryID })),
      addBudget: (initialBudget = 0) => set(() => ({ budget: initialBudget })),

      addExpenses: (expense: Expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
          isModalOpen: false,
          editingExpense: "",
        })),

      resetApp: () =>
        set({
          budget: 0,
          savings: 0,
          editingExpense: "",
          expenses: [],
          isModalOpen: false,
          currentCategory: "",

        }),

      toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

      updateExpense: (expense: Expense) =>
        set((state) => ({
          expenses: state.expenses.map((exp) =>
            exp.id === expense.id ? { ...expense } : exp
          ),
          isModalOpen: false,
          editingExpense: "",
        })),
      setEditingExpense: (expenseID) =>
        set(() => ({
          editingExpense: expenseID,
          isModalOpen: true,
        })),

    }),
    {
      name: "budget-tracker-storage",
      partialize: (state) => ({
        budget: state.budget,
        expenses: state.expenses,
        savings: state.savings

      })
    }
  )
);