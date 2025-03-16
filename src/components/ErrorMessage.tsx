type ErrorMessageProps = {
  children: React.ReactNode
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="text-xl  text-white bg-red-600 font-">{children}</div>
  )
}
