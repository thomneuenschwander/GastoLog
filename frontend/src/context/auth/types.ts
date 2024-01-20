import { UserSessionToken } from "../../resources/user/user.resource"



export interface IContext extends UserSessionToken {
   authenticate: (credential: ICredentials) => Promise<void>
   register: (user: IRegister) => Promise<void>
   logout: () => void
   isAuthenticate: boolean
}

export interface IAuthProvider {
   children: JSX.Element
}

export interface ICredentials {
   email?: string
   password?: string
}

export interface IRegister {
   name?: string
   email?: string
   password?: string
   confirmPassword?: string
}
