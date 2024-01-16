import { api } from "../api"
import { getUserLocalStorage } from "../user/user.service"
import { Expense, ExpenseReq } from "./expense.resource"

class ExpenseService {
   baseURL: string = "/expense"

   authenticateRequests(){
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
   }

   async getAllExpenses(): Promise<Expense[]> {
      this.authenticateRequests()
      const res = await api.get(this.baseURL+"/all")
      return res.data
   }

   async addExpense(data: ExpenseReq): Promise<Expense> {
      this.authenticateRequests()
      return await api.post(this.baseURL+"/add", data)
   }
   async deleteExpense(expenseId: number) {
      this.authenticateRequests()
      return await api.delete(this.baseURL+`/delete/${expenseId}`)
   }

   async getAllCategories() {
      this.authenticateRequests()
      const res = await api.get("/category")
      return res.data
   }
}

export const useExpenseService = () => new ExpenseService()