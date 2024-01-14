interface FieldErrorProps {
    error: any | null
    style?: string
}

const FieldError: React.FC<FieldErrorProps> = ({error, style}) => {
    if(error){
        return (
            <span className={`${style} text-red-500 text-sm`}>{error}</span>
        )
    }
    return null;
}

export default FieldError