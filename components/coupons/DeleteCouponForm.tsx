import { Coupon } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteCouponForm({ couponId } : { couponId: Coupon['_id'] }) {
    const handleDeleteCoupon = async () => {
        "use server"
        try {
            const url = `${process.env.API_URL}/coupons/${couponId}`
            const req = await fetch(url, {
                method: 'DELETE'
            })
            await req.json()
        } catch (error) {
            console.error(error);
        } finally {
            revalidatePath('/admin/products')
        }


    }
    return (
        <form action={handleDeleteCoupon}>
            <input type="submit" value="Eliminar" className="text-red-600 hover:text-red-800 cursor-pointer" />
        </form>
    )
}
