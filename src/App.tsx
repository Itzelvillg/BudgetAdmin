import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"


export const App = () => {
  const { state, dispatch } = useBudget();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white text-center py-8 max-h-72">
        <h1 className="uppercase text-4xl font-black text-white"> budget  Administrator</h1>
      </header>
      <div className="container mx-auto bg-white shadow-lg p-10 mt-10 rounded-lg">
        <BudgetForm />
      </div>
    </div>
  )
}
