import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Categoría no encontrada</Heading>
            <p className="dark:text-slate-300">Tal vez deseas volver a <Link href={'/admin/categories?page=1'} className="text-green-400">categorias</Link></p>
        </div>
    )
}
