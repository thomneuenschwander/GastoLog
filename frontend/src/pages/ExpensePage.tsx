// ExpensePage.tsx
import { useParams, NavLink } from "react-router-dom"
import Template from "../components/templates/Template"
import { useExpense } from "../hooks/useExpense"
import { useEffect, useState } from "react"
import { ExpenseReq } from "../resources/expense/expense.resource"
import InputEdit from "../components/input/inputEdit"
import { useExpenseService } from "../resources/expense/expense.service"
import CategorySelector from "../components/expense/CategorySelector"
import Highlight from "../components/Highlight"

const ExpensePage: React.FC = () => {
   const [categories, setCategories] = useState<string[]>()
   const [editMode, setEditMode] = useState<boolean>(false)
   const [editedExpense, setEditedExpense] = useState<ExpenseReq>({
      description: "",
      price: 0,
   })

   const { id } = useParams<{ id: string }>()
   const context = useExpense()
   const service = useExpenseService()

   const expense = context?.getExpenseById(Number(id))

   useEffect(() => {
      if (expense) {
         setEditedExpense({
            description: expense.description,
            price: expense.price,
            categories: expense.categories,
         })
      }
   }, [expense])

   const handleInputChange = (
      field: keyof ExpenseReq,
      value: string | number
   ) => {
      setEditedExpense((prev) => ({ ...prev, [field]: value }))
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

   const handleUpdate = async (
      newExpense: ExpenseReq,
      categories: string[] | undefined
   ) => {
      try {
         newExpense.categories = categories
         console.log(newExpense)
         const res = await service.updateExpense(newExpense, Number(id))
         console.log(res)
         context?.loadExpenses()
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <Template>
         {expense ? (
            <div className="flex flex-col items-center justify-center text-lg m-20">
               <ul className="flex justify-around mb-4 w-full">
                  <NavLink to="/home">
                     <li className="bg-gray-500 p-5 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded">
                        VOLTAR
                     </li>
                  </NavLink>
                  {editMode ? (
                     <>
                        <li className="bg-green-500 p-5 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded">
                           <button
                              type="submit"
                              className="w-full h-full"
                              onClick={() => {
                                 handleUpdate(editedExpense, categories)
                                 setEditMode(false)
                              }}
                           >
                              SALVAR
                           </button>
                        </li>

                        <li
                           className="bg-gray-400 p-5 px-8 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded"
                           onClick={() => {
                              setEditMode(false)
                              setEditedExpense({
                                 description: expense.description,
                                 price: expense.price,
                                 categories: expense.categories,
                              })
                           }}
                        >
                           X
                        </li>
                     </>
                  ) : (
                     <li
                        className="bg-blue-500 p-5 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded"
                        onClick={() => setEditMode(true)}
                     >
                        EDITAR
                     </li>
                  )}
                  <NavLink to="/home">
                     <li
                        className="bg-red-500 p-5 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded"
                        onClick={handleDelete}
                     >
                        DELETAR
                     </li>
                  </NavLink>
               </ul>

               <div className="bg-white p-6 rounded-lg shadow-md w-full mt-3">
                  <h2 className="text-primary text-center text-3xl font-bold mb-6 text-gray-800">
                     Detalhes da Despesa
                  </h2>
                  <ul className="grid grid-cols-3 gap-5 gap-10 text-2xl mt-20 text-start ">
                     <li className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                           <strong>Descrição:</strong>{" "}
                           {editMode ? (
                              <InputEdit
                                 value={editedExpense.description}
                                 onChange={(value) =>
                                    handleInputChange("description", value)
                                 }
                                 editMode={editMode}
                              />
                           ) : (
                              <span className="text-gray-700">
                                 {expense.description}
                              </span>
                           )}
                        </div>
                     </li>
                     <li className="col-span-2 md:col-span-1">
                        <div
                           className={
                              editMode
                                 ? "text-xl mb-4"
                                 : "text-2xl text-primary mb-4"
                           }
                        >
                           <strong>Preço: </strong>
                           {editMode ? (
                              <>R$ </>
                           ) : (
                              <Highlight style="text-primary-500 hover:text-red-500 transition-all duration-300">
                                 R${" "}
                              </Highlight>
                           )}
                           {editMode ? (
                              <InputEdit
                                 value={editedExpense.price}
                                 onChange={(value) =>
                                    handleInputChange("price", value)
                                 }
                                 editMode={editMode}
                              />
                           ) : (
                              <span className="text-gray-700">
                                 <Highlight style="text-blue-500 hover:text-red-500 transition-all duration-300">
                                    {expense.price.toFixed(2)}
                                 </Highlight>
                              </span>
                           )}
                        </div>
                     </li>

                     <li className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                           <h2 className="mb-2">
                              <strong className="mb-3">Momento</strong>
                           </h2>
                           <ul className="flex gap-2">
                              <li>
                                 {new Date(expense.moment).toLocaleDateString(
                                    undefined,
                                    {
                                       year: "numeric",
                                       month: "short", // ou 'short' para exibir como abreviação
                                       day: "numeric",
                                    }
                                 )}
                                 ,
                              </li>
                              <li>
                                 {new Date(expense.moment).toLocaleTimeString(
                                    [],
                                    {
                                       hour: "2-digit",
                                       minute: "2-digit",
                                       hour12: false,
                                    }
                                 )}
                              </li>
                           </ul>
                        </div>
                     </li>
                     <li className="col-span-3 md:col-span-2">
                        <div className="flex flex-col gap-5">
                           <strong>Categorias:</strong>{" "}
                           {editMode ? (
                              <CategorySelector
                                 style="w-2/3"
                                 availableCategories={
                                    context?.availableCategories
                                 }
                                 onCategoriesChange={setCategories}
                              />
                           ) : (
                              <span className="text-gray-700">
                                 {expense.categories.join(", ")}
                              </span>
                           )}
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         ) : (
            <div className="text-2xl text-red-500">Despesa não encontrada</div>
         )}
      </Template>
   )
}

export default ExpensePage
