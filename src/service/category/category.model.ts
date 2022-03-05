export interface IAddOrEditCategory {
    id?: number
    name: string
}

export interface IListCategory extends IAddOrEditCategory {
    totalRecords: number
}

