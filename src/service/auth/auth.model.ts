export type ILogin = {
    email: string
    password: string
}

export type ICreateUser = {
    id?: number
    firstName: string
    lastName: string
    email: string
    roleId?: number
    password: string
    confirmPassword?: string
}