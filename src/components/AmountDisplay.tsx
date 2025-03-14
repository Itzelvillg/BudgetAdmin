
type AmountDisplayProps = {
  title: string;
  amount: number;
}
export const AmountDisplay = ({ title, amount }: AmountDisplayProps) => {
  return (
    <div className="flex justify-between items-center mt-5 shadow-lg p-4 bg-slate-200 rounded-lg">
      <h2 className="text-2xl font-bold ">{title}</h2>
      <p>{amount}</p>
    </div>
  )
}
