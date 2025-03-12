import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default async function Salespage() {
    const queryClient = new QueryClient()
    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd')
    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate),
        retry: 1
    })    
    return (
        <>
            <Heading>Ventas</Heading>
            <p className="text-lg dark:text-slate-300">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha</p>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionFilter />
            </HydrationBoundary>
        </>
    )
}
