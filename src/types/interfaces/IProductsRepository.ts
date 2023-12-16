import { ObjectId } from "mongodb"
import { CategoryFiltersSchema, CategorySchema, ProductPreviewSchema, ProductSchema } from "../../db/schemas/MongoSchemas"
import { IProductEntity } from "./IProduct"

export interface IProductsRepository {
    getProductsPreview(): Promise<ProductPreviewSchema[]>
    getProductById(id: string): Promise<ProductSchema>
    getCategory(id: ObjectId): Promise<CategorySchema>
    getCategories(filters?: CategoryFiltersSchema): Promise<CategorySchema[]>
    createProduct(productToCreate: ProductSchema): any
    deleteProductById(id: string): Promise<any>
    editProduct(id: string, productData: IProductEntity): Promise<any>
    createConnection(): Promise<void>
}