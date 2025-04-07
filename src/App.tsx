import { useEffect, useMemo } from "react";
import { BudgetForm } from "./components/BudgetForm";

import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FilterByCategory } from "./components/FilterByCategory";
import { useBudgetStore } from "./store/useBudgetStore";

export const App = () => {

  const { budget, expenses, resetBudget, remaningBudget } = useBudgetStore()

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [budget, expenses]);

  const isValidBudget = useMemo(() => +budget > 0, [budget]);

  const percentage = +(
    ((budget - remaningBudget()) / budget) *
    100
  ).toFixed(2);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white text-center py-8 max-h-72 flex justify-between px-10">
        <h1 className="uppercase text-4xl font-black text-white">
          {" "}
          Personal Finance tracker
        </h1>

        <button
          className="bg-pink-600 w-50 p-2 uppercase rounded-lg text-white font-bold"
          onClick={() => resetBudget()}
        >
          Reset APP
        </button>
      </header>
      <div className="flex gap-5 px-5">
        <section className="container mx-auto h-fit">
          <div className=" bg-white shadow-lg p-10 mt-10 rounded-lg">
            {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
          </div>
          {isValidBudget && (
            <aside className=" bg-white shadow-lg p-10 mt-10 rounded-lg  space-y-10 h-132">
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
          <main className="container mx-auto overflow-y-scroll h-200 bg-white shadow-lg p-10 mt-10 rounded-lg">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}
      </div>

    </div>
  );
};
