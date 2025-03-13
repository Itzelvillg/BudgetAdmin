export type BudgetAction = { type: "ADD_BUDGET"; payload: number };

export type BudgetState = { budget: number };

export const initialBudgetState: BudgetState = {
   budget: 0
   };

   export const budgetReducer = (state: BudgetState = initialBudgetState, action: BudgetAction) => {

    if(action.type === "ADD_BUDGET") {
      return {...state, budget: action.payload};
    }

    return state;
   }