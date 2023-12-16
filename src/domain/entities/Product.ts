import { ObjectId } from "mongodb";
import { Category } from "../../types/enums/Category.enum";
import { IProductPreview } from "../../types/interfaces/IProduct";

type TstockPerSizeItem = {
    size: string,
    stock: number 
}
type TstockPerSize = Array<TstockPerSizeItem>

export class Product {
    
    private readonly ID: ObjectId | undefined;
    private name: string
    private description: string
    private readonly currency: string
    private price: number
    private readonly image: string
    private readonly stockPerSize: TstockPerSize;
    private readonly category: Category

    constructor(
        ID: ObjectId | undefined,
        name: string, 
        description: string, 
        currency: string, 
        price: number, 
        image: string,
        category: Category,
        stockPerSize: TstockPerSize
    ) {
        this.ID = ID
        this.name = name
        this.description = description
        this.currency = currency
        this.price = price
        this.image = image
        this.category = category
        this.stockPerSize = stockPerSize
    }

    public getProductPreview(): IProductPreview {
        return {
            _id: this.ID,
            name: this.name,
            price: this.price,
            category: this.category,
            image: this.image
        }
    }

    
    public getID() : ObjectId | undefined {
        return this.ID
    }

    public getName() : string {
        return this.name
    }
    public getDescription() : string {
        return this.description
    }
    public getCurrency() : string {
        return this.currency
    }
    public getPrice() : number {
        return this.price
    }
    public getImage() : string {
        return this.image
    }
    public getStockPerSize() : Array<any> {
        return this.stockPerSize 
    }
    public getCateory() : Category {
        return this.category
    }
    
}