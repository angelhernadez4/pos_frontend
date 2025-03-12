import CouponsTable from "@/components/coupons/CouponsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { CouponResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCoupons(take: number, skip: number) {
    const url = `${process.env.API_URL}/coupons?take=${take}&skip=${skip}`

    const req = await fetch(url)
    const json = await req.json()

    const data = CouponResponseSchema.parse(json)
    return {
        coupons: data.coupons,
        total: data.total
    }
}

type SearchParams = Promise<{ page: string }>


export default async function Couponspage({searchParams} : { searchParams : SearchParams }) {
    const { page } = await searchParams
    if (!isValidPage(+page)) redirect('/admin/coupons?page=1')
    const couponsPerPage = 10
    const skip = (+page - 1) * couponsPerPage
    const { coupons, total } = await getCoupons(couponsPerPage, skip)
    const totalPages = Math.ceil(total / couponsPerPage)
    if (+page > totalPages) redirect('/admin/coupons?page=1') 
    return (
        <>
            <Link
                href='/admin/coupons/new'
                className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
            >
                Nuevo cupón
            </Link>
            <Heading>Administrar cupones</Heading>
            <CouponsTable coupons={coupons} />
            <Pagination page={+page} totalPages={totalPages} baseUrl={'/admin/products'} />
        </>
    )
}
