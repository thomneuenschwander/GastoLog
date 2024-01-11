import Button from "../../components/Button"
import InputText from "../../components/input/InputText"


const ExpenseRegister = () => {
  return (
    <>
        <h2 className="text-primary text-2xl font-medium pb-5">Anotar despesas</h2>
        <form className="space-y-2">
               <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                     Descrição:{" "}
                  </label>
                  <InputText style="w-full" placeholder="Gastou com o que ?" />
               </div>

               <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                     Valor:{" "}
                  </label>
                  <InputText style="w-full" placeholder="R$ 00.00" />
               </div>

               <Button style="w-full bg-primary" label="Entrar"/>
            </form>
    </>
  )
}

export default ExpenseRegister