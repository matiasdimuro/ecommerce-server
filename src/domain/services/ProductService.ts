import { ObjectId } from "mongodb"
import { IProductsRepository } from "../../types/interfaces/IProductsRepository"
import { CategorySchema, ProductPreviewSchema, ProductSchema } from "../../db/schemas/MongoSchemas"
import { Product } from "../entities/Product"
import { Category } from "../../types/enums/Category.enum"
import { IProductEntity, IProductPreview } from "../../types/interfaces/IProduct"
import { IGetProductsFilters } from "../../types/interfaces/IGetProductsFilters"

export class ProductService {

    private readonly productsRepository: IProductsRepository 

    constructor(productsRepository: IProductsRepository) {
        this.productsRepository = productsRepository
    }

    public async getProductsPreview(filters: IGetProductsFilters): Promise<IProductPreview[]> {
		console.log("> ProductService - getProducts")        
        const productsSchema: ProductPreviewSchema[] = await this.productsRepository.getProductsPreview(filters)
        let products: IProductPreview[] = []
        for (let i = 0; i < productsSchema.length; i++) {
            const productSchema = productsSchema[i]
            const categorySchema: CategorySchema = await this.productsRepository.getCategory(productSchema.category)
            const category = this.getCategoryGivenName(categorySchema.name)
            const product = new Product(productSchema._id, productSchema.name, "", "", productSchema.price, productSchema.image, category, [])
            products.push(product.getProductPreview())
        }
        return products
    }

    public async getProductById(id: string): Promise<Product> {
		console.log("> ProductService - getProductById")
        const productSchema: ProductSchema = await this.productsRepository.getProductById(id)
        const categorySchema: CategorySchema = await this.productsRepository.getCategory(productSchema.category)
        const category = this.getCategoryGivenName(categorySchema.name)
        const product = new Product(
            productSchema._id,
            productSchema.name,
            productSchema.description,
            productSchema.currency,
            productSchema.price,
            productSchema.image,
            category,
            productSchema.stockPerSize
        )
        return product
    }

    public async createProduct(productToCreate: IProductEntity): Promise<any> {
		console.log("> ProductService - createProduct")
        const categorySchema = await this.productsRepository.getCategories({ name: productToCreate.category })
        const product: ProductSchema = {
            name: productToCreate.name,
            description: productToCreate.description,
            currency: productToCreate.currency,
            price: productToCreate.price,
            image: productToCreate.image,
            category: categorySchema[0]._id,
            stockPerSize: productToCreate.stockPerSize
        }
        const ID = await this.productsRepository.createProduct(product)
        return ID
    }

    public async deleteProduct(id: string): Promise<number | ObjectId> {
        console.log("> ProductService - deleteProduct")
        const product = await this.productsRepository.getProductById(id)
        if (!product) return -1
        const deletedId = await this.productsRepository.deleteProductById(id)
        return deletedId
    }

    public async editProduct(id: string, productData: IProductEntity): Promise<void> {
        console.log("> ProductService - editProduct")
        await this.productsRepository.editProduct(id, productData)
    }

    public async getCategories(): Promise<CategorySchema[]> {
		console.log("> ProductService - getCategories")
        const categories = await this.productsRepository.getCategories()
        return categories
    }

    private getCategoryGivenName(categoryName: string): Category {
        switch(categoryName) {
            case "Remeras":
                return Category.REMERAS
            case "Pantalones":
                return Category.PANTALONES
            case "Bermudas":
                return Category.BERMUDAS
            case "Musculosas":
                return Category.MUSCULOSAS
            default:
                return Category.CAMISAS
        }
    }
}