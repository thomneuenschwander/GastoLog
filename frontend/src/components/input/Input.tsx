import React, { ChangeEvent } from "react"

interface InputProps {
   style?: string
   placeholder?: string
   id?: string
   value?: string
   type?: string
   autocomplete?: string
   onChange?: (value: string) => void
}

const InputText: React.FC<InputProps> = ({
   style,
   type,
   onChange,
   placeholder,
   autocomplete,
}) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
         onChange(event.target.value)
      }
   }

   return (
      <input
         type={type}
         placeholder={placeholder}
         className={`${style} border px-3 py-2 rounded-lg text-gray-900 outline-none`}
         onChange={handleChange}
         autoComplete={autocomplete}
      />
   )
}

export default InputText
