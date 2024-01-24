import { NavLink } from "react-router-dom"
// COMPONENTS
import Button from "../../components/Button"
import InputText from "../../components/input/Input"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
// HOOKS
import { useAuthContext } from "../../hooks/useAuthContext"
import useRegister from "../../hooks/useRegister"
import { RegisterData } from "../../resources/user/user.resource"

const Register = () => {

   const auth = useAuthContext()
   const { name, email, password, confirmPassword, handleRegisterInputChange } =
      useRegister()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(name, email, password, confirmPassword)
      try {
         await auth?.register(
            new RegisterData(name, email, password, confirmPassword)
         )
      } catch (error) {
         console.error(error)
      }
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
                        type="text"
                        style="w-full"
                        placeholder="seu nome"
                        value={name}
                        onChange={(value) =>
                           handleRegisterInputChange("name", value)
                        }
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email:{" "}
                     </label>
                     <InputText
                        type="text"
                        style="w-full"
                        placeholder="seu email@gmail.com"
                        value={email}
                        onChange={(value) =>
                           handleRegisterInputChange("email", value)
                        }
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
                        onChange={(value) =>
                           handleRegisterInputChange("password", value)
                        }
                        autocomplete="new-password"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirmar senha:{" "}
                     </label>
                     <InputText
                        type="password"
                        style="w-full"
                        placeholder="repita sua senha"
                        value={confirmPassword}
                        onChange={(value) =>
                           handleRegisterInputChange("confirmPassword", value)
                        }
                        autocomplete="new-password"
                     />
                  </div>
                  <Button style="w-full bg-primary" label="Registrar" />
                  {/* {error && (
                     <FieldError error={error} style="font-medium underline" />
                  )} */}
               </form>
            </div>
            <NavLink to="/">
               <Button style="bg-gray-400" label="voltar" type="submit" />
            </NavLink>
         </div>
      </Template>
   )
}

export default Register
