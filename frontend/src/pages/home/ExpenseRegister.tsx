import Button from "../../components/Button"
import InputText from "../../components/input/Input"
import InputNumber from "../../components/input/InputNumber"
import CategorySelector from "../../components/expense/CategorySelector"

import { useExpenseService } from "../../resources/expense/expense.service"
import { useExpenseContext } from "../../hooks/useExpenseContext"
import useExpense from "../../hooks/useExpense"

const ExpenseRegister = () => {

   const expenseService = useExpenseService()
   const context = useExpenseContext()
   const {handleInputChange, expense} = useExpense()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         const res = await expenseService.addExpense(expense)
         context?.loadExpenses()
         console.log(res)
      } catch (error) {
         console.error("Couldnt add expense:", error)
      }
   }

   return (
      <>
         <h2 className="text-primary text-2xl font-medium pb-5">
            Anotar despesas
         </h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Descrição:
               </label>
               <InputText
                  style="w-full"
                  placeholder="Gastou com o que?"
                  value={expense.description}
                  onChange={(value) => handleInputChange("description",value)}
               />
            </div>
            <div className="mb-4">
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Valor:
               </label>
               <InputNumber
                  style="w-full"
                  placeholder="0.00"
                  value={expense.price}
                  onChange={(value) => handleInputChange("price",value)}
               />
            </div>
            <div className="mb-4">
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Selecione categorias
               </label>
               <CategorySelector
                  availableCategories={context?.availableCategories}
                  onCategoriesChange={(value) => handleInputChange("categories", value)}
               />
            </div>
            <Button
               style="w-3/4 bg-primary xl:w-full lg:w-full "
               label="Anotar"
               type="submit"
            />
         </form>
      </>
   )
}

export default ExpenseRegister
