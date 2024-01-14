export interface IUser {
   email?: string
   token?: string
}

export interface IContext extends IUser {
   authenticate: (credential: ICredentials) => Promise<void>
   register: (user: IRegister) => Promise<void>
   logout: () => void
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
