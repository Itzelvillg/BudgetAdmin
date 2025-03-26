import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";



export const BudgetTracker = () => {

  const { state, dispatch, totalExpenses, remaningBudget } = useBudget();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <img src="https://img.icons8.com/office/452/money.png" alt="money" className="w-40 h-40" />
        </div>
        <div className="flex flex-col justify-end items-center gap-8">
          <button className="bg-pink-600 w-full p-2 uppercase rounded-lg text-white font-bold" onClick={() => dispatch({ type: "RESET_APP" })}>Reset APP</button>
        </div>
      </div>
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
