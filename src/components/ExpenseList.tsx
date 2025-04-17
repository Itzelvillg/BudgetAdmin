import { useMemo } from "react";

import { AmountDisplay } from "./AmountDisplay";
import { useBudgetStore } from "../store/useBudgetStore";


export const ExpenseList = () => {


  const expenses = useBudgetStore(state => state.expenses);
  const currentCategory = useBudgetStore(state => state.currentCategory);

  const filteredExpenses = currentCategory ? expenses.filter(expense => expense.category === currentCategory) : expenses
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
  return (
    <div className=" ">
      {!isEmpty || filteredExpenses.length > 0 && <h2 className="text-2xl font-bold  uppercase">Expenses list</h2>}
      {isEmpty || filteredExpenses.length <= 0 ? <p className="text-xl font-bold text-gray-700 mt-10 w-full border-b-1 pb-2 border-gray-300 "> No expenses or incomes yet 😴 </p> :

        filteredExpenses.map((expenseItem) =>
          <AmountDisplay key={expenseItem.id} expense={expenseItem} />

        )
      }</div>
  )
}
