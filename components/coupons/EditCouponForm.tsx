"use client"

import { UpdateCoupon } from "@/actions/update-coupon.action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditCouponForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()
    const updateCouponWithId = UpdateCoupon.bind(null, id)
    const [state, dispatch] = useActionState(updateCouponWithId, {
        errors: [],
        success: ''
    })
    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/coupons')
        }
    }, [state])
    return (
        <form className="space-y-5" action={dispatch}>
            {children}
            <input type="submit" className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 w-full cursor-pointer" value={'Guardar cambios'} />
        </form>
    )
}
