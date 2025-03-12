import { useStore } from "@/src/store/store"
import { FormEvent } from "react"

export default function CouponForm() {
    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const couponName = formData.get('coupon_name')?.toString()!
        if (!couponName.length) return
        await applyCoupon(couponName)
    }
    return (
        <>
            <p className="py-5 font-bold border-t border-gray-300 dark:text-slate-300">Canjear Cupón</p>
            <form
                className="flex"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="p-2 border bg-gray-200 border-gray-300 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500 w-full rounded-tl-md rounded-bl-md"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />
                <input
                    type="submit"
                    className="p-3 bg-green-400 dark:bg-green-600 font-bold hover:cursor-pointer rounded-tr-md rounded-br-md dark:text-slate-300 text-white"
                    value='Canjear'
                />
            </form>
            {coupon.message ? (
                <p className="py-4 text-center text-sm font-bold dark:text-slate-300">{coupon.message}</p>
            ) : null}
        </>
    )
}