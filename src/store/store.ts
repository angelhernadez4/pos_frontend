import { create } from "zustand"
import { ApplyCoupon, ApplyCouponResponseSchema, Product, ShoppingCart } from "../schemas";
import { devtools } from "zustand/middleware";

interface Store {
    total: number
    discount: number
    contents: ShoppingCart
    coupon: ApplyCoupon
    addToCart: (product: Product) => void
    updateQuantity: (id: Product['_id'], quantity: number) => void
    removeFromCart: (id: Product['_id']) => void
    calculateTotal: () => void
    applyCoupon: (couponName: string) => Promise<void>
    applyDiscount: () => void
    clearOrder: () => void
}

const initialState = {
    total: 0,
    discount: 0,
    contents: [],
    coupon: {
        percentage: 0,
        name: '',
        message: ''
    },
}

export const useStore = create<Store>()(devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
        const { _id: productId, categoryId, ...data } = product
        let contents : ShoppingCart = []
        const duplicated = get().contents.findIndex(item => item.productId === productId)
        if (duplicated >= 0) {
            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            } : item)
        } else {
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId
            }]
        }
        
        set(() => ({
            contents
        }))
        get().calculateTotal()
    },
    updateQuantity: (id, quantity) => {
        set((state) => ({
            contents : state.contents.map(item => item.productId === id ? { ...item, quantity } : item)
        }))
        get().calculateTotal()
    },
    removeFromCart: id => {
        set((state) => ({
            contents: state.contents.filter(item => item.productId !== id)
        }))
        if (!get().contents.length) {
            get().clearOrder()
        }
        get().calculateTotal()
    },
    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        set(() => ({
            total
        }))
        if (get().coupon.percentage) {
            get().applyDiscount()
        }
    },
    applyCoupon: async (couponName) => {
        const req = await fetch('/coupons/api', {
            method: 'POST',
            body: JSON.stringify({
                coupon_name: couponName
            })
        })
        const json = await req.json() 
        console.log(json);
        
        const coupon = ApplyCouponResponseSchema.parse(json)  
        set(() => ({
            coupon
        }))
        if (coupon.percentage) {
            get().applyDiscount()
        }
    },
    applyDiscount: () => {
        const subtotalAmount = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        const discount = (get().coupon.percentage / 100) * subtotalAmount
        const total = subtotalAmount - discount
        set(() => ({
            discount,
            total
        }))
    },
    clearOrder: () => {
        set(() => ({
            ...initialState
        }))
    }
})))