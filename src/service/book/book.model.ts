export interface IAddOrEditBook {
    id?: number
    name: string
    price: string
    category: number
    description: string
    imageSrc: string
}

export interface IListBook extends IAddOrEditBook {
    totalRecords: number
}

