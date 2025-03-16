type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];



export type Expense = {
  id:string
  expenseName:string
  amount:number
  date:Value
  category:string

}

export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
  id:string
  name:string 
  icon:string
}