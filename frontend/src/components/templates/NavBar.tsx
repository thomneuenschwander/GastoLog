import { NavLink } from "react-router-dom"
import HighLight from "../Highlight"

import { useAuth } from "../../hooks/useAuth"

const NavBar: React.FC = () => {
   const auth = useAuth()
   return (
      <nav>
         {!auth?.token ? (
            <ul className="flex text-2xl gap-20 py-3">
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
            <ul className="flex text-2xl gap-5 py-3">
               <li>
                  <NavLink to="/home">
                     <HighLight>Home</HighLight>
                  </NavLink>
               </li>
               <li>
                  <button onClick={auth.logout}><HighLight>Sair</HighLight></button>
               </li>
            </ul>
         )}
      </nav>
   )
}

export default NavBar
