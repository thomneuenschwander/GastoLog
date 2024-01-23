type ExpenseProps = {
   description?: string
   price?: number
}

const ExpenseCard: React.FC<ExpenseProps> = (props) => {
   return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 lg: p-6">
         <div className="flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl lg:text-2xl text-indigo-800 font-semibold mb-2 lg:mb-0">
               R${props.price?.toFixed(2)}
            </h2>
            <h2 className="text-gray-700 lg:ml-4 text-2xl font-medium flex-1">
               {props.description}
            </h2>
         </div>
      </div>
   )
}

export default ExpenseCard
