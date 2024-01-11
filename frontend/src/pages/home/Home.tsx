import Highlight from "../../components/Highlight";
import ExpenseCard from "../../components/expense/ExpenseCard";
import Template from "../../components/templates/Template";
import ExpenseRegister from "./ExpenseRegister";
import Profile from "./Profile";

function App() {
  

  return (
    <Template>
      <main className="text-center">
        <h1 className="text-4xl text-indigo-800">Seja bem vindo <Highlight style="text-indigo-900">Fulano</Highlight> </h1>
        <section className="flex">
          <article>
            <ExpenseRegister />
          </article>
          <div>
            <ExpenseCard price={37.90} description="ferro de passar roupa" />
          </div>
          <article>
            <Profile />
          </article>
        </section>
      </main>
    </Template>
  )
}

export default App
