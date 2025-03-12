import AddCouponForm from "@/components/coupons/AddCouponForm";
import CouponForm from "@/components/coupons/CouponForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewCouponPage() {
    return (
        <>
            <Link
                href='/admin/coupons'
                className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
            >
                Volver
            </Link>
            <Heading>Nuevo cupón</Heading>
            <AddCouponForm>
                <CouponForm />
            </AddCouponForm>
        </>
    )
}
