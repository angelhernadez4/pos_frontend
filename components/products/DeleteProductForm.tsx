import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteProductForm({ productId } : { productId: Product['_id'] }) {
    const handleDeleteProduct = async () => {
        "use server"
        try {
            const url = `${process.env.API_URL}/products/${productId}`
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
        <form action={handleDeleteProduct}>
            <input type="submit" value="Eliminar" className="text-red-600 hover:text-red-800 cursor-pointer" />
        </form>
    )
}
