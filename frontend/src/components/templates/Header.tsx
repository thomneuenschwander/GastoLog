import { NavLink } from "react-router-dom"
import HighLight from "../Highlight"
import NavBar from "./NavBar"
import { useAuthContext } from "../../hooks/useAuthContext"

const Header = () => {
	const auth = useAuthContext()
	return (
		<header className="bg-bg_primary text-white py-3 flex justify-between items-center px-10">
			<div className="flex justify-between w-full px-40">
				<NavLink to={auth?.isAuthenticate ? "/home" : "/"}>
					<h1 className="text-4xl cursor-pointer">
						Gasto
						<HighLight>Log</HighLight>
					</h1>
				</NavLink>
			</div>
			<NavBar />
		</header>
	)
}

export default Header
