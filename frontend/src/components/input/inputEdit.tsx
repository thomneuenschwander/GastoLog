import React, { ChangeEvent } from "react"

interface InputEditProps {
    style?: string
   value: string | number | string[]
   onChange: (value: any) => void
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
         className={`${style} border px-3 py-2 rounded-lg text-gray-900 outline-none ${
            editMode ? "bg-gray-100" : "bg-gray-50"}`}
         disabled={!editMode}
      />
   )
}

export default InputEdit
