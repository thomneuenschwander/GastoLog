import { IRegister, IUser } from './types'
import { api } from '../../../services/Api'

export function setUserLocalStorage(user: IUser | null){
    localStorage.setItem('user', JSON.stringify(user))
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('user')
    if(!json){
        return null
    }
    const user = JSON.parse(json)

    return user ?? null
}

export async function createAccount(user: IRegister){
    
    const res = await api.post("user/auth/register", user)

    return res.data
}
