import Button from "../../components/Button"
import InputText from "../../components/input/InputText"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"

const Login = () => {
  return (
    <Template>
        <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-40 p-6 bg-white rounded-lg shadow-md">
            <h1 className="font-medium text-2xl text-primary">Entrar na sua conta do <HighLight>GastoLog</HighLight></h1>
         <form action="" className="w-full flex flex-col gap-5">
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email:{" "}
               </label>
               <InputText style="w-full" placeholder="sua senha@gmail.com" />
            </div>
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Senha:{" "}
               </label>
               <InputText style="w-full" placeholder="senha" />
            </div>
            <Button style="w-full bg-primary" label="Registrar" />
         </form>
      </div>
      </Template>
  )
}

export default Login