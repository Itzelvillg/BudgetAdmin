import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";


export const ExpenseList = () => {

  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  return (
    <div className="space-y-5 h-96 overflow-y-scroll flex flex-wrap  justify-between"> {isEmpty ? <p className="text-center text-2xl font-bold ">No expenses yet</p> :
      state.expenses.map((expenseItem) =>
        <AmountDisplay key={expenseItem.id} expense={expenseItem} />

      )
    }</div>
  )
}
