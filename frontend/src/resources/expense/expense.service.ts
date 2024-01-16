import { api } from "../api"
import { getUserLocalStorage } from "../user/user.service"
import { Expense, ExpenseReq } from "./expense.resource"

class ExpenseService {
   baseURL: string = "/expense"

   async getAllExpenses(): Promise<Expense[]> {
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
      const res = await api.get(this.baseURL+"/all")
      return res.data
   }

   async addExpense(data: ExpenseReq): Promise<Expense> {
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
      return await api.post(this.baseURL+"/add", data)
   }
   async deleteExpense(expenseId: number) {
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
      return await api.delete(this.baseURL+`/delete/${expenseId}`)
   }

   async getAllCategories() {
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
      const res = await api.get("/category")
      return res.data
   }
}

export const useExpenseService = () => new ExpenseService()