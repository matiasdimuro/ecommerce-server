"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../entities/Product");
const Category_enum_1 = require("../../types/enums/Category.enum");
class ProductService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    getProductsPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - getProducts");
            const productsSchema = yield this.productsRepository.getProductsPreview();
            let products = [];
            for (let i = 0; i < productsSchema.length; i++) {
                const productSchema = productsSchema[i];
                const categorySchema = yield this.productsRepository.getCategory(productSchema.category);
                const category = this.getCategoryGivenName(categorySchema.name);
                const product = new Product_1.Product(productSchema._id, productSchema.name, "", "", productSchema.price, productSchema.image, category, []);
                products.push(product.getProductPreview());
            }
            return products;
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - getProductById");
            const productSchema = yield this.productsRepository.getProductById(id);
            const categorySchema = yield this.productsRepository.getCategory(productSchema.category);
            const category = this.getCategoryGivenName(categorySchema.name);
            const product = new Product_1.Product(productSchema._id, productSchema.name, productSchema.description, productSchema.currency, productSchema.price, productSchema.image, category, productSchema.stockPerSize);
            return product;
        });
    }
    createProduct(productToCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - createProduct");
            const categorySchema = yield this.productsRepository.getCategories({ name: productToCreate.category });
            const product = {
                name: productToCreate.name,
                description: productToCreate.description,
                currency: productToCreate.currency,
                price: productToCreate.price,
                image: productToCreate.image,
                category: categorySchema[0]._id,
                stockPerSize: productToCreate.stockPerSize
            };
            const ID = yield this.productsRepository.createProduct(product);
            return ID;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - deleteProduct");
            const product = yield this.productsRepository.getProductById(id);
            if (!product)
                return -1;
            const deletedId = yield this.productsRepository.deleteProductById(id);
            return deletedId;
        });
    }
    editProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - editProduct");
            yield this.productsRepository.editProduct(id, productData);
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductService - getCategories");
            const categories = yield this.productsRepository.getCategories();
            return categories;
        });
    }
    getCategoryGivenName(categoryName) {
        switch (categoryName) {
            case "Remeras":
                return Category_enum_1.Category.REMERAS;
            case "Pantalones":
                return Category_enum_1.Category.PANTALONES;
            case "Bermudas":
                return Category_enum_1.Category.BERMUDAS;
            case "Musculosas":
                return Category_enum_1.Category.MUSCULOSAS;
            default:
                return Category_enum_1.Category.CAMISAS;
        }
    }
}
exports.ProductService = ProductService;
