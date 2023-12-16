"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(ID, name, description, currency, price, image, category, stockPerSize) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.currency = currency;
        this.price = price;
        this.image = image;
        this.category = category;
        this.stockPerSize = stockPerSize;
    }
    getProductPreview() {
        return {
            _id: this.ID,
            name: this.name,
            price: this.price,
            category: this.category,
            image: this.image
        };
    }
    getID() {
        return this.ID;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getCurrency() {
        return this.currency;
    }
    getPrice() {
        return this.price;
    }
    getImage() {
        return this.image;
    }
    getStockPerSize() {
        return this.stockPerSize;
    }
    getCateory() {
        return this.category;
    }
}
exports.Product = Product;
