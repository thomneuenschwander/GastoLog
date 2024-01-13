import { useAuth } from "../../hooks/useAuth"


const Private = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth()

    if(!auth?.token){
        return <h1>You need to authenticate!</h1>
    }

    return children
}

export default Private