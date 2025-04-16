import { useMemo } from "react";
import { BudgetForm } from "./components/BudgetForm";

import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FilterByCategory } from "./components/FilterByCategory";
import { useBudgetStore } from "./store/useBudgetStore";

export const App = () => {

  const { initialBudget, resetApp, getRemaningBudget } = useBudgetStore()



  const isValidBudget = useMemo(() => +initialBudget > 0, [initialBudget]);

  const percentage = +(
    ((initialBudget - getRemaningBudget()) / initialBudget) *
    100
  ).toFixed(2);

  return (
    <div className=" min-h-screen pb-10">
      <header className=" text-center space-y-2  items-center md:justify-between justify-center py-8 max-h-72 flex justify-between px-10 border-b-1 border-slate-200 flex-col md:flex-row">
        <h1 className="uppercase text-xl md:text-4xl font-black text-gray-700">
          {" "}
          Personal Finance tracker
        </h1>

        <button
          className="bg-pink-600 w-50 md:w-50 p-2 uppercase rounded-lg text-white font-bold"
          onClick={() => resetApp()}
        >
          Reset APP
        </button>
      </header>
      <div className="flex gap-5 px-5 pb-10 flex-col md:flex-row lg:flex-row">
        <section className="container mx-auto h-fit">
          <div className=" bg-white shadow-xl shadow-slate-200 border-t-4 border-indigo-700 p-10 mt-10 rounded-lg">
            {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
          </div>
          {isValidBudget && (
            <aside className=" border-t-4 border-t-fuchsia-700 bg-white shadow-xl shadow-slate-200  mt-10 rounded-lg  space-y-10 h-100">
              <h2 className="text-2xl font-bold text-center uppercase mt-8">Budget Usage</h2>
              <CircularProgressbar
                className="h-60"
                value={percentage}
                text={`${percentage}% expensed`}
                styles={buildStyles({
                  pathColor: percentage > 100 ? "#3b82f6" : "#dc2626"
                  ,
                  trailColor: "#e2e8f0",
                  textColor: percentage > 100 ? "#3b82f6" : "#dc2626",
                  textSize: 10,
                  pathTransition: "stroke-dashoffset 0.60s ease 0s",

                })}
              />
            </aside>
          )}
        </section>

        {isValidBudget && (
          <main className="container  w-auto md:w-300 overflow-y-scroll max-h-178 bg-white shadow-xl border-t-4 border-green-600 shadow-slate-200 p-10 mt-10 rounded-lg">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}
      </div>

    </div>
  );
};
