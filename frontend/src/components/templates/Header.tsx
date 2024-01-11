import HighLight from "../Highlight"
import NavBar from "./NavBar"

const Header = () => {
   return (
      <header className="bg-bg_primary text-white py-3 flex justify-between items-center px-10">
         <div className="flex justify-between w-full px-40">
            <h1 className="text-4xl cursor-pointer">
               Gasto
               <HighLight>Log</HighLight>
            </h1>
         </div>
         <NavBar />
      </header>
   )
}

export default Header
