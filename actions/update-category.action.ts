"use server"

import { Category, CategoryFormSchema, ErrorResponseSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function updateCategory(categoryId: Category['_id'], prevState: ActionStateType, formData: FormData) {
    const category = CategoryFormSchema.safeParse({
        name: formData.get('name')
    })

    if (!category.success) {
        return {
            errors: category.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/categories/${categoryId}`
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category.data)
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
        success: 'Categoría actualizada correctamente'
    }
}