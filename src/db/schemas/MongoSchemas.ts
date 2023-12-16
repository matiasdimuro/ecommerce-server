import { ObjectId } from "mongodb"

type stockPerSizeItem = {
    size: string,
    stock: number 
}

export interface ProductSchema {
    _id?: ObjectId,
    name: string,
    description: string,
    currency: string,
    price: number,
    image: string,
    stockPerSize: Array<stockPerSizeItem>,
    category: ObjectId
}

export interface ProductPreviewSchema {
    _id: ObjectId,
    name: string,
    price: number,
    image: string,
    category: ObjectId
}

export interface CategorySchema {
    _id: ObjectId,
    name: string,
}

export interface CategoryFiltersSchema {
    _id?: ObjectId,
    name?: string
}