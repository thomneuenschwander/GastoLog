

type ExpenseProps = {
   description?: string
   price?: number
}

const ExpenseCard = (props: ExpenseProps) => {
   return (
      <div className="text-2xl bg-gray-100 p-4 rounded-lg shadow-md flex gap-5 cursor-pointer transition-opacity" >
         <h2 className="flex-1">
            R${props.price?.toFixed(2)}
         </h2>
         <h2 className="flex-2 text-gray-900">{props.description}</h2>
      </div>
   )
}

export default ExpenseCard
