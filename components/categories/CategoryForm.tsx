import { Category } from "@/src/schemas";

export default function CategoryForm({ category } : { category?: Category}) {
    return (
        <>
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className='block dark:text-slate-300'
                >
                    Nombre categoría
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre categoría"
                    className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="name"
                    defaultValue={category?.name}
                />
            </div>
        </>
    )
}
