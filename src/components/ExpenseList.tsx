import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";


export const ExpenseList = () => {

  const { state } = useBudget();

  const isEmpty = state.expenses.length === 0;

  return (
    <div> {isEmpty ? <p className="text-center text-2xl">No expenses yet</p> :
      state.expenses.map((expenseItem) =>
        <AmountDisplay key={expenseItem.id} title={expenseItem.expenseName} amount={expenseItem.amount} />

      )
    }</div>
  )
}
