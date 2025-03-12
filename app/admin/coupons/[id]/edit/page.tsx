import CouponForm from "@/components/coupons/CouponForm"
import EditCouponForm from "@/components/coupons/EditCouponForm"
import Heading from "@/components/ui/Heading"
import { CouponSchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getCoupon(id: string) {
    const url = `${process.env.API_URL}/coupons/${id}`
    const req = await fetch(url)
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }
    const coupon = CouponSchema.parse(json)
    return coupon
}
type Params = Promise<{ id: string }>

export default async function EditCouponPage({ params }: { params: Params }) {
    const { id } = await params
    const coupon = await getCoupon(id)
    const { name } = coupon
    return (
        <>
            <Link
                href='/admin/coupons'
                className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
            >
                Volver
            </Link>
            <Heading>Editar cupón {name}</Heading>
            <EditCouponForm>
                <CouponForm coupon={coupon} />
            </EditCouponForm>
        </>
    )
}
