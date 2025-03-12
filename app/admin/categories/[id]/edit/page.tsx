import CategoryForm from '@/components/categories/CategoryForm'
import EditCategoryForm from '@/components/categories/EditCategoryForm'
import Heading from '@/components/ui/Heading'
import { CategorySchema } from '@/src/schemas'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

async function getCategory(id: string) {
    const url = `${process.env.API_URL}/categories/${id}`
    const req = await fetch(url)
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }
    const category = CategorySchema.parse(json)
    return category
}

type Params = Promise<{ id: string }>


export default async function EditCategoryPage({ params }: { params: Params }) {
    const { id } = await params
    const category = await getCategory(id)
    const { name } = category
    return (
        <>
            <Link
                href='/admin/categories?page=1'
                className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
            >
                Volver
            </Link>
            <Heading>Editar categoría {name}</Heading>
            <EditCategoryForm>
                <CategoryForm category={category} />
            </EditCategoryForm>
        </>
    )
}
