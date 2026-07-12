import { DrawerClose } from "@/components/ui/drawer"
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Input } from "../common/Input"
import { CustomDrawer } from "../common/CustomDrawer"
import { ShoppingCart } from "../shoppingCart/ShoppingCart"
import { CustomDrawerHeader } from "../common/CustomDrawerHeader"
import { CustomDrawerFooter } from "../shoppingCart/ShoppingDrawerFooter"
import { NavTabs } from "./NavTabs"
import { useAuth } from "@/hooks/useAuth"
import useProductSearch from "@/hooks/useProductSearch"

export const NavbarMovil = () => {
    const { user } = useAuth()
    const { searchTerm, handleSearchChange, handleSearchSubmit } = useProductSearch()
    const profileHref = user?._id ? "/profile" : "/login"

    return (
        <div className="flex w-full px-2 justify-between items-center bg-white shadow-md sticky top-0 z-50 md:hidden">
            <CustomDrawer
                direction="left"
                icon={<Menu />}
                header={(
                    <CustomDrawerHeader
                        title="Explora OVERSTRYDE"
                        description="Encuentra ropa deportiva disenada para rendimiento y estilo"
                        icon={<Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />}
                    />
                )}
                content={(
                    <div className="flex flex-col gap-4 px-1">
                        <Input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                        />
                        <NavTabs />
                    </div>
                )}
            />
            <NavLink to="/">
                <h2>OVERSTRYDE</h2>
            </NavLink>
            <div className="flex gap-2 align-middle py-3.5">
                <NavLink to="/favorites">
                    <Heart size={20} className="transition-transform duration-300 hover:-translate-y-1" />
                </NavLink>
                <NavLink to={profileHref}>
                    <User size={20} className="transition-transform duration-300 hover:-translate-y-1" />
                </NavLink>
                <CustomDrawer
                    direction="right"
                    icon={<ShoppingBag size={20} className="transition-transform duration-300 hover:-translate-y-1 text-black" />}
                    header={(
                        <CustomDrawerHeader
                            title="Carrito de compras"
                            description="Todas las prendas que tu escojas estaran aca"
                            icon={(
                                <DrawerClose>
                                    <X size={25} />
                                </DrawerClose>
                            )}
                        />
                    )}
                    content={<ShoppingCart />}
                    footer={<CustomDrawerFooter className="shadow-md" />}
                />
            </div>
        </div>
    )
}
