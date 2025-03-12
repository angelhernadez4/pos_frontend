import { formatCurrency } from "@/src/utils"

type AmountProps = {
    label: string
    amount: number
    discount?: boolean
}
export default function Amount({label, amount, discount} : AmountProps) {
    return (
        <div className={`${discount && 'bg-green-400'} flex justify-between p-1`}>
            <dt className={`${discount ? 'dark:text-green-900' : 'dark:text-slate-300'} font-bold`}>{label}</dt>
            <dd className={`${discount ? 'dark:text-green-900' : 'dark:text-slate-300'} text-gray-900`}>{discount && '-'}{formatCurrency(amount)}</dd>
        </div>
    )
}
