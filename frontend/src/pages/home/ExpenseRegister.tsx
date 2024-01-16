import { useState } from "react"
import Button from "../../components/Button"
import InputText from "../../components/input/Input"

import { useExpenseService } from "../../resources/expense/expense.service"
import InputNumber from "../../components/input/InputNumber"
import { ExpenseReq } from "../../resources/expense/expense.resource"
import { useExpense } from "../../hooks/useExpense"
import CategorySelector from "../../components/expense/CategorySelector"

const ExpenseRegister = () => {
   const [description, setDescription] = useState<string>("")
   const [price, setPrice] = useState<number>(0.0)
   const [categories, setCategories] = useState<string[]>()

   const expenseService = useExpenseService()
   const context = useExpense()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const toPersist: ExpenseReq = {
         description: description,
         price: price,
         categories: categories,
      }
      try {
         const res = await expenseService.addExpense(toPersist)
         context?.loadExpenses()

         setDescription("")
         setPrice(0.0)

         console.log(res)
      } catch (error) {
         console.error("Erro ao adicionar despesa:", error)
      }
   }

   return (
      <>
         <h2 className="text-primary text-2xl font-medium pb-5">
            Anotar despesas
         </h2>
         <form onSubmit={handleSubmit} className="space-y-3">
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Descrição:{" "}
               </label>
               <InputText
                  style="w-full"
                  placeholder="Gastou com o que ?"
                  value={description}
                  onChange={(value) => setDescription(value)}
               />
            </div>
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Valor:{" "}
               </label>
               <InputNumber
                  style="w-full"
                  placeholder="R$ 00.00"
                  value={price}
                  onChange={(value) => setPrice(value)}
               />
            </div>
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Selecione categorias
               </label>
               <CategorySelector
                  availableCategories={context?.availableCategories}
                  onCategoriesChange={setCategories}
               />
            </div>
            <Button style="w-full bg-primary" label="anotar" type="submit" />
         </form>
      </>
   )
}

export default ExpenseRegister
