export interface Expense {
   id: number
   description: string
   categories: string[]
   price: number
   moment: Date
}
export interface ExpenseReq {
   description: string
   price: number
   category: string
}
