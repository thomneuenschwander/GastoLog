import Button from "../../components/Button"
import InputText from "../../components/input/InputText"


const ExpenseRegister = () => {
  return (
    <>
        <h2>Anotar despesas</h2>
        <form className="space-y-2">
               <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                     Name:{" "}
                  </label>
                  <InputText style="w-full" />
               </div>

               <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                     Email:{" "}
                  </label>
                  <InputText style="w-full" />
               </div>

               <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                     Password:{" "}
                  </label>
                  <InputText style="w-full" />
               </div>
               <Button style="w-full bg-primary" label="Entrar"/>
            </form>
    </>
  )
}

export default ExpenseRegister