import React, { ChangeEvent } from "react"

interface InputEditProps {
    style?: string
   value: string | number
   onChange: (value: string) => void
   editMode: boolean
}

const InputEdit: React.FC<InputEditProps> = ({style, value, onChange, editMode }) => {
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
   }

   return (
      <input
         type="text"
         value={editMode ? String(value) : String(value)}
         onChange={handleInputChange}
         className={`${style} border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full`}
      />
   )
}

export default InputEdit
