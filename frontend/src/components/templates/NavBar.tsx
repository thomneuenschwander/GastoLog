import { NavLink } from "react-router-dom"
import HighLight from "../Highlight"
const NavBar: React.FC = () => {
   return (
      <nav>
         <ul className="flex text-2xl gap-5 py-3">
            <li>
               <NavLink to="/home">
                  <HighLight>Home</HighLight>
               </NavLink>
            </li>
            <li>About</li>
            <li>
               <NavLink to="/auth/login">
                  <HighLight>Logar</HighLight>
               </NavLink>
            </li>
            <li>
               <NavLink to="/auth/register">
                  <HighLight>Entrar</HighLight>
               </NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default NavBar
