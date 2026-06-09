import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "react-router-dom"

export function MenuAccordion({ columns }) {
    return (
        <Accordion
            type="single"
            collapsible
            className="max-w-lg"
        >
            {columns.map(category => {
                return <AccordionItem key={category.category} value={category.category}>
                    <AccordionTrigger>{category.category}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {category.items.map((item) => (
                                <Link key={item.href} to={item.href}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            })}
        </Accordion>
    )
}
