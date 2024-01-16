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
         if (auth?.token) {
            const res = await expenseService.getAllExpenses()
            console.log(res)
            setExpenses(res)
         }
      } catch (error) {
         console.error("Erro ao carregar despesas:", error)
      }
   }

   const getExpenseById = (expenseId: number): Expense | undefined => {
      return expenses?.find((expense) => expense.id === expenseId)
   }

   const loadCategories = async () => {
      try {
         if (auth?.token) {
            const res = await expenseService.getAllCategories()
            console.log(res)
            setAvailableCategories(res)
         }
      } catch (error) {
         console.error("Erro ao carregar categorias:", error)
      }
   }

   useEffect(() => {
      loadCategories()
   }, [auth])
   useEffect(() => {
      loadExpenses()
   }, [auth])

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
