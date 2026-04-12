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
                {icon}
            </DrawerTrigger>
            <DrawerContent className={"px-2"}>
                <div className="mx-auto w-full max-w-sm h-full flex flex-col">
                    <DrawerHeader className="flex flex-row">
                        {header}
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto">
                        {content}
                    </div>
                    <DrawerFooter className={""}>
                        {footer}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>)
}
