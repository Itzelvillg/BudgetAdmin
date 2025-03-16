import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export const ExpenseForm = () => {
  return (
    <form className="space-y-5 ">
      <legend className="text-2xl font-black text-center uppercase border-b-4 border-blue-500 py-2 ">Add Expense</legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="expense" className=" text-2xl">Expense name</label>
        <input type="text" id="expenseName" name="expenseName" placeholder="Add the name of your expense" className="p-2 border  bg-slate-100 border-slate-300 rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className=" text-2xl">Expense amount</label>
        <input type="number" id="expenseAmount" name="expenseAmount" placeholder="Add the amount" className="p-2 border bg-slate-100 border-slate-300 rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className=" text-2xl">Date of expense</label>
        <DatePicker
          id="date"
          name="date"
          className="p-2 border bg-slate-100 border-slate-300 rounded-md"
        />

      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className=" text-2xl">Category</label>
        <select id="category" name="category" className="p-2 border bg-slate-100 border-slate-300 rounded-md ">
          <option value="">-- Select a category --</option>
          {categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
        </select>
      </div>
      <input type="submit" value="Add Expense" className="bg-blue-500 font-bold text-xl text-white p-2 rounded-md  w-full cursor-pointer hover:bg-blue-600" />
    </form>
  )
}
