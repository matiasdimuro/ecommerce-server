import { z } from "zod"
import { Category } from "../types/enums/Category.enum"

const stringConstraints = (prop: string) => ({
    required_error: `${prop} is required.`,
    invalid_type_error: `${prop} must be a string.`,
})

const numberConstraints = (prop: string) => ({ 
    required_error: `${prop} is required.`,
    invalid_type_error: `${prop} must be a number.`,
})


const ProductSchema = z.object({
    name: z.string(stringConstraints("Name")).min(5).max(20),
    description: z.string(stringConstraints("Description")).optional(),
    currency: z.string(stringConstraints("Currency")).max(3),
    price: z.number(numberConstraints("Price")).positive(),
    image: z.string().optional(),
    category: z.nativeEnum(Category, {
        required_error: `Category is required.`,
        invalid_type_error: `Invalid category`,
    }),
    stockPerSize: z.object({
        size: z.string(),
        stock: z.number()
    }, {
        required_error: `Stock per size is required.`,
        invalid_type_error: `Stock per size must be an array.`,
    }).array()
})

const ObjectIdSchema = z.string(stringConstraints("ObjectID")).length(24)

export function isProductSchemaValid(productToValidate: any) {
    const result = ProductSchema.safeParse(productToValidate) 
    if (!result.success) {
        console.log(`> Validation Error:`, result.error.issues)
    }
    return result.success
}

export function isObjectIdSchemaValid(objectId: any) {
    const result = ObjectIdSchema.safeParse(objectId) 
    if (!result.success) {
        console.log(`> Validation Error:`, result.error.issues)
    }
    return result.success
}