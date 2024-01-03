interface ButtonProps {
    style?: string
    label?: string
    onClick?: (e: any) => void
    type?: "submit" | "button" | "reset" | undefined
 }
 
 const Button: React.FC<ButtonProps> = ({
    style,
    label,
    onClick,
    type,
 }: ButtonProps) => {
    return (
       <button
          className={`${style} text-white px-4 py-2 rounded-lg transition-colors hover:bg-opacity-90`}
          type={type}
          onClick={onClick}
       >
          {label}
       </button>
    )
 }
 
 export default Button