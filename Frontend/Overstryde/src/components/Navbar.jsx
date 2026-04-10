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
import { Input } from "./Input";
import { Heart, ShoppingBag, User } from "lucide-react";

const items = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]
export const Navbar = () => {
    return (
        <nav className="hidden md:block fixed items-center top-0 z-50 w-full h-13 bg-white shadow-2xs">
            <div className={"m-3 flex justify-between"}>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={"text-base"}>Inicio</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-96">
                                    <NavLink to="/docs" className={"flex flex-col hover:bg-muted"}>
                                        <p>Inicio</p>
                                        <p>JAJAJAJAJA</p>
                                    </NavLink>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hidden md:flex">
                            <NavigationMenuTrigger className={"text-base"}>Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                    {items.map((item) => (
                                        <NavLink to={item.href} className={"flex flex-col hover:bg-muted"}>
                                            <p>{item.title}</p>
                                            <p>{item.description}</p>
                                        </NavLink>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/docs" className={"text-base"}>Docs</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div>
                    <h2 className="text-lg">OVERSTRYDE</h2>
                </div>
                <div className="flex gap-2 align-middle">
                    <Input></Input>
                    <NavLink>
                        <Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <NavLink to={"/register"} className={""}>
                        <User size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                    <NavLink>
                        <ShoppingBag size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                    </NavLink>
                </div>
            </div>

        </nav>
    )
}
