import Highlight from "../../components/Highlight"
import ExpenseCard from "../../components/expense/ExpenseCard"
import Template from "../../components/templates/Template"
import ExpenseRegister from "./ExpenseRegister"
import Profile from "./Profile"
import { useExpense } from "../../hooks/useExpense"
import { Link } from "react-router-dom"
import { useUserService } from "../../resources/user/user.service"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState()
  const expenseContext = useExpense()
  const userService = useUserService()

  useEffect(() => {
      const fetchData = async () => {
         
      try {
         const res = await userService.getProfile();
         setUser(res);
      } catch (error) { /* empty */ }
   }
   fetchData();
}, []);

   
   return (
      <Template>
         <main className="text-center">
            <h1 className="text-4xl text-indigo-800 mb-20">
               Seja bem vindo{" "}
               <Highlight style="text-indigo-900">Fulano</Highlight>{" "}
            </h1>
            <section className="flex gap-64">
               <article className="basis-1/4">
                  <ExpenseRegister />
               </article>
               <div className="basis-1/2 flex flex-col gap-4">
                  {expenseContext?.expenses &&
                     expenseContext.expenses.map((exp) => (
                        <Link to={`/expense/${exp.id}`}>
                           <ExpenseCard
                           key={exp.id}
                           price={exp.price}
                           description={exp.description}
                        />
                        </Link>
                     ))}
               </div>
               <article className="basis-1/4">
                  <Profile />
               </article>
            </section>
         </main>
      </Template>
   )
}

export default App
