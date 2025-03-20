
import { categories } from "../data/categories";
import { formatCurrency } from "../helpers";
import { Expense } from "../types";


type AmountDisplayProps = {
  expense: Expense

}
export const AmountDisplay = ({ expense }: AmountDisplayProps) => {


  const iconCategory = () => {
    const categoryIcon = categories.find((category) => category.id === expense.category)?.icon.toLocaleLowerCase().trim()
    const categoryColor = categories.find((category) => category.id === expense.category)?.color
    console.log(categoryColor)
    return [categoryIcon, categoryColor]
  }

  const isSavings = iconCategory()[0] === 'savings'
  const categoryColor = iconCategory()[1]
  console.log(typeof isSavings)
  return (
    <div className="flex  h-30 items-center mt-5 shadow-md shadow-slate-200 border-t-1 border-t-slate-100 rounded-lg">
      <div className={`${categoryColor} w-2 h-full rounded-l-lg  p-2`}></div>
      <section className="flex justify-between w-full items-center p-5">

        <div className=" flex gap-6 justify-center items-center p-4">
          <img src={`${iconCategory()[0]}.png`} alt={iconCategory()[0]} className="rounded-lg w-10 h-fit " />

          <div className="flex flex-col gap-2">
            <p className="text-slate-600 ">{expense.date?.toLocaleString()}</p>
            <h2 className="text-2xl font-bold ">{expense.expenseName}</h2>
            <p className={`${isSavings ? 'text-green-800' : 'text-red-600'}`}>{`${isSavings ? "+" : "-"} ${formatCurrency(+expense.amount)}`}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <button className="bg-slate-400 text-white px-2 py-1 mt-2 rounded-md">Edit</button>
          <button className="bg-red-400 text-white px-2 py-1 mt-2 rounded-md">Delete</button>

        </div>
      </section>
    </div>
  )
}
