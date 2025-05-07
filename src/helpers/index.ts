import * as XLSX from "xlsx";
type expenseXlsx = {
  "Expense Name": string;
  Amount: number;
  Date: string | undefined;
  Category: string;
};
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(+amount);
};

export const dataToXLSX = (data: expenseXlsx[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [["Expense Name", "Amount", "Date", "Category"]],
    { origin: "A1" }
  );

  XLSX.writeFile(workbook, "PersonalBudget.xlsx");
};
