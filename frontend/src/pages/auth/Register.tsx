import Button from "../../components/Button"
import InputText from "../../components/input/InputText"
import Template from "../../components/templates/Template"

const Register = () => {
   return (
      <Template>
        <div className="flex items-center justify-center max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
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
      </Template>
   )
}

export default Register
