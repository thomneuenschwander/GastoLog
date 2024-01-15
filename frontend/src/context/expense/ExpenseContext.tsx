import { Expense } from "../../resources/expense/expense.resource"
import { createContext, useEffect, useState } from "react"
import { useExpenseService } from "../../resources/expense/expense.service"
import { useAuth } from "../../hooks/useAuth"

export const ExpenseContext = createContext<IExpenseContext | null>(null)

export const ExpenseProvider = ({ children }: IAuthProvider) => {
   const [expenses, setExpenses] = useState<Expense[] | null>(null)

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

   useEffect(() => {
      loadExpenses()
   }, [auth])

   const contextValue: IExpenseContext = {
      expenses,
      loadExpenses,
      getExpenseById,
   }

   return (
      <ExpenseContext.Provider value={contextValue}>
         {children}
      </ExpenseContext.Provider>
   )
}

export interface IExpenseContext {
   expenses: Expense[] | null
   loadExpenses: () => void
   getExpenseById: (expenseId: number) => Expense | undefined
}

export interface IAuthProvider {
   children: JSX.Element
}
