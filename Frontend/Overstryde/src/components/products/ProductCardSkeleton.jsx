import { Skeleton } from "@/components/ui/skeleton"

export const ProductCardSkeleton = () => {
    return (
        <div className="w-full max-w-75 flex flex-col gap-3">
            <Skeleton className="relative w-full aspect-3/4 rounded-xl" />

            <div className="flex flex-col gap-2 px-1">
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                </div>

                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-14" />
                </div>
            </div>
        </div>
    )
}
