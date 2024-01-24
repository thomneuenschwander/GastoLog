import { ChangeEvent } from "react";

interface InputNumberProps {
    style?: string
    placeholder?: string
    id?: string
    value?: number
    onChange?: (value: number) => void
}

const InputNumber: React.FC<InputNumberProps> = ({
    style,
    onChange,
    placeholder,
    value,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        const numericValue = parseFloat(inputValue)
        
        if (!isNaN(numericValue) && onChange) {
            onChange(numericValue)
        }
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`${style} border px-3 py-2 rounded-lg text-gray-900 outline-none [&::-webkit-inner-spin-button]:appearance-none`}
            onChange={handleChange}
            value={value === undefined ? "" : String(value)}
        />
    )
}

export default InputNumber;
