import { NavLink } from "react-router-dom"
// COMPONENTS
import Button from "../../components/Button"
import InputText from "../../components/input/Input"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
// HOOKS
import { useAuthContext } from "../../hooks/useAuthContext"
import useAuth from "../../hooks/useAuth"

const Login = () => {
   const context = useAuthContext()
   const {email, password, handleCredentialsInputChange} = useAuth()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         await context?.authenticate({email, password})
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <Template>
         <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-40 p-6 bg-white rounded-lg shadow-md mb-20">
               <h1 className="font-medium text-2xl text-primary">
                  Entrar na sua conta do <HighLight>GastoLog</HighLight>
               </h1>
               <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
               >
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email:{" "}
                     </label>
                     <InputText
                        type="email"
                        style="w-full"
                        placeholder="seu email@gmail.com"
                        value={email}
                        onChange={(value) => handleCredentialsInputChange("email", value)}
                        autocomplete="username"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Senha:{" "}
                     </label>
                     <InputText
                        type="password"
                        style="w-full"
                        placeholder="senha"
                        value={password}
                        onChange={(value) => handleCredentialsInputChange("password", value)}
                        autocomplete="current-password"
                     />
                  </div>
                  <Button style="w-full bg-primary" label="Entrar" />
                  {/* {error && <FieldError error="Email e senha invalidos!" />} */}
               </form>
            </div>
            <NavLink to="/">
               <Button style="bg-gray-400" label="voltar" type="submit" />
            </NavLink>
         </div>
      </Template>
   )
}

export default Login
