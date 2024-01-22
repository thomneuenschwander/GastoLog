// ExpensePage.tsx
import { useParams, NavLink } from "react-router-dom"
import Template from "../components/templates/Template"
import { useExpense } from "../hooks/useExpense"
import { useEffect, useState } from "react"
import { ExpenseReq } from "../resources/expense/expense.resource"
import InputEdit from "../components/input/inputEdit"
import { useExpenseService } from "../resources/expense/expense.service"

const ExpensePage: React.FC = () => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [editedExpense, setEditedExpense] = useState<ExpenseReq>({
      description: "",
      price: 0,
      categories: [],
   })

   const { id } = useParams<{ id: string }>()
   const service = useExpense()
   const expenseService = useExpenseService()

   const expense = service?.getExpenseById(Number(id))

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
         const res = await expenseService.deleteExpense(Number(id))
         console.log(res)
         service?.loadExpenses()
      } catch (error) {
         console.error("Erro ao adicionar despesa:", error)
      }
   }
   const handleUpdate = async () => {
      try {
         const res = await expenseService.updateExpense(editedExpense)
         console.log(res)
         service?.loadExpenses()
      } catch (error) {
         console.error("Erro ao adicionar despesa:", error)
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
                        <li
                           className="bg-blue-500 p-5 text-white font-bold cursor-pointer rounded-full transition-all duration-100 hover:rounded"
                           onClick={handleUpdate}
                        >
                           SALVAR
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
                  <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">
                     Detalhes da Despesa
                  </h2>
                  <ul className="grid grid-cols-2 gap-4 text-center gap-10 text-2xl mt-10">
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
                        <div className="mb-4">
                           <strong>Categorias:</strong>{" "}
                           <span className="text-gray-700">
                              {expense.categories.join(", ")}
                           </span>
                        </div>
                     </li>
                     <li className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                           <strong>Preço:</strong> R${" "}
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
                                 {expense.price.toFixed(2)}
                              </span>
                           )}
                        </div>
                     </li>
                     <li className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                           <strong>Momento:</strong>{" "}
                           <span className="text-gray-700">
                              {new Date(expense.moment).toLocaleString()}
                           </span>
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
