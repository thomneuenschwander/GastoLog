import { NavLink } from "react-router-dom"
import HighLight from "../Highlight"

import { useAuthContext } from "../../hooks/useAuthContext"
import { useExpenseContext } from "../../hooks/useExpenseContext"

import { IoDocumentOutline  } from 'react-icons/io5'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

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
						<IoDocumentOutline  />
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
						<AiOutlineDown />
					</button>

					<button
						onClick={() => {
							expenseContext?.sortExpenses("ascending")
						}}
						className={`${
							expenseContext?.sortType === "ascending"
								? "bg-blue-500 text-white"
								: "bg-gray-300 text-gray-700"
						} py-2 px-4 rounded mr-20`}
					>
						<AiOutlineUp />
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
