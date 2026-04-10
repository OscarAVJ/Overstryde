import { Link, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarFooter
} from "@/components/ui/sidebar";
import { LayoutDashboard, ClipboardList, PackageSearch, FolderOpen, Image } from "lucide-react";

export function AppSidebar() {

    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="group-data-[collapsible=icon]:hidden p-4 text-lg font-semibold">OVERSTRYD</SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                                    <Link to={"/"}>
                                        <LayoutDashboard className="mr-2 h-4 w-4"></LayoutDashboard>
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Dashboard
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/orders"} >
                                    <Link to={"/orders"} >
                                        <ClipboardList className="mr-2 h-4 w-4" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Órdenes
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/products"} >
                                    <Link to={"/products"}>
                                        <PackageSearch className="mr-2 h-4 w-4" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Products
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/categories"} >
                                    <Link to={"/categories"}>
                                        <FolderOpen className="mr-2 h-4 w-4" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Categorías
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/banners"} >
                                    <Link to={"/banners"}>
                                        <Image className="mr-2 h-4 w-4" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Banners
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="group-data-[collapsible=icon]:hidden">
                2026
            </SidebarFooter>
        </Sidebar>
    )
}