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
      <div className="flex justify-center gap-5 items-center mb-5 ">
        <img src="presupuesto.png" alt="quick budget" className=" w-10 h-10 md:w-12 md:h-12 " />
        <h1 className="text-xl md:text-4xl font-black text-blue-700 ">Quick Budget Recap</h1>

      </div>
      < div className="flex flex-col items-center  md:items-stretch">
        <p className="text-xl md:text-2xl font-bold text-gray-700">Budget: <span className="text-1xl border-b-2 rounded border-b-slate-300">{formatCurrency(initialBudget)}</span></p>
        <div className="flex justify-center mt-5 gap-8 ">
          <div className="flex flex-col  md:p-4 rounded">
            <p className="text-gray-700">Remaining:</p>
            <p className={`text-xl md:text-3xl font-bold ${percentageColor()}`}>{formatCurrency(getRemaningBudget())}</p>
          </div>
          <div className="flex flex-col   md:p-4 rounded">
            <p className='text-gray-800'>Savings:</p>
            <p className={`text-xl md:text-3xl font-bold   ${getSavings() > 0 ? 'text-green-500' : 'text-gray-700'} `}>{formatCurrency(getSavings())}</p>
          </div>
          <div className="flex flex-col  md:p-4 rounded">
            <p className="text-gray-700">Spent so far:</p>
            <p className="text-xl md:text-3xl font-bold text-gray-700">{formatCurrency(getTotalExpenses())}</p>
          </div>
        </div>

      </div>
    </>
  )
}
