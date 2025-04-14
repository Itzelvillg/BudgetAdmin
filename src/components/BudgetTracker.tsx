import { formatCurrency } from "../helpers";

import { useBudgetStore } from "../store/useBudgetStore";



export const BudgetTracker = () => {


  const { initialBudget, getRemaningBudget, getSavings, getTotalExpenses } = useBudgetStore();
  return (
    <>
      <h1 className="text-4xl font-black text-center text-blue-700">Budget Tracker</h1>
      < div>
        <h2 className="text-2xl font-bold">Budget: {formatCurrency(initialBudget)}</h2>
        <div className="flex items-center justify-between mt-5">
          <div className="flex flex-col items-center bg-green-900 p-4 rounded text-white">
            <p className="text-gray-500">Remaining:</p>
            <p className="text-3xl font-bold">{formatCurrency(getRemaningBudget())}</p>
          </div>
          <div className="flex flex-col items-center bg-green-900 p-4 rounded text-white">
            <p className="text-gray-500">Savings:</p>
            <p className="text-3xl font-bold">{formatCurrency(getSavings())}</p>
          </div>
          <div className="flex flex-col items-center bg-black p-4 rounded text-white">
            <p className="text-gray-500">Spent so far:</p>
            <p className="text-3xl font-bold">{formatCurrency(getTotalExpenses())}</p>
          </div>
        </div>

      </div>
    </>
  )
}
