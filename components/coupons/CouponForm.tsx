"use client"

import { Coupon } from "@/src/schemas";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CouponForm({ coupon }: { coupon?: Coupon }) {
    const initialDate = coupon?.expirationDate ? parseISO(coupon.expirationDate) : new Date();
    const [date, setDate] = useState<Value>(initialDate as Date)
    const formattedDate = date instanceof Date ? format(date, 'yyyy-MM-dd') : '';
    return (
        <div className="space-y-2">
            <label
                htmlFor="name"
                className='block dark:text-slate-300'
            >
                Nombre cupón
            </label>
            <input
                id="name"
                type="text"
                placeholder="Nombre cupón"
                className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                name="name"
                defaultValue={coupon?.name}
            />
            <div className="space-y-2 ">
                <label
                    htmlFor="percentage"
                    className="block dark:text-slate-300"
                >Descuento</label>
                <input
                    id="percentage"
                    type="number"
                    placeholder="Descuento"
                    className="border border-gray-300 w-full p-2 rounded-lg dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 dark:placeholder:text-gray-500"
                    name="percentage"
                    min={0}
                    defaultValue={coupon?.percentage}
                />
            </div>
            <div className="space-y-2 ">
                <label
                    htmlFor="expirationDate"
                    className="block"
                >Fecha de expiración</label>
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="es"
                />
                <input type="hidden" name="expirationDate" defaultValue={formattedDate} />
            </div>
        </div>
    )
}
