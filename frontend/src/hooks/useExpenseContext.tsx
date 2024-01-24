import { useContext } from "react"
import { ExpenseContext } from "../context/expense/ExpenseContext"

export const useExpenseContext = () => {
    const expenseContext = useContext(ExpenseContext)
    return expenseContext
} 