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
export const CustomDrawer = ({ direction, icon, header, content }) => {
    return (
        <Drawer direction={direction}>
            <DrawerTrigger asChild className={"bg-transparent"}>
                <Button className={"h-12"}>{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className={"flex flex-row"}>
                        {header}
                    </DrawerHeader>
                    <DrawerHeader>
                        {content}
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>)
}
