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
exports.ProductController = void 0;
const ProductService_1 = require("../../domain/services/ProductService");
const Zod_1 = require("../../validations/Zod");
class ProductController {
    constructor(productRepository) {
        this.productService = new ProductService_1.ProductService(productRepository);
    }
    getProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - getProducts");
            try {
                const products = yield this.productService.getProductsPreview();
                console.log("Products from controller: ", products);
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - getProductById");
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(404).send("Product ID was not specified");
                }
                else if (!(0, Zod_1.isObjectIdSchemaValid)(id)) {
                    res.status(404).send("Bad request");
                }
                else {
                    const product = yield this.productService.getProductById(id);
                    res.status(200).json(product);
                }
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - createProduct");
            try {
                const productToCreate = req.body;
                const isValidBody = (0, Zod_1.isProductSchemaValid)(productToCreate);
                if (!isValidBody) {
                    res.status(404).send("Bad request");
                }
                else {
                    const ID = yield this.productService.createProduct(productToCreate);
                    res.status(201).json({ msg: `Product with ID ${ID} has been created.` });
                }
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - deletProduct");
            try {
                const { id } = req.params;
                if (!(0, Zod_1.isObjectIdSchemaValid)(id)) {
                    res.status(404).send("Bad request");
                }
                else {
                    const objectIdDeleted = yield this.productService.deleteProduct(id);
                    objectIdDeleted === -1
                        ? res.status(404).json({ msg: `Error. Product ${id} does not exist.` })
                        : res.status(202).json({ msg: `Product ${id} has been deleted.` });
                }
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
    editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - deletProduct");
            try {
                const { id } = req.params;
                const productData = req.body;
                if (!(0, Zod_1.isProductSchemaValid)(productData) || !(0, Zod_1.isObjectIdSchemaValid)(id)) {
                    res.status(404).send("Bad request");
                }
                else {
                    yield this.productService.editProduct(id, productData);
                    res.status(204);
                }
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
    getCategories(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> ProductController - getCategories");
            try {
                const categories = yield this.productService.getCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                res.status(500).send("Internal server error");
            }
        });
    }
}
exports.ProductController = ProductController;
