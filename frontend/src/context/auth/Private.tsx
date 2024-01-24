import { useAuthContext } from "../../hooks/useAuthContext"

const Private = ({ children }: { children: JSX.Element }) => {
   const auth = useAuthContext()
   if (!auth?.isAuthenticate) {
      return <h1>You need to authenticate!</h1>
   }

   return children
}

export default Private
