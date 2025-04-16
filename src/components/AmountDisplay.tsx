
import { useMemo } from "react";
import { categories } from "../data/categories";
import { formatCurrency } from "../helpers";

import { Expense } from "../types";
import { useBudgetStore } from "../store/useBudgetStore";


type AmountDisplayProps = {
  expense: Expense

}

export const AmountDisplay = ({ expense }: AmountDisplayProps) => {
  const { deleteExpense, setEditingExpense, getCategoryByID, } = useBudgetStore()


  const handleDelete = () => {

    //TODO: if the expense is income reduce the income from the budget when deleting
    deleteExpense(expense.id)
  }

  const handleEdit = () => {


    setEditingExpense(expense.id)


  }

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense.category])

  const isIncomeOrSavings = getCategoryByID(categoryInfo.name) === getCategoryByID("Savings") || getCategoryByID(categoryInfo.name) === getCategoryByID("Income")


  return (
    <div className="flex bg-stone-50 w-full h-25 items-center justify-between mt-5 shadow-md shadow-slate-200 border-t-1 border-t-slate-100 rounded-lg">
      <div className={`${categoryInfo.color} w-2 h-full rounded-l-lg  p-1`}></div>
      <section className="flex justify-between w-full items-center p-5">

        <div className=" flex  gap-4 md:gap-6 justify-center items-center p-2 md:p-4">
          <img src={`${categoryInfo.icon}.png`} alt={categoryInfo.name} className="rounded-lg w-10 md:w-13 h-fit " />

          <div className="flex flex-col ">
            <p className="text-slate-600 items-end text-xs md:text-sm ">{expense.date?.toLocaleString()}</p>
            <h2 className="md:text-xl font-bold text-gray-700 ">{expense.expenseName}</h2>
            <p className={`  text-xs md:text-sm ${isIncomeOrSavings ? 'text-green-800' : 'text-red-600'} text-lg`}>{`${isIncomeOrSavings ? "+" : "-"} ${formatCurrency(+expense.amount)}`}</p>
          </div>
        </div>

        <div className="flex flex-col justify-end items-end ">
          <button className=" text-white px-2 py-1 mt-2 rounded-md" onClick={handleEdit}  ><img src="edit.png" className="w-6 h-auto" alt="edit" /> </button>
          <button className="text-white px-2 py-1 mt-2 rounded-md" onClick={handleDelete}><img src="delete.png" className="w-8 h-auto" alt="edit" /></button>

        </div>
      </section >
    </div >
  )
}
