import express from "express"
import { ProductController } from "../controllers/ProductController"
import { MongodbRepository } from "../../repositories/ProductsMongoRepository"

const router = express.Router()
const productRepository = new MongodbRepository()
const productController = new ProductController(productRepository)

router.get("/products", productController.getProducts.bind(productController))
router.get("/product/:id", productController.getProductById.bind(productController))
router.post("/products", productController.createProduct.bind(productController))
router.put("/product/:id", productController.editProduct.bind(productController))
router.delete("/product/:id", productController.deleteProduct.bind(productController))
router.get("/categories", productController.getCategories.bind(productController))

export default router