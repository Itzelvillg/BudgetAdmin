import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";



export const BudgetTracker = () => {

  const { state, totalExpenses, remaningBudget } = useBudget();


  return (
    <>
      <h1 className="text-4xl font-black text-center text-blue-700">Budget Tracker</h1>
      < div>
        <h2 className="text-2xl font-bold">Budget: {formatCurrency(state.budget)}</h2>
        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-gray-500">Remaining:</p>
            <p className="text-3xl font-bold">{formatCurrency(remaningBudget)}</p>
          </div>
          <div>
            <p className="text-gray-500">Spent so far:</p>
            <p className="text-3xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>

      </div>
    </>
  )
}
