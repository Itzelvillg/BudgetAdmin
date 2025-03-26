import { useReducer, createContext, ReactNode, useMemo } from "react";
import { BudgetAction, budgetReducer, BudgetState, initialBudgetState } from "../reducers/budgetReducer";



type BudgetContextProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetAction>;
  remaningBudget: number;
  totalExpenses: number;
}
type BudgetProviderProps = {
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);

  const totalExpenses = useMemo(() => state.expenses.reduce((acc, expense) => acc + expense.amount, 0), [state.expenses]);
  const remaningBudget = state?.budget - totalExpenses;

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses, remaningBudget }}>
      {children}
    </BudgetContext.Provider>

  )
}
