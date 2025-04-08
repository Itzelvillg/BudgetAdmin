
import { categories } from "../data/categories"

import { useBudgetStore } from "../store/useBudgetStore";
export const FilterByCategory = () => {

  const setCurrentCategory = useBudgetStore(state => state.setCurrentCategory);
  const currentCategory = useBudgetStore(state => state.currentCategory);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value)

  }

  return (


    <form className="flex gap-5 mb-5 bg-cyan-900 p-5 rounded-br-lg shadow-lg text-white w-fit">
      <label htmlFor="category" className=" font-bold uppercase self-center  ">Filter by category</label>
      <select value={currentCategory} onChange={handleSelectCategory} className="text-black w-fit p-2 border-2 bg-slate-50 border-gray-300 rounded-lg ">
        <option value="" id="category">--All categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id} className="text-black" id={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  )
}
