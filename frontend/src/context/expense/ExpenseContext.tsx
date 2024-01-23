/* eslint-disable react-hooks/exhaustive-deps */
import { Category, Expense } from "../../resources/expense/expense.resource"
import { createContext, useEffect, useState } from "react"
import { useExpenseService } from "../../resources/expense/expense.service"
import { useAuth } from "../../hooks/useAuth"

export const ExpenseContext = createContext<IExpenseContext | null>(null)

export const ExpenseProvider = ({ children }: IAuthProvider) => {
   const [expenses, setExpenses] = useState<Expense[] | null>(null)
   const [availableCategories, setAvailableCategories] = useState<Category[] | null>(null)

   const expenseService = useExpenseService()
   const auth = useAuth()

   const loadExpenses = async () => {
      try {
         const res = await expenseService.getAllExpenses()
         setExpenses(res)
      } catch (error) {
         console.error("Expense Error", error)
      }
   }

   const getExpenseById = (expenseId: number): Expense | undefined => {
      return expenses?.find((expense) => expense.id === expenseId)
   }

   const loadCategories = async () => {
      try {
         const res = await expenseService.getAllCategories()
         setAvailableCategories(res)
      } catch (error) {
         console.error("Category error:", error)
      }
   }

   useEffect(() => {
      if(auth?.isAuthenticate){
         loadCategories()
         loadExpenses()
      }
   }, [auth?.isAuthenticate])

   const contextValue: IExpenseContext = {
      expenses,
      availableCategories,
      loadExpenses,
      getExpenseById,
      loadCategories,
   }

   return (
      <ExpenseContext.Provider value={contextValue}>
         {children}
      </ExpenseContext.Provider>
   )
}

export interface IExpenseContext {
   expenses: Expense[] | null
   availableCategories: Category[] | null
   loadExpenses: () => void
   getExpenseById: (expenseId: number) => Expense | undefined
   loadCategories: () => void
}

export interface IAuthProvider {
   children: JSX.Element
}
