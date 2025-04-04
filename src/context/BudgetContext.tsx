import { useReducer, createContext, ReactNode, useMemo } from "react";
import { BudgetAction, budgetReducer, BudgetState, initialBudgetState } from "../reducers/budgetReducer";
import { useBudgetStore } from "../store/BudgetStore";



type BudgetContextProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetAction>;
  remaningBudget: number;
  totalExpenses: number;
  totalSavings: number;
}
type BudgetProviderProps = {
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);

  const totalExpenses = useMemo(() => state.expenses.reduce((acc, expense) => expense.category === "1" ? acc + 0 : acc + expense.amount, 0), [state.expenses]);
  const isSavings = useMemo(() => state.expenses.reduce((acc, expense) => expense.category === "1" ? acc + expense.amount : acc + 0, 0), [state.expenses]);
  const totalSavings = isSavings;
  const remaningBudget = state?.budget - totalExpenses;

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses, remaningBudget, totalSavings }}>
      {children}
    </BudgetContext.Provider>

  )
}
