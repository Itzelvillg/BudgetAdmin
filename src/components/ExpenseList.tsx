import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
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
      {isEmpty || filteredExpenses.length <= 0 ? <p className="text-2xl font-bold ">No expenses yet</p> :

        filteredExpenses.map((expenseItem) =>
          <AmountDisplay key={expenseItem.id} expense={expenseItem} />

        )
      }</div>
  )
}
