import { NavLink } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "../common/Input";
import { Heart, ShoppingBag, User, X } from "lucide-react";
import { CustomDrawer } from "../common/CustomDrawer";
import { CustomDrawerHeader } from "../common/CustomDrawerHeader";
import { CustomDrawerFooter } from "../shoppingCart/ShoppingDrawerFooter";
import { DrawerClose } from "../ui/drawer";
import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { CustomNavigationMenuContent } from "./CustomNavigationMenuContent";
import useCategories from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import useProductSearch from "@/hooks/useProductSearch";
import { Skeleton } from "../ui/skeleton";

export const Navbar = () => {
    const { navigationCategories, isLoading: isLoadingCategories } = useCategories()
    const { user } = useAuth()
    const { searchTerm, handleSearchChange, handleSearchSubmit } = useProductSearch()
    const profileHref = user?._id ? "/profile" : "/login"

    return (
        <nav className="hidden md:block sticky items-center top-0 z-50 w-full h-13 bg-white shadow-2xs">
            <div className={"m-1 flex justify-between"}>
                <NavigationMenu>
                    <NavigationMenuList>
                        {isLoadingCategories ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <NavigationMenuItem key={index} className="hidden md:flex px-3 py-2">
                                    <Skeleton className="h-5 w-20" />
                                </NavigationMenuItem>
                            ))
                        ) : navigationCategories.map((navigationCategory) => (
                            <NavigationMenuItem key={navigationCategory.type} className="hidden md:flex">
                                <NavigationMenuTrigger className={"text-base"}>
                                    {navigationCategory.category}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="p-6">
                                    <div className="grid gap-2 md:w-full md:grid-cols-4 lg:w-150">
                                        {navigationCategory.items.map((item) => (
                                            <CustomNavigationMenuContent
                                                key={item.id}
                                                items={item.links}
                                                category={item.title}
                                            />
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div>
                    <NavLink to={"/"}><h2 className="text-2xl font-extrabold">OVERSTRYDE</h2>
                    </NavLink>
                </div>
                <div className="flex gap-2 items-center">
                    <Input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}
                    />
                    <NavLink to={"/favorites"}>
                        <Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <NavLink to={profileHref} className={""}>
                        <User size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <CustomDrawer direction={"right"} icon={<ShoppingBag size={30} className="transition-transform duration-300 hover:-translate-y-1 text-black" />} header={<CustomDrawerHeader title={"Carrito de compras"} description={"Todas las prendas que tu escojas estaran aca"} icon={<DrawerClose>
                        <X size={25} />
                    </DrawerClose>
                    } />} content={<ShoppingCart />
                    } footer={<CustomDrawerFooter className={"shadow-md"} />} />
                </div>
            </div>

        </nav>
    )
}
