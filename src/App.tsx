import { useMemo } from "react";
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";


export const App = () => {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => +state.budget > 0, [state.budget])

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white text-center py-8 max-h-72">
        <h1 className="uppercase text-4xl font-black text-white"> budget  Administrator</h1>
      </header>
      <div className="flex gap-5 px-5">

        <div className="container mx-auto h-fit bg-white shadow-lg p-10 mt-10 rounded-lg">

          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
        </div>
        {isValidBudget &&

          <main className="container mx-auto overflow-y-scroll h-200 bg-white shadow-lg p-10 mt-10 rounded-lg">

            <ExpenseList />
            <ExpenseModal />

          </main>}
      </div>
    </div>
  )
}
