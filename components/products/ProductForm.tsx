import { CategoriesResponseSchema, Product } from "@/src/schemas"
import UploadProductImage from "./UploadProductImage"

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesResponseSchema.parse(json)
    return  categories.categories

}
export default async function ProductForm({ product } : { product? : Product }) {
    const categories = await getCategories()
    return (
        <>
            <div className="space-y-2 ">
                <label
                    htmlFor="name"
                    className="block dark:text-slate-300"
                >Nombre producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre producto"
                    className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="price"
                    className="block dark:text-slate-300"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio producto"
                    className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="inventory"
                    className="block dark:text-slate-300"
                >Inventario</label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad disponible"
                    className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="categoryId"
                    className="block dark:text-slate-300"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <UploadProductImage
                currentImage={product?.image}
            />
        </>
    )
}