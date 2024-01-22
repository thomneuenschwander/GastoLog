import Highlight from "../../components/Highlight"
import ExpenseCard from "../../components/expense/ExpenseCard"
import Template from "../../components/templates/Template"
import ExpenseRegister from "./ExpenseRegister"
import Profile from "./Profile"
import { useExpense } from "../../hooks/useExpense"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

function App() {

   const expenseContext = useExpense()
   const authContext = useAuth()
   
   return (
      <Template>
      <main className="text-center p-3">
        <h1 className="text-4xl text-indigo-800 mb-8 lg:mb-12">
          Seja bem-vindo{" "}
          <Highlight style="text-indigo-900">{authContext?.name}</Highlight>{" "}
        </h1>
        <section className="flex flex-col lg:flex-row lg:gap-8">
          <article className="lg:w-1/4">
            <ExpenseRegister />
          </article>
          <div className="lg:w-1/2 flex flex-col gap-4">
            {expenseContext?.expenses &&
              expenseContext.expenses.map((exp) => (
                <Link key={exp.id} to={`/expense/${exp.id}`}>
                  <ExpenseCard price={exp.price} description={exp.description} />
                </Link>
              ))}
          </div>
          <article className="lg:w-1/4">
            <Profile />
          </article>
        </section>
      </main>
    </Template>
   )
}

export default App
