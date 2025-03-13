import { useReducer, createContext, ReactNode } from "react";
import { BudgetAction, budgetReducer, BudgetState, initialBudgetState } from "../reducers/budgetReducer";


type BudgetContextProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetAction>;
}
type BudgetProviderProps = {
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>

  )
}
