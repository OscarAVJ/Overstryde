import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import useCategories from "@/hooks/useCategories"
import { MenuAccordion } from "./MenuAccordion"
import { Skeleton } from "../ui/skeleton"

const TAB_VALUES = {
    male: "men",
    female: "fem",
    accesory: "acc",
}

export function NavTabs() {
    const { navigationCategories, isLoading } = useCategories()
    const defaultValue = TAB_VALUES[navigationCategories[0]?.type] || "men"

    if (isLoading) {
        return (
            <div>
                <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-9 flex-1" />
                    ))}
                </div>
                <div className="mt-4 space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-full rounded-md" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Tabs defaultValue={defaultValue}>
            <TabsList variant="line">
                {navigationCategories.map((navigationCategory) => (
                    <TabsTrigger key={navigationCategory.type} value={TAB_VALUES[navigationCategory.type]}>
                        {navigationCategory.category}
                    </TabsTrigger>
                ))}
            </TabsList>

            {navigationCategories.map((navigationCategory) => (
                <TabsContent key={navigationCategory.type} value={TAB_VALUES[navigationCategory.type]}>
                    <MenuAccordion
                        columns={navigationCategory.items.map((item) => ({
                            category: item.title,
                            items: item.links,
                        }))}
                    />
                </TabsContent>
            ))}
        </Tabs>
    )
}
