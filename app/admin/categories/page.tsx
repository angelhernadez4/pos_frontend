import CategoriesTable from "@/components/categories/CategoriesTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { CategoriesResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCategories(take: number, skip: number) {
    const url = `${process.env.API_URL}/categories?take=${take}&skip=${skip}`

    const req = await fetch(url)
    const json = await req.json()

    const data = CategoriesResponseSchema.parse(json)
    return {
        categories: data.categories,
        total: data.total
    }
}

type SearchParams = Promise<{ page: string }>


export default async function Categoriespage({searchParams} : { searchParams : SearchParams }) {
    const { page } = await searchParams
    if (!isValidPage(+page)) redirect('/admin/categories?page=1')
    const categoriesPerPage = 10
    const skip = (+page - 1) * categoriesPerPage

    const {categories, total} = await getCategories(categoriesPerPage, skip)
    const totalPages = Math.ceil(total / categoriesPerPage)
    if (+page > totalPages) redirect('/admin/categories?page=1') 
    return (
        <>
            <Link
                href='/admin/categories/new'
                className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
            >
                Nueva categoría
            </Link>
            <Heading>Administrar categorias</Heading>
            <CategoriesTable categories={categories} />
            <Pagination page={+page} totalPages={totalPages} baseUrl={'/admin/products'} />
        </>
    )
}
