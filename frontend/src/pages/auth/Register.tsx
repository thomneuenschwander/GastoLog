import { useState } from "react"
import { NavLink } from "react-router-dom"

import { IRegister } from "../../context/auth/types"

import Button from "../../components/Button"
import InputText from "../../components/input/InputText"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
import { createAccount } from "../../context/auth/util"


const Register = () => {
   const [name, setName] = useState<string>("")
   const [email, setEmail] = useState<string>("")
   const [password, setPassword] = useState<string>("")

   

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const toPersist: IRegister = {
         name: name,
         email: email,
         password: password
      }

      const res = await createAccount(toPersist)
      console.log(res)
   }

   return (
      <Template>
         <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md mb-10">
               <h1 className="font-medium text-2xl text-primary">
                  <HighLight>Crie uma conta</HighLight> para anotar suas
                  despesas
               </h1>
               <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
               >
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nome:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="seu nome"
                        value={name}
                        onChange={setName}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="sua senha@gmail.com"
                        value={email}
                        onChange={setEmail}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Senha:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="senha"
                        value={password}
                        onChange={setPassword}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirmar senha:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="repita sua senha"
                        value={password}
                        onChange={setPassword}
                     />
                  </div>
                  <Button style="w-full bg-primary" label="Registrar" />
               </form>
            </div>
            <NavLink to="/">
               <Button style="bg-gray-400" label="voltar" type="submit"/>
            </NavLink>
         </div>
      </Template>
   )
}

export default Register
