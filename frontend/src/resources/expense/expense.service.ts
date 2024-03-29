import { api } from "../api"
import { getUserLocalStorage } from "../user/user.service"
import { Expense, ExpenseReq } from "./expense.resource"

class ExpenseService {
   baseURL: string = "/expense"

   authenticateRequests() {
      const user = getUserLocalStorage();
      if (!user || !user.accessToken) {
         throw new Error("Token de acesso ausente ou inválido");
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`;
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
   async deleteExpense(id: number) {
      this.authenticateRequests()
      return await api.delete(this.baseURL+`/delete/${id}`)
   }
   async updateExpense(expenseData: ExpenseReq, expenseId: number) {
      this.authenticateRequests()
      return await api.put(this.baseURL+`/update/${expenseId}`, expenseData)
   }
   async getAllCategories() {
      console.log('categories reloaded')
      this.authenticateRequests()
      const res = await api.get("/category")
      console.log(res.data)
      return res.data
   }
}

export const useExpenseService = () => new ExpenseService()