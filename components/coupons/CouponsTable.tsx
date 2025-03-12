import { Coupon } from "@/src/schemas";
import { formatDate } from "@/src/utils";
import Link from "next/link";
import DeleteCouponForm from "./DeleteCouponForm";

export default function CouponsTable({ coupons } : { coupons: Coupon[] }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-10">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white dark:bg-slate-900 p-5 rounded-2xl">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-0">
                                        Nombre
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-0">
                                        Descuento
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-0">
                                        Fecha de expiración
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 dark:text-slate-300">
                                        Acciones<span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {!coupons.length ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="text-center p-5">Sin datos que mostrar</div>
                                        </td>
                                    </tr>
                                ) : 
                                ( coupons.map(coupon => (
                                    <tr key={coupon._id}>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-300 sm:pl-0">
                                            {coupon.name}
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-300 sm:pl-0">
                                            {`${coupon.percentage}%`}
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-300 sm:pl-0">
                                            {formatDate(coupon.expirationDate)}
                                        </td>
                                        <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                            <div className='flex gap-5 justify-end items-center'>
                                                <Link className="text-indigo-600 hover:text-indigo-800" href={`/admin/coupons/${coupon._id}/edit`}>Editar <span className="sr-only">, {coupon.name}</span></Link>
                                                <DeleteCouponForm couponId={coupon._id} />
                                            </div>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}