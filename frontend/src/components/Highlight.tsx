
type SpanProps = {
    style?: string
    children: React.ReactNode
}

const Span = (props: SpanProps) => {
  return (
    <span className={`${props.style} font-bold transition-opacity hover:opacity-75 `}>
        {props.children}
    </span>
  )
}

export default Span