"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const ProductsMongoRepository_1 = require("../../repositories/ProductsMongoRepository");
const router = express_1.default.Router();
const productRepository = new ProductsMongoRepository_1.MongodbRepository();
const productController = new ProductController_1.ProductController(productRepository);
router.get("/products", productController.getProducts.bind(productController));
router.get("/product/:id", productController.getProductById.bind(productController));
router.post("/products", productController.createProduct.bind(productController));
router.put("/product/:id", productController.editProduct.bind(productController));
router.delete("/product/:id", productController.deleteProduct.bind(productController));
router.get("/categories", productController.getCategories.bind(productController));
exports.default = router;
