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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbRepository = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_NAME = "ecommerce";
const URL = `mongodb+srv://${process.env.MONGODB_URI_USER}:${process.env.MONGODB_URI_PASSWORD}@e-commerce-cluster.f9t7yun.mongodb.net/?retryWrites=true&w=majority`;
class MongodbRepository {
    constructor() { }
    getProductsPreview() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> GET products from MongoDB");
            const projection = { _id: 1, name: 1, price: 1, image: 1, category: 1 };
            const documents = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('products').find({}, { projection }).toArray());
            return documents;
        });
    }
    getProductById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> GET product from MongoDB");
            const documents = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('products').find({ _id: new mongodb_1.ObjectId(id) }).toArray());
            const product = documents[0];
            return product;
        });
    }
    deleteProductById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> DELETE product from MongoDB");
            yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('products').deleteOne({ _id: new mongodb_1.ObjectId(id) }));
            return id;
        });
    }
    getCategory(categoryID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> GET category from MongoDB");
            const documents = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('categories').find({ _id: categoryID }).toArray());
            const category = documents[0];
            return category;
        });
    }
    getCategories(filters) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> GET categories from MongoDB");
            const filter = filters ? filters : {};
            const categories = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('categories').find(filter).toArray());
            return categories;
        });
    }
    createProduct(productToCreate) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> POST product from MongoDB");
            const response = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('products').insertOne(productToCreate));
            return response === null || response === void 0 ? void 0 : response.insertedId;
        });
    }
    editProduct(id, productData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> PUT product from MongoDB");
            yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection('products').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: {
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stockPerSize: productData.stockPerSize,
                } }));
        });
    }
    createConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("> Connecting to MongoDB ...");
            this.client = yield mongodb_1.MongoClient.connect(URL);
            this.db = (_a = this.client) === null || _a === void 0 ? void 0 : _a.db(DB_NAME);
        });
    }
}
exports.MongodbRepository = MongodbRepository;
