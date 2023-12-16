import { ObjectId } from "mongodb";
import { Category } from "../enums/Category.enum";

type TstockPerSizeItem = {
    size: string,
    stock: number 
}
type TstockPerSize = Array<TstockPerSizeItem>

export interface IProductPreview {
    _id: ObjectId | undefined
    name: string,
    price: number,
    category: Category,
    image: string
}

export interface IProductEntity extends IProductPreview {
    description: string,
    currency: string,
    stockPerSize: TstockPerSize
}