import { useContext } from "react"
import { ExpenseContext } from "../context/expense/ExpenseContext"

export const useExpense = () => {
    const expenseContext = useContext(ExpenseContext)
    return expenseContext
} 