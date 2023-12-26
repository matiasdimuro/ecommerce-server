import { Request, Response } from 'express';
import { ProductService } from '../../domain/services/ProductService';
import { Product } from '../../domain/entities/Product';
import { IProductEntity, IProductPreview } from '../../types/interfaces/IProduct';
import { IProductsRepository } from '../../types/interfaces/IProductsRepository';
import { isObjectIdSchemaValid, isProductSchemaValid } from '../../validations/Zod';
import { IGetProductsFilters } from '../../types/interfaces/IGetProductsFilters';

export class ProductController {

    private readonly productService: ProductService
    private readonly productRepository: IProductsRepository

    constructor(productRepository: IProductsRepository) {
        this.productRepository = productRepository
        this.productService = new ProductService(productRepository)
    }

    public async getProducts(req: Request, res: Response) {
		console.log("> ProductController - getProducts")
        try {
            const type: IGetProductsFilters = req.query
            await this.connectToDB()
			const products: IProductPreview[] = await this.productService.getProductsPreview(type)
            await this.productRepository.closeConnection()
            res.status(200).json(products)
        } 
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }

    public async getProductById(req: Request, res: Response) {
		console.log("> ProductController - getProductById")
        try {
            const { id } = req.params
            if (!id) {
                res.status(404).send("Product ID was not specified")
            }
            else if (!isObjectIdSchemaValid(id)) {
                res.status(404).send("Bad request")
            }
            else {
                await this.connectToDB()
                const product: Product = await this.productService.getProductById(id)
                await this.productRepository.closeConnection()
                res.status(200).json(product)
            }
        } 
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }

    public async createProduct(req: Request, res: Response) {
        console.log("> ProductController - createProduct")
        try {    
            const productToCreate: IProductEntity = req.body 
            const isValidBody = isProductSchemaValid(productToCreate)
            if (!isValidBody) {
                res.status(404).send("Bad request")
            }
            else {
                await this.connectToDB()
                const ID = await this.productService.createProduct(productToCreate)
                await this.productRepository.closeConnection()
                res.status(201).json({ msg: `Product with ID ${ID} has been created.` })
            }
        } 
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        console.log("> ProductController - deletProduct")
        try {
            const { id } = req.params
            if (!isObjectIdSchemaValid(id)) {
                res.status(404).send("Bad request")
            }
            else {
                await this.connectToDB()
                const objectIdDeleted = await this.productService.deleteProduct(id)
                await this.productRepository.closeConnection()
                objectIdDeleted === -1
                    ? res.status(404).json({ msg: `Error. Product ${id} does not exist.` })
                    : res.status(202).json({ msg: `Product ${id} has been deleted.` })
            } 
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }        
    }

    public async editProduct(req: Request, res: Response) {
        console.log("> ProductController - deletProduct")
        try {
            const { id } = req.params
            const productData: IProductEntity = req.body
            if (!isProductSchemaValid(productData) || !isObjectIdSchemaValid(id)) {
                res.status(404).send("Bad request")
            }
            else {
                await this.connectToDB()
                await this.productService.editProduct(id, productData)
                await this.productRepository.closeConnection()
                res.status(204)
            } 
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }        
    }

    public async getCategories(_req: Request, res: Response) {
        console.log("> ProductController - getCategories")
        try {    
            await this.connectToDB()
            const categories = await this.productService.getCategories()
            await this.productRepository.closeConnection()
            res.status(200).json(categories)
        } 
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }

    public async connectToDB() {
        try {
            await this.productRepository.createConnection()
            console.log(`Server connected to database ...`)
        }
        catch(err) {
            console.error(`Error! Server could not be connected to database ...`)
            throw new Error(`Error! Server could not be connected to database ...`)
        }
    }
}