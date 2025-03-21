
import { useMemo } from "react";
import { categories } from "../data/categories";
import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import { Expense } from "../types";


type AmountDisplayProps = {
  expense: Expense

}
export const AmountDisplay = ({ expense }: AmountDisplayProps) => {

  const { dispatch } = useBudget()
  const handleDelete = () => {
    dispatch({ type: "DELETE_EXPENSE", payload: { expense } })
  }

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], categories)
  const isSavings = categoryInfo?.icon === "savings"


  return (
    <div className="flex w-150 h-30 items-center mt-5 shadow-md shadow-slate-200 border-t-1 border-t-slate-100 rounded-lg">
      <div className={`${categoryInfo.color} w-2 h-full rounded-l-lg  p-2`}></div>
      <section className="flex justify-between w-full items-center p-5">

        <div className=" flex gap-6 justify-center items-center p-4">
          <img src={`${categoryInfo.icon}.png`} alt={categoryInfo.name} className="rounded-lg w-10 h-fit " />

          <div className="flex flex-col gap-2">
            <p className="text-slate-600  ">{expense.date?.toLocaleString()}</p>
            <h2 className="text-2xl font-bold font- ">{expense.expenseName}</h2>
            <p className={`${isSavings ? 'text-green-800' : 'text-red-600'} text-lg`}>{`${isSavings ? "+" : "-"} ${formatCurrency(+expense.amount)}`}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <button className="bg-slate-400 text-white px-2 py-1 mt-2 rounded-md">Edit</button>
          <button className="bg-red-400 text-white px-2 py-1 mt-2 rounded-md" onClick={handleDelete}>Delete</button>

        </div>
      </section>
    </div>
  )
}
