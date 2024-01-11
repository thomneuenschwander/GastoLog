import React, { ChangeEvent } from "react"

interface InputProps {
   style?: string
   placeholder?: string
   id?: string
   value?: string
   type?: string
   onChange?: (value: string) => void
}

const InputText: React.FC<InputProps> = ({
   style,
   type = "text",
   onChange,
}) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
         onChange(event.target.value)
      }
   }

   return (
      <input
         type={type}
         className={`${style} border px-3 py-2 rounded-lg text-gray-900 outline-none`}
         onChange={handleChange}
      />
   )
}

export default InputText
