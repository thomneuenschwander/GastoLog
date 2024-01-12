import Button from "../../components/Button"
import InputText from "../../components/input/InputText"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
import { NavLink } from "react-router-dom"

const Register = () => {
   return (
      <Template>
         <div className="text-center">
        <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md mb-20">
            <h1 className="font-medium text-2xl text-primary"><HighLight>Crie uma conta</HighLight> para anotar suas despesas</h1>
         <form action="" className="w-full flex flex-col gap-5">
            <div>
               <label className="block text-sm font-medium leading-6 text-gray-900">
                  Nome:{" "}
               </label>
               <InputText style="w-full" placeholder="seu nome" />

            </div>
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
      <NavLink to="/">
               <Button style="bg-gray-400" label="voltar" />
            </NavLink>
      </div>
      </Template>
   )
}

export default Register
