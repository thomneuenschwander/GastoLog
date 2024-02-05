import { useState } from "react"
import { NavLink } from "react-router-dom"
// COMPONENTS
import Button from "../../components/Button"
import InputText from "../../components/input/Input"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
// HOOKS
import { useAuthContext } from "../../hooks/useAuthContext"
import useAuth from "../../hooks/useAuth"
import { Credentials } from "../../resources/user/user.resource"
import useValidation from "../../hooks/useValidation"
import FieldError from "../../components/input/FieldError"

const Login = () => {
	const [error, setError] = useState<string>("")
	const context = useAuthContext()
	const { email, password, handleCredentialsInputChange } = useAuth()
	const { loginValidation } = useValidation()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const credentials: Credentials = { email: email, password: password }
		const validationError = loginValidation(credentials)
		setError(validationError)
		if (!validationError) {
			console.log("foi")
			try {
				await context?.authenticate(credentials)
			} catch (error) {
				setError("Credenciais inválidas!")
				console.log(error)
			}
		} else {
			console.log("nao foi")
		}
	}

	return (
		<Template>
			<div className="text-center">
				<div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md mb-10 text-lg">
					<h1 className="font-medium text-3xl text-primary">
						Entrar na sua conta do <HighLight>GastoLog</HighLight>
					</h1>
					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
						<div>
							<label className="block font-medium leading text-gray-900 mb-1">
								Email:{" "}
							</label>
							<InputText
								type="email"
								style="w-full text-xl p-3 border border-gray-300 rounded-md"
								placeholder="seu email@gmail.com"
								value={email}
								onChange={(value) =>
									handleCredentialsInputChange("email", value)
								}
								autocomplete="username"
							/>
						</div>
						<div>
							<label className="block font-medium leading text-gray-900 mb-1">
								Senha:{" "}
							</label>
							<InputText
								type="password"
								style="w-full text-xl p-3 border border-gray-300 rounded-md"
								placeholder="sua senha"
								value={password}
								onChange={(value) =>
									handleCredentialsInputChange("password", value)
								}
								autocomplete="current-password"
							/>
						</div>
                  <Button style="bg-primary mx-auto lg:w-3/4 sm:w-full " label="Entrar" />
						{error && <FieldError error={error} />}
					</form>
				</div>
				<NavLink to="/">
						<Button style="bg-primary text-xl font-medium transition duration-300 ease-in-out transform hover:-translate-y-1" label="voltar" type="submit" />
					</NavLink>
			</div>
		</Template>
	)
}

export default Login
