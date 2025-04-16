
import { categories } from "../data/categories"

import { useBudgetStore } from "../store/useBudgetStore";
export const FilterByCategory = () => {

  const setCurrentCategory = useBudgetStore(state => state.setCurrentCategory);
  const currentCategory = useBudgetStore(state => state.currentCategory);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value)

  }

  return (


    <form className="flex gap-5 mb-5p-5 rounded-br-lg  w-fit">
      <label htmlFor="category" className=" font-bold uppercase self-center  ">Filter by category</label>
      <select value={currentCategory} onChange={handleSelectCategory} className="text-gray-800 w-fit p-2 border-2 bg-slate-50   border-gray-100 rounded-lg  ">
        <option value="" id="category">--All categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id} className="text-gray-800" id={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  )
}
