import { useState } from "react"
import { Expense, ExpenseReq } from "../resources/expense/expense.resource"
import { useExpenseContext } from "./useExpenseContext"
import { useExpenseService } from "../resources/expense/expense.service"
import { useParams } from "react-router-dom"

const useExpense = () => {
   const [expense, setExpense] = useState<ExpenseReq>({
      description: "",
      price: 0,
      categories: [],
   })
   const service = useExpenseService()
   const context = useExpenseContext()

   const { id } = useParams<{ id: string }>()

   const handleInputChange = (
      field: keyof ExpenseReq,
      value: string | number | string[]
   ) => {
    setExpense((prev) => ({ ...prev, [field]: value }))
   }
   const handleDelete = async () => {
      try {
         const res = await service.deleteExpense(Number(id))
         console.log(res)
         context?.loadExpenses()
      } catch (error) {
         console.error(error)
      }
   }
   const handleUpdate = async (editedExpense: ExpenseReq) => {
      try {
         console.log(editedExpense)
         const res = await service.updateExpense(editedExpense, Number(id))
         console.log(res)
         context?.loadExpenses()
      } catch (error) {
         console.error(error)
      }
   }
   const sortDescending = (expenses: Expense[]): Expense[] => {
      return expenses.sort((a, b) => a.price - b.price)
   }
   const sortAscending = (expenses: Expense[]): Expense[] => {
      return expenses.sort((a, b) => b.price - a.price)
   }

   return {
      expense,
      handleInputChange,
      handleDelete,
      handleUpdate,
      sortDescending,
      sortAscending,
   }
}

export default useExpense
