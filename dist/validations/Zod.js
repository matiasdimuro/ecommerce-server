"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectIdSchemaValid = exports.isProductSchemaValid = void 0;
const zod_1 = require("zod");
const Category_enum_1 = require("../types/enums/Category.enum");
const stringConstraints = (prop) => ({
    required_error: `${prop} is required.`,
    invalid_type_error: `${prop} must be a string.`,
});
const numberConstraints = (prop) => ({
    required_error: `${prop} is required.`,
    invalid_type_error: `${prop} must be a number.`,
});
const ProductSchema = zod_1.z.object({
    name: zod_1.z.string(stringConstraints("Name")).min(5).max(20),
    description: zod_1.z.string(stringConstraints("Description")).optional(),
    currency: zod_1.z.string(stringConstraints("Currency")).max(3),
    price: zod_1.z.number(numberConstraints("Price")).positive(),
    image: zod_1.z.string().optional(),
    category: zod_1.z.nativeEnum(Category_enum_1.Category, {
        required_error: `Category is required.`,
        invalid_type_error: `Invalid category`,
    }),
    stockPerSize: zod_1.z.object({
        size: zod_1.z.string(),
        stock: zod_1.z.number()
    }, {
        required_error: `Stock per size is required.`,
        invalid_type_error: `Stock per size must be an array.`,
    }).array()
});
const ObjectIdSchema = zod_1.z.string(stringConstraints("ObjectID")).length(24);
function isProductSchemaValid(productToValidate) {
    const result = ProductSchema.safeParse(productToValidate);
    if (!result.success) {
        console.log(`> Validation Error:`, result.error.issues);
    }
    return result.success;
}
exports.isProductSchemaValid = isProductSchemaValid;
function isObjectIdSchemaValid(objectId) {
    const result = ObjectIdSchema.safeParse(objectId);
    if (!result.success) {
        console.log(`> Validation Error:`, result.error.issues);
    }
    return result.success;
}
exports.isObjectIdSchemaValid = isObjectIdSchemaValid;
