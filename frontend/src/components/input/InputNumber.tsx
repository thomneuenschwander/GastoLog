import { ChangeEvent } from "react";

interface InputNumberProps {
    style?: string;
    placeholder?: string;
    id?: string;
    value?: number;
    onChange?: (value: number) => void;
  }
  
  const InputNumber: React.FC<InputNumberProps> = ({
    style,
    onChange,
    placeholder,
    value,
  }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseFloat(event.target.value);
      if (!isNaN(inputValue) && onChange) {
        onChange(inputValue);
      }
    };
  
    return (
      <input
        type="number"
        placeholder={placeholder}
        className={`${style} border px-3 py-2 rounded-lg text-gray-900 outline-none`}
        onChange={handleChange}
        value={value === undefined ? "" : value}
      />
    );
  };
  
  export default InputNumber;