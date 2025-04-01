import { Category, DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgetAction =
  | { type: "ADD_BUDGET"; payload: number }
  | { type: "SHOW_MODAL" }
  | { type: "HIDE_MODAL" }
  | { type: "ADD_EXPENSE"; payload: { expense: DraftExpense } }
  | { type: "DELETE_EXPENSE"; payload: { expense: Expense } }
  | { type: "UPDATE_EXPENSE"; payload: { expense: Expense } }
  | { type: "GET_EXPENSE_ID"; payload: { id: Expense["id"] } }
  | { type: "RESET_APP" }
  | { type: "SET_CURRENT_CATEGORY"; payload: { category: Category["id"] } };

export type BudgetState = {
  budget: number;
  expenses: Expense[];
  currentCategory: Category["id"];
  isModalOpen: boolean;
  editingExpense: Expense["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};
const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialBudgetState: BudgetState = {
  budget: initialBudget(),
  expenses: initialExpenses(),
  currentCategory: "",
  isModalOpen: false,
  editingExpense: "",
};

const createExpense = (expense: DraftExpense): Expense => {
  return {
    ...expense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialBudgetState,
  action: BudgetAction
) => {
  if (action.type === "ADD_BUDGET") {
    return { ...state, budget: action.payload };
  }
  if (action.type === "SHOW_MODAL") {
    return { ...state, isModalOpen: true };
  }
  if (action.type === "HIDE_MODAL") {
    return { ...state, isModalOpen: false, editingExpense: "" };
  }
  if (action.type === "ADD_EXPENSE") {
    const newExpense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      isModalOpen: false,
      editingExpense: "",
    };
  }
  if (action.type === "RESET_APP") {
    return {
      ...state,
      expenses: [],

      budget: 0,
      editingExpense: "",
    };
  }
  if (action.type === "UPDATE_EXPENSE") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      isModalOpen: false,
      editingExpense: "",
    };
  }
  if (action.type === "DELETE_EXPENSE") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.expense.id
      ),
    };
  }

  if (action.type === "GET_EXPENSE_ID") {
    return {
      ...state,
      editingExpense: action.payload.id,
      isModalOpen: true,
    };
  }
  if (action.type === "SET_CURRENT_CATEGORY") {
    return {
      ...state,
      currentCategory: action.payload.category,
    };
  }

  return state;
};
