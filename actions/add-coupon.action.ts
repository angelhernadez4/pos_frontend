"use server"

import { CouponFormSchema, ErrorResponseSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function addCoupon(prevState: ActionStateType, formData: FormData) {
    const coupon = CouponFormSchema.safeParse({
        name: formData.get('name'),
        percentage: formData.get('percentage'),
        expirationDate: formData.get('expirationDate')
    })    

    if (!coupon.success) {
        return {
            errors: coupon.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/coupons`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coupon.data)
    })

    const json = await req.json()
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }
    return {
        errors: [],
        success: 'Cupón agregado correctamente'
    }
}