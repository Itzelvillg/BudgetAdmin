import { DraftExpense } from "../types";

export type BudgetAction = { type: "ADD_BUDGET"; payload: number }
 | { type: "SHOW_MODAL"}
 | { type: "HIDE_MODAL" }
 | { type: "ADD_EXPENSE"; payload: {expense: DraftExpense} }
 | { type: "DELETE_EXPENSE"; payload: {expense: DraftExpense} };

export type BudgetState = { budget: number, expense:number, remaining:number, isModalOpen: boolean };

export const initialBudgetState: BudgetState = {
   budget: 0,
   expense: 0,
   remaining: 0,
   isModalOpen: false
   };

   export const budgetReducer = (state: BudgetState = initialBudgetState, action: BudgetAction) => {

    if(action.type === "ADD_BUDGET") {
      return {...state, budget: action.payload};
    }
    if(action.type === "SHOW_MODAL") {
      return {...state, isModalOpen: true};
    }
    if(action.type === "HIDE_MODAL") {
      return {...state, isModalOpen: false};
    }

    return state;
   }