import { DraftExpense, Expense } from "../types";
import {v4 as uuidv4} from 'uuid'


export type BudgetAction = { type: "ADD_BUDGET"; payload: number }
 | { type: "SHOW_MODAL"}
 | { type: "HIDE_MODAL" }
 | { type: "ADD_EXPENSE"; payload: {expense: DraftExpense} }
 | { type: "DELETE_EXPENSE"; payload: {expense: DraftExpense} };

export type BudgetState = { budget: number, expenses:Expense[], remaining:number, isModalOpen: boolean };

export const initialBudgetState: BudgetState = {
   budget: 0,
   expenses:[],
   remaining: 0,
   isModalOpen: false
   };


const createExpense = (expense: DraftExpense): Expense => {
  return {
    ...expense,
    id: uuidv4()

  }

}

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
    if (action.type === "ADD_EXPENSE") {

      const newExpense = createExpense( action.payload.expense)
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
        isModalOpen: false,
        
      };
    }

    return state;
   }