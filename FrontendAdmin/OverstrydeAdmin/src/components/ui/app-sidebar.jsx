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
    SidebarFooter,
    SidebarRail
} from "@/components/ui/sidebar";
import { LayoutDashboard, ClipboardList, PackageSearch, FolderOpen, Image, EllipsisVertical, LogOut, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
    const { logout } = useAuth()
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r data-[collapsible=icon]:flex data-[collapsible=icon]:justify-center">
            <SidebarHeader className=" flex flex-row items-center">
                <img src="/overstryde-isotipo-blanco.png" alt="" className="h-10 w-10 ml-1 group-data-[collapsible=icon]:ml-0 " />
                <span className="p-6 text-xl font-semibold sidebarTitle group-data-[collapsible=icon]:hidden m-0 justify-start !font-inter">
                    OVERSTRYD
                </span>
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center ">

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center "
                                >
                                    <Link to={"/"}>
                                        <LayoutDashboard className=" !w-6 !h-6 "></LayoutDashboard>
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Dashboard
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/orders"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to={"/orders"} >
                                        <ClipboardList className=" !w-6 !h-6" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Órdenes
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/products"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to={"/products"}>
                                        <PackageSearch className=" !w-6 !h-6" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Productos
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/categories"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to={"/categories"}>
                                        <FolderOpen className=" !w-6 !h-6" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Categorías
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/banners"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to={"/banners"}>
                                        <Image className="\ !w-6 !h-6 group-data-[collapsible=icon]:mr-0" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Banners
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/users"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to={"/users"}>
                                        <Users className="\ !w-6 !h-6 group-data-[collapsible=icon]:mr-0" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">
                                            Usuarios
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="cursor-pointer " >

                <div className="hover:!bg-gray-800 flex justify-center m-0">
                    <img src="https://thumbs.dreamstime.com/b/foto-de-perfil-un-hombre-cauc%C3%A1sico-sonriente-los-a%C3%B1os-con-gafas-del-joven-y-feliz-en-espect%C3%A1culos-muestra-confianza-liderazgo-196716547.jpg" alt="" className="h-9 w-9 object-cover rounded-full hidden group-data-[collapsible=icon]:block ring-white" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className=" sidebarFooter flex flex-row items-center justify-between lg:justify-start p-3 rounded-xl ring-2 ring-gray-700 gap-3 mx-1 group-data-[collapsible=icon]:hidden hover:!bg-gray-800 transition-colors duration-200">
                            <img src="https://thumbs.dreamstime.com/b/foto-de-perfil-un-hombre-cauc%C3%A1sico-sonriente-los-a%C3%B1os-con-gafas-del-joven-y-feliz-en-espect%C3%A1culos-muestra-confianza-liderazgo-196716547.jpg" alt="" className="h-10 w-10 object-cover rounded-full" />
                            <div className="flex flex-col m-0">
                                <p className="font-bold text-xs">Max Jiménez</p>
                                <p className="text-xs">20240071@gmail.com</p>
                            </div>
                            <EllipsisVertical className="!w-4 !h-4 shrink-0" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 " align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={logout}>
                                <LogOut />
                                <Link to="/auth/login">
                                    Cerrar sesión
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>


            </SidebarFooter>
        </Sidebar>
    )
} 