
import { categories } from "../data/categories"

import { useBudgetStore } from "../store/useBudgetStore";
export const FilterByCategory = () => {

  const setCurrentCategory = useBudgetStore(state => state.setCurrentCategory);
  const currentCategory = useBudgetStore(state => state.currentCategory);
  const saveXsxl = useBudgetStore(state => state.saveXsxl);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value)

  }

  return (


    <form className="flex  flex-col  gap-5 md:flex-row md:justify-between  rounded-br-lg  w-full">
      <div className=" flex gap-4">

        <label htmlFor="category" className=" font-bold uppercase self-center  ">Filter by category</label>
        <select value={currentCategory} onChange={handleSelectCategory} className="text-gray-800 w-fit p-2 border-2 bg-slate-50   border-gray-100 rounded-lg  ">
          <option value="" id="category">--All categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id} className="text-gray-800" id={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-pink-500 hover:bg-pink-600 w-full md:w-auto p-2 uppercase rounded-lg text-white font-bold self-end" onClick={saveXsxl}>
        💾 Save as Excel </button>
    </form>

  )
}
