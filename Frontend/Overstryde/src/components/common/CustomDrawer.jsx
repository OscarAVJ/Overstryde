import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
export const CustomDrawer = ({ direction, icon, header, content, footer }) => {
    return (
        <Drawer direction={direction}>
            <DrawerTrigger asChild className={"bg-transparent"}>
                <Button className={"h-12"}>{icon}</Button>
            </DrawerTrigger>
            <DrawerContent className={"px-2"}>
                <div className="mx-auto w-full max-w-sm h-[80%] md:h-[70%] flex flex-col">
                    <DrawerHeader className="flex flex-row">
                        {header}
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto">
                        {content}
                    </div>
                </div>
                <DrawerFooter className={"h-[20%] mb-auto"}>
                    {footer}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>)
}
