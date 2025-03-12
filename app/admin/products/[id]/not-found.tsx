import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Producto no encontrado</Heading>
            <p className="dark:text-slate-300">Tal vez deseas volver a <Link href={'/admin/products?page=1'} className="text-green-400">Productos</Link></p>
        </div>
    )
}
