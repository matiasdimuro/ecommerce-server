"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = void 0;
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./presentation/routes/Router"));
const ProductsMongoRepository_1 = require("./repositories/ProductsMongoRepository");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Middleware para permitir CORS
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Middleware para transformar req.body en json
app.use(express_1.default.json());
app.use("/api", Router_1.default);
app.use("/", (_req, res) => {
    res.send(`<h1>Server home page</h1>`);
});
exports.productRepository = new ProductsMongoRepository_1.MongodbRepository();
exports.productRepository.createConnection()
    .then(() => {
    return `Server connected to MongoDB database ...`;
})
    .catch(() => {
    return `Error! Server could not connect to database ...`;
})
    .finally(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} ...`);
    });
});
