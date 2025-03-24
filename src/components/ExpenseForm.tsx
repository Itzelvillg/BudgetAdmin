import { useEffect, useState } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({ expenseName: "", amount: 0, date: new Date(), category: "" })
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmount = name.includes("amount")

    setExpense({ ...expense, [name]: isAmount ? +value : value })
  }

  const handleDate = (value: Value) => {
    setExpense({ ...expense, date: value })
  }

  useEffect(() => {
    if (state.editingExpense) {

      const currentExpense = state.expenses.filter(currentExp => currentExp.id === state.editingExpense)[0]
      setExpense(currentExpense)
    }

  }, [state.editingExpense])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Please fill all the fields")
      return
    }
    setError(null)
    dispatch({ type: "ADD_EXPENSE", payload: { expense } })

  }

  return (
    <form className="space-y-5 " onSubmit={handleSubmit}>
      <legend className="text-2xl font-black text-center uppercase border-b-4 border-blue-500 py-2 ">{state.editingExpense ? "Update Expense" : "New Expense"}</legend>
      {error && <ErrorMessage > {error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expense" className=" text-2xl">Expense name</label>
        <input onChange={handleChange} value={expense.expenseName} type="text" id="expenseName" name="expenseName" placeholder="Add the name of your expense" className="p-2 border  bg-slate-100 border-slate-300 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className=" text-2xl">Expense amount</label>
        <input onChange={handleChange} value={expense.amount} type="number" id="amount" name="amount" placeholder="Add the amount" className="p-2 border bg-slate-100 border-slate-300 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className=" text-2xl">Category</label>
        <select id="category" onChange={handleChange} value={expense.category} name="category" className="p-2 border bg-slate-100 border-slate-300 rounded-md ">
          <option value="">-- Select a category --</option>
          {categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className=" text-2xl">Date of expense</label>
        <DatePicker
          id="date"
          name="date"
          className="p-2 border bg-slate-100 border-slate-300 rounded-md"
          value={expense.date}
          onChange={handleDate}
        />

      </div>
      <input type="submit" value={state.editingExpense ? "Update Expense" : "Add Expense"} className="bg-blue-500 font-bold text-xl text-white p-2 rounded-md  w-full cursor-pointer hover:bg-blue-600" />
    </form>
  )
}
