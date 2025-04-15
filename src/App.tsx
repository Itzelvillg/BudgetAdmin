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

  const { budget, resetApp, getRemaningBudget } = useBudgetStore()



  const isValidBudget = useMemo(() => +budget > 0, [budget]);

  const percentage = +(
    ((budget - getRemaningBudget()) / budget) *
    100
  ).toFixed(2);

  return (
    <div className=" min-h-screen">
      <header className=" text-center py-8 max-h-72 flex justify-between px-10 border-b-1 border-slate-200 ">
        <h1 className="uppercase text-4xl font-black text-black">
          {" "}
          Personal Finance tracker
        </h1>

        <button
          className="bg-pink-600 w-50 p-2 uppercase rounded-lg text-white font-bold"
          onClick={() => resetApp()}
        >
          Reset APP
        </button>
      </header>
      <div className="flex gap-5 px-5">
        <section className="container mx-auto h-fit">
          <div className=" bg-white shadow-xl shadow-slate-200 border-t-4 border-indigo-700 p-10 mt-10 rounded-lg">
            {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
          </div>
          {isValidBudget && (
            <aside className=" bg-white shadow-xl shadow-slate-200 p-10 mt-10 rounded-lg  space-y-10 h-132">
              <h2 className="text-2xl font-bold text-center uppercase">Budget Usage</h2>
              <CircularProgressbar
                className="h-80"
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
          <main className="container w-300 overflow-y-scroll h-200 bg-white shadow-xl border-t-4 border-amber-700 shadow-slate-200 p-10 mt-10 rounded-lg">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}
      </div>

    </div>
  );
};
