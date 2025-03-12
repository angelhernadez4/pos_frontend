"use client"
import { useStore } from "@/src/store/store"
import ShoppingCartItem from "./ShoppinCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderFormt from "./SubmitOrderFormt"

export default function ShoppingCart() {
    const contents = useStore(state => state.contents)
    const total = useStore(state => state.total)
    const discount = useStore(state => state.discount)

    return (
        <>
            {contents.length ? (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-300">Resumen de venta</h2>
                    <ul
                        role="list"
                        className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                    >
                        {contents.map(item => (
                            <ShoppingCartItem key={item.productId} item={item} />
                        ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500 ">
                        {discount ? (
                            <Amount
                                label="Descuento"
                                amount={discount}
                                discount={true}
                            />
                        ): null}
                        <Amount
                            label="Total a pagar"
                            amount={total}
                        />
                    </dl>
                    <CouponForm />
                    <SubmitOrderFormt />
                </>
            ) : (
                <p className="text-xl text-center text-gray-900 dark:text-slate-300">El carrito esta vacío</p>
            )}
        </>
    )
}
