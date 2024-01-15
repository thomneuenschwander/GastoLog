// ExpensePage.tsx
import { useParams, NavLink } from "react-router-dom"
import Template from "../components/templates/Template"
import { useExpense } from "../hooks/useExpense"
import { useState } from "react"
import { ExpenseReq } from "../resources/expense/expense.resource"
import InputEdit from "../components/input/inputEdit"
import { useExpenseService } from "../resources/expense/expense.service"

const ExpensePage: React.FC = () => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [editedExpense, setEditedExpense] = useState<ExpenseReq>({
      description: "",
      price: 0,
      category: "",
   })

   const { id } = useParams<{ id: string }>()
   const service = useExpense()
   const expenseService = useExpenseService()

   const expense = service?.getExpenseById(Number(id))

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
                     <li
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={handleDelete}
                     >
                        DELETAR
                     </li>
                  </NavLink>
                 
                     <li
                        className="text-green-500 cursor-pointer hover:underline"
                        onClick={() => setEditMode(true)}
                     >
                        EDITAR
                     </li>
                
                  <NavLink to="/home">
                     <li className="text-gray-500 cursor-pointer hover:underline">
                        VOLTAR
                     </li>
                  </NavLink>
               </ul>
               <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <h2 className="text-center text-2xl font-bold mb-4 text-gray-800">
                     Detalhes da Despesa
                  </h2>
                  <ul className="grid grid-cols-2 gap-4 text-center gap-10">
  <li className="col-span-2 md:col-span-1">
    <div className="mb-4">
      {editMode ? (
        <InputEdit
          value={editedExpense.description}
          onChange={(value) => handleInputChange("description", value)}
          editMode={editMode}
        />
      ) : (
        <span className="text-gray-700">
          <strong>Descrição:</strong> {expense.description}
        </span>
      )}
    </div>
  </li>
  <li className="col-span-2 md:col-span-1">
    <div className="mb-4">
      {editMode ? (
        <InputEdit
          value={editedExpense.category}
          onChange={(value) => handleInputChange("category", value)}
          editMode={editMode}
        />
      ) : (
        <span className="text-gray-700">
          <strong>Categorias:</strong> {expense.categories.join(", ")}
        </span>
      )}
    </div>
  </li>
  <li className="col-span-2 md:col-span-1">
    <div className="mb-4">
      {editMode ? (
        <InputEdit
          value={editedExpense.price}
          onChange={(value) => handleInputChange("price", value)}
          editMode={editMode}
        />
      ) : (
        <span className="text-gray-700">
          <strong>Preço:</strong> R$ {expense.price.toFixed(2)}
        </span>
      )}
    </div>
  </li>
  <li className="col-span-2 md:col-span-1">
    <div className="mb-4">
      <span className="text-gray-700">
        <strong>Momento:</strong>{" "}
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
