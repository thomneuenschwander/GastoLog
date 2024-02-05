import { NavLink } from "react-router-dom"
import HighLight from "../Highlight"

import { useAuthContext } from "../../hooks/useAuthContext"
import { useExpenseContext } from "../../hooks/useExpenseContext"

const NavBar: React.FC = () => {
	const context = useAuthContext()
	const expenseContext = useExpenseContext()
	return (
		<nav className="py-3">
			{!context?.isAuthenticate ? (
				<ul className="flex text-2xl gap-20">
					<li>About</li>
					<li>
						<NavLink to="/auth/register">
							<HighLight>Registrar</HighLight>
						</NavLink>
					</li>
					<li>
						<NavLink to="/auth/login">
							<HighLight>Entrar</HighLight>
						</NavLink>
					</li>
				</ul>
			) : (
				<div className="flex text-xl gap-5">
					<button
						onClick={() => {
							expenseContext?.sortExpenses("default")
						}}
						className={`${
							expenseContext?.sortType === "default"
								? "bg-blue-500 text-white"
								: "bg-gray-300 text-gray-700"
						} py-2 px-4 rounded`}
					>
						Default
					</button>

					<button
						onClick={() => {
							expenseContext?.sortExpenses("descending")
						}}
						className={`${
							expenseContext?.sortType === "descending"
								? "bg-blue-500 text-white"
								: "bg-gray-300 text-gray-700"
						} py-2 px-4 rounded`}
					>
						Descending
					</button>

					<button
						onClick={() => {
							expenseContext?.sortExpenses("ascending")
						}}
						className={`${
							expenseContext?.sortType === "ascending"
								? "bg-blue-500 text-white"
								: "bg-gray-300 text-gray-700"
						} py-1 px-2 rounded`}
					>
						Ascending
					</button>
					<button onClick={context.logout}>
						<HighLight>Sair</HighLight>
					</button>
				</div>
			)}
		</nav>
	)
}

export default NavBar
