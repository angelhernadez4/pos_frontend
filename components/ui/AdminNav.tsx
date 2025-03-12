import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function AdminNav() {
    return (
        <header className="px-10 py-5 bg-gray-700 flex justify-between">
            <div className="flex gap-5 text-white">
                <Logo />
            </div>

            <div className="flex gap-2 items-center">
                <Link
                    href={'/admin/categories'}
                    className="rounded text-white dark:text-slate-300 font-bold p-2"
                >Categorias</Link>
                <Link
                    href={'/admin/products'}
                    className="rounded text-white dark:text-slate-300 font-bold p-2"
                >Productos</Link>
                <Link
                    href={'/admin/coupons'}
                    className="rounded text-white dark:text-slate-300 font-bold p-2"
                >Cupones</Link>
                <Link
                    href={'/admin/sales'}
                    className="rounded text-white dark:text-slate-300 font-bold p-2"
                >Ventas</Link>

                <Link
                    href={'/'}
                    className="rounded bg-green-400 dark:bg-green-600 dark:text-slate-300 text-white font-bold py-2 px-10"
                >Tienda</Link>
            </div>
        </header>
    )
}