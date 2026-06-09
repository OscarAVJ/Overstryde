import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import useCategories from "@/hooks/useCategories"
import { MenuAccordion } from "./MenuAccordion"

const TAB_VALUES = {
    male: "men",
    female: "fem",
    accesory: "acc",
}

export function NavTabs() {
    const { navigationCategories } = useCategories()
    const defaultValue = TAB_VALUES[navigationCategories[0]?.type] || "men"

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
