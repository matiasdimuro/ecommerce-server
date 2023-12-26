import { MongoClient, Db, ObjectId } from 'mongodb'
import dotenv from 'dotenv';

import { IProductsRepository } from '../types/interfaces/IProductsRepository';
import { CategoryFiltersSchema, CategorySchema, ProductPreviewSchema, ProductSchema }  from '../db/schemas/MongoSchemas'
import { IProductEntity } from '../types/interfaces/IProduct';
import { IGetProductsFilters } from '../types/interfaces/IGetProductsFilters';

dotenv.config();

const DB_NAME = "ecommerce";
const URL = `mongodb+srv://${process.env.MONGODB_URI_USER}:${process.env.MONGODB_URI_PASSWORD}@e-commerce-cluster.f9t7yun.mongodb.net/?retryWrites=true&w=majority`;

export class MongodbRepository implements IProductsRepository {

    private client: MongoClient | undefined
    private db: Db | undefined 

    constructor() {}

    public async getProductsPreview(filters: IGetProductsFilters): Promise<ProductPreviewSchema[]> {
        console.log("> GET products from MongoDB")
        const query = filters.category 
            ? { category: { $in: filters.category.split(",").map(stringID => (
                new ObjectId(stringID)
            )) } } 
            : {}
        console.log(query);
        
        const projection = { _id:1, name: 1, price: 1, image: 1, category: 1 }
        const documents = await this.db?.collection('products').find(query, { projection }).toArray() as ProductPreviewSchema[]
        console.log(documents);
        return documents
    }

    public async getProductById(id: string): Promise<ProductSchema> {
        console.log("> GET product from MongoDB")
        const documents = await this.db?.collection('products').find({ _id: new ObjectId(id) }).toArray() as ProductSchema[]
        const product = documents[0]
        return product
    }

    public async deleteProductById(id: string): Promise<any> {
        console.log("> DELETE product from MongoDB");
        await this.db?.collection('products').deleteOne({ _id: new ObjectId(id) })
        return id
    }

    public async getCategory(categoryID: ObjectId): Promise<CategorySchema> {
        console.log("> GET category from MongoDB")        
        const documents = await this.db?.collection('categories').find({ _id: categoryID }).toArray() as CategorySchema[]
        const category = documents[0]
        return category
    }

    public async getCategories(filters: CategoryFiltersSchema): Promise<CategorySchema[]> {
        console.log("> GET categories from MongoDB")    
        const filter = filters ? filters : {}    
        const categories = await this.db?.collection('categories').find(filter).toArray() as CategorySchema[]
        return categories
    }
    
    public async createProduct(productToCreate : ProductSchema): Promise<any> {
        console.log("> POST product from MongoDB")     
        const response = await this.db?.collection('products').insertOne(productToCreate)
        return response?.insertedId
    }

    public async editProduct(id: string, productData: IProductEntity): Promise<any> {
        console.log("> PUT product from MongoDB")  
        await this.db?.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stockPerSize: productData.stockPerSize,
            } }
        )
    }

    public async createConnection(): Promise<void> {
        console.log("> Connecting to MongoDB ...")
        this.client = await MongoClient.connect(URL)
        this.db = this.client?.db(DB_NAME)
    }

    public async closeConnection(): Promise<void> {
        await this.client?.close()
        console.log("> Connection to MongoDB closed ...")
    }
}