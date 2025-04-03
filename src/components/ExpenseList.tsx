import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";


export const ExpenseList = () => {

  const { state } = useBudget();

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
  return (
    <div className=" ">
      {!isEmpty || filteredExpenses.length > 0 && <h2 className="text-2xl font-bold  uppercase">Expenses list</h2>}
      {isEmpty || filteredExpenses.length <= 0 ? <p className="text-2xl font-bold ">No expenses yet</p> :

        filteredExpenses.map((expenseItem) =>
          <AmountDisplay key={expenseItem.id} expense={expenseItem} />

        )
      }</div>
  )
}
