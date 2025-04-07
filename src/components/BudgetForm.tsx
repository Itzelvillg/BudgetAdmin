import { useMemo, useState } from "react";

import { useBudgetStore } from "../store/useBudgetStore";


export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const addBudget = useBudgetStore(state => state.addBudget);

  ;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBudget(budget)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center uppercase" >Define Budget</label>
        <input value={budget} onChange={handleChange} name="budget" id="budgetID" type="budget" placeholder="Budget" className="w-full border border-gray-300 p-2 rounded-lg" />
      </div>

      <input type="submit" disabled={isValid} value={isValid ? "Please define a valid Budget" : "Define your budget"} className="w-full p-2 border bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer uppercase text-white font-black" />
    </form>
  )
}
