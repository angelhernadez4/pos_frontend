import { z } from "zod";

export const ProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.string()
})

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})

export const CategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    products: z.array(z.string())
})

export const CategoriesResponseSchema = z.object({
    categories: z.array(CategorySchema),
    total: z.number()
})
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

export const CategoryFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre de la categoría es obligatorio' }),
})

/** Shopping cart  */
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true
}).extend({
    productId: z.string(),
    quantity: z.number()
})

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)
export const CouponSchema = z.object({
    _id: z.string(),
    name: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0),
    expirationDate: z.string()
})
export const CouponResponseSchema = z.object({
    coupons: z.array(CouponSchema),
    total: z.number()
})
export const ApplyCouponResponseSchema = z.object({
    name: z.string().default(''),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0)
})

export const CouponFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del cupón es obligatorio' }),
    percentage: z.coerce.number({ message: 'Descuento no válido' })
        .min(1, { message: 'El descuento debe ser mayor a 0' }),
    expirationDate: z.string()
        .min(1, { message: 'La fecha de expiración del cupón es obligatorio' }),
})

const OrderContentSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number()
})
export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z.array(OrderContentSchema).min(1, { message: 'El Carrito no puede ir vacio' })
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
    message: z.string()
})
export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
})

export const ContentsSchema = z.object({
    _id: z.string(),
    quantity: z.number(),
    price: z.number(),
    product: ProductSchema
})
export const TransactionResponseSchema = z.object({
    _id: z.string(),
    total: z.number(),
    transactionDate: z.string(),
    discount: z.number().nullable(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema)
})

export const TransactionsResponseSchema = z.array(TransactionResponseSchema)
export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del producto es obligatorio' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El precio debe ser mayor a 0' }),
    image: z.string({ message: 'La imagen es obligatoria' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.string({ message: 'La categoria no es válida' })
})
export type Product = z.infer<typeof ProductSchema>
export type Category = z.infer<typeof CategorySchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>
export type ApplyCoupon = z.infer<typeof ApplyCouponResponseSchema>
export type Coupon = z.infer<typeof CouponSchema>
export type Transaction = z.infer<typeof TransactionResponseSchema>