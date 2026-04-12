import { NavLink } from "react-router";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "../common/Input";
import { Heart, ShoppingBag, User, X } from "lucide-react";
import { CustomDrawer } from "../common/CustomDrawer";
import { CustomDrawerHeader } from "../common/CustomDrawerHeader";
import { CustomDrawerFooter } from "../shoppingCart/ShoppingDrawerFooter";
import { DrawerClose } from "../ui/drawer";
import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { CustomNavigationMenuContent } from "./CustomNavigationMenuContent";
import { navigationData } from "@/data/navData";

export const Navbar = () => {
    return (
        <nav className="hidden md:block fixed items-center top-0 z-50 w-full h-13 bg-white shadow-2xs">
            <div className={"m-3 flex justify-between"}>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={"text-base"}>{navigationData[0].category}</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-6">
                                <div className="grid gap-2 md:w-full md:grid-cols-6  lg:w-150">
                                    {navigationData[0].items.map(item => <CustomNavigationMenuContent items={item.links} category={item.title} />
                                    )}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hidden md:flex">
                            <NavigationMenuTrigger className={"text-base"}>{navigationData[1].category}</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-6">
                                <div className="grid gap-2 md:w-full md:grid-cols-6  lg:w-150">
                                    {navigationData[1].items.map(item => <CustomNavigationMenuContent items={item.links} category={item.title} />
                                    )}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hidden md:flex">
                            <NavigationMenuTrigger className={"text-base"}>{navigationData[2].category}</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-6">
                                <div className="grid gap-2 md:w-full md:grid-cols-6  lg:w-150">
                                    {navigationData[2].items.map(item => <CustomNavigationMenuContent items={item.links} category={item.title} />
                                    )}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div>
                    <NavLink to={"/"}><h2 className="text-2xl font-extrabold">OVERSTRYDE</h2>
                    </NavLink>
                </div>
                <div className="flex gap-2 items-center">
                    <Input></Input>
                    <NavLink>
                        <Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <NavLink to={"/register"} className={""}>
                        <User size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <CustomDrawer direction={"right"} icon={<ShoppingBag size={30} className="transition-transform duration-300 hover:-translate-y-1 text-black" />} header={<CustomDrawerHeader title={"Carrito de compras"} description={"Todas las prendas que tu escojas estarán aca"} icon={<DrawerClose>
                        <X size={25} />
                    </DrawerClose>
                    } />} content={<ShoppingCart />
                    } footer={<CustomDrawerFooter className={"shadow-md"} />} />
                </div>
            </div>

        </nav>
    )
}
