import { useEffect, useState } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";

import { useBudgetStore } from "../store/useBudgetStore";
import { v4 as uuidv4 } from "uuid";

export const ExpenseForm = () => {

  const [error, setError] = useState<string | null>(null);
  const [expense, setExpense] = useState<DraftExpense>({ expenseName: "", amount: 0, date: new Date(), category: "" })

  const [previousAmount, setPreviousAmount] = useState<number>(0)
  const { addExpenses, getRemaningBudget, updateExpense } = useBudgetStore()


  const { editingExpense, expenses, getCategoryByID, addIncome } = useBudgetStore()



  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmount = name.includes("amount")

    setExpense({ ...expense, [name]: isAmount ? +value : value })
  }

  const handleDate = (value: Value) => {
    setExpense({ ...expense, date: value })
  }

  useEffect(() => {
    if (editingExpense) {

      const currentExpense = expenses.filter(currentExp => currentExp.id === editingExpense)[0]
      setExpense(currentExpense)
      setPreviousAmount(currentExpense.amount)
    }

  }, [editingExpense])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isIncomeOrSavings = getCategoryByID(expense.category) === getCategoryByID("Savings") || getCategoryByID(expense.category) === getCategoryByID("Income")
    const isIncome = getCategoryByID(expense.category) === getCategoryByID("Income")

    if (Object.values(expense).includes("")) {
      setError("Please fill all the fields")

      return
    }

    if ((expense.amount - previousAmount) > getRemaningBudget() && !isIncomeOrSavings) {
      setError("You can exceed the remaining budget")
      return
    }
    setError(null)

    if (editingExpense) {
      const currentEditingExpense = { ...expense, id: editingExpense }


      //update
      updateExpense(currentEditingExpense)
      return
    }


    if (isIncome) {
      addIncome(expense.amount)
    }
    const newExpense = { ...expense, id: uuidv4() }
    addExpenses(newExpense)

    setExpense({ expenseName: "", amount: 0, date: new Date(), category: "" })
    setPreviousAmount(0)

  }

  return (
    <form className="space-y-5 " onSubmit={handleSubmit}>
      <legend className="text-2xl font-black text-center uppercase border-b-4 border-blue-500 py-2 ">{editingExpense ? "Update Expense" : "New Expense"}</legend>
      {error && <ErrorMessage > {error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expense" className=" text-2xl">Expense name</label>
        <input onChange={handleChange} value={expense.expenseName} type="text" id="expenseName" name="expenseName" placeholder="Add the name of your expense" className="p-2 border  bg-slate-100 border-slate-300 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className=" text-2xl">Expense amount</label>
        <input onChange={handleChange} value={expense.amount} type="number" id="amount" name="amount" className="p-2 border bg-slate-100 border-slate-300 rounded-md" />
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
      <input type="submit" value={editingExpense ? "Update Expense" : "Add Expense"} className="bg-blue-500 font-bold text-xl text-white p-2 rounded-md  w-full cursor-pointer hover:bg-blue-600" />
    </form>
  )
}
