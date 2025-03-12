import { Transaction } from "@/src/schemas"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"

export default function TransactionSummary({ transaction }: { transaction: Transaction }) {
    const { _id, contents } = transaction
    return (
        <>
            <div className='mt-6  text-sm font-medium text-gray-500 border border-gray-200 dark:border-slate-500 dark:bg-slate-600'>
                <p className='text-sm font-black text-gray-900 dark:text-slate-300 p-2 bg-gray-200 dark:bg-slate-700'>ID: {_id}</p>
                <ul
                    role="list"
                    className="divide-y divide-gray-200 border-t border-gray-200 dark:border-slate-500 border-b"
                >
                    {contents.map((item) => (
                        <li key={item._id} className="p-5 ">
                            <div className='flex items-center space-x-6 '>
                                <div className='relative w-32 h-32'>
                                    <Image
                                        src={getImagePath(item.product.image)}
                                        alt={`Imagen del producto ${item.product.name}`}
                                        className="absolute"
                                        fill
                                    />
                                </div>
                                <div className="flex-auto space-y-1 ">
                                    <h3 className="text-gray-900 dark:text-slate-300">{item.product.name}</h3>
                                    <p className="text-lg font-extrabold  text-gray-900 dark:text-slate-300">{formatCurrency(item.price)}</p>
                                    <p className="text-lg dark:text-slate-300 text-gray-900">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">
                    {transaction.coupon && (
                        <>
                            <div className="flex justify-between">
                                <dt className="dark:text-slate-300">Cupón Utilizado</dt>
                                <dd className="text-gray-900 dark:text-slate-300">{transaction.coupon}</dd>
                            </div>

                            <div className="flex justify-between">
                                <dt className="dark:text-slate-300">Descuento</dt>
                                <dd className="text-gray-900 dark:text-slate-300">- {formatCurrency(transaction.discount!)}</dd>
                            </div>
                        </>
                    )}


                    <div className="flex justify-between">
                        <dt className="text-lg text-black font-black dark:text-slate-300">Total</dt>
                        <dd className="text-lg text-black font-black dark:text-slate-300">{formatCurrency(transaction.total)}</dd>
                    </div>
                </dl>
            </div>
        </>
    )
}