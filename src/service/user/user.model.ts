export interface IUser {
    id?: number
    firstName: string
    lastName: string
    email: string
    roleId?: number
    password: string
    confirmPassword?: string
}

export interface IAddOrEditUser {
    id?: number
    email: string
    firstName: string
    lastName: string
    roleId: number
    roleName?: string
}

export interface IListUser extends IAddOrEditUser {
    totalRecords: number
}

