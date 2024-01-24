import { useState } from "react"
import { ExpenseReq } from "../resources/expense/expense.resource"
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

   return {
      expense,
      handleInputChange,
      handleDelete,
      handleUpdate,
   }
}

export default useExpense
