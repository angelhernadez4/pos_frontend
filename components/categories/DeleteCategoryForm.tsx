import { Category } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export default function DeleteCategoryForm({ categoryId }: { categoryId: Category['_id'] }) {
    const handleDeleteCategory = async () => {
        "use server"
        try {
            const url = `${process.env.API_URL}/categories/${categoryId}`
            const req = await fetch(url, {
                method: 'DELETE'
            })
            await req.json()
        } catch (error) {

        } finally {
            revalidatePath('/admin/products')
        }


    }
    return (
        <form action={handleDeleteCategory}>
            <input type="submit" value="Eliminar" className="text-red-600 hover:text-red-800 cursor-pointer" />
        </form>
    )
}
