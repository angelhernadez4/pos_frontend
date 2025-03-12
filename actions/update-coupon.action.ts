"use server"

import { Coupon, CouponFormSchema, ErrorResponseSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function UpdateCoupon(couponId: Coupon['_id'], prevState: ActionStateType, formData: FormData) {
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

    const url = `${process.env.API_URL}/coupons/${couponId}`
    const req = await fetch(url, {
        method: 'PATCH',
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
        success: 'Cupón actualizado correctamente'
    }
}
