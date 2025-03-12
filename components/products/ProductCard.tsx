import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default function ProductCard({product} : { product: Product }) {
    const { name, inventory, price, image } = product    
    return (
        <div
            className='rounded bg-white shadow relative p-5 dark:bg-slate-950'
        >
            <div className={`${!isAvailable(product.inventory) && 'opacity-40'}`}>
                <Image
                    src={getImagePath(image)}
                    alt={`Imagen de producto ${name}`}
                    className="rounded-md"
                    width={400}
                    height={600}
                    priority
                />
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600 dark:text-slate-300">{ name }</h3>
                    <p className="text-gray-500 dark:text-slate-300">Disponibles: { inventory }</p>
                    <p className="text-2xl font-extrabold dark:text-slate-300 text-gray-900">{formatCurrency(price)}</p>
                </div>
            </div>
            {
                isAvailable(product.inventory) ? (
                    <AddProductButton product={product} />
                ) : (
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black">Agotado</p>
                )
            }
            
        </div>
    )
}