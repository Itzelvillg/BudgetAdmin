import { formatCurrency } from "../helpers";

import { useBudgetStore } from "../store/useBudgetStore";




export const BudgetTracker = () => {


  const { initialBudget, getRemaningBudget, getSavings, getTotalExpenses } = useBudgetStore();

  const percentageColor = () => {

    const total = initialBudget - getTotalExpenses();
    if (total < 0) {
      return 'text-red-500';
    } else if (total > initialBudget * 0.5) {
      return 'text-green-500';
    } else if (total > initialBudget * 0.2) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }

  }
  return (
    <>
      <div className="flex">
        <img src="presupuesto.png" alt="quick budget" className="w-15 h-15 mx-auto" />
        <h1 className="text-4xl font-black text-blue-700">Quick Budget Recap</h1>

      </div>
      < div>
        <h2 className="text-2xl font-bold">Budget: {formatCurrency(initialBudget)}</h2>
        <div className="flex items-center justify-between mt-5">
          <div className="flex flex-col items-center p-4 rounded">
            <p className="text-gray-800">Remaining:</p>
            <p className={`text-3xl font-bold ${percentageColor()}`}>{formatCurrency(getRemaningBudget())}</p>
          </div>
          <div className="flex flex-col items-center  p-4 rounded">
            <p className='text-gray-800'>Savings:</p>
            <p className={`text-3xl font-bold   ${getSavings() > 0 ? 'text-green-500' : 'text-gray-500'} `}>{formatCurrency(getSavings())}</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded">
            <p className="text-gray-800">Spent so far:</p>
            <p className="text-3xl font-bold">{formatCurrency(getTotalExpenses())}</p>
          </div>
        </div>

      </div>
    </>
  )
}
