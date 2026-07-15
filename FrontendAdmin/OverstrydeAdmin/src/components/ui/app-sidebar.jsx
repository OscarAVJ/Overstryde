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
import { LayoutDashboard, ClipboardList, PackageSearch, FolderOpen, Image, EllipsisVertical, LogOut, Users, MessageSquare } from "lucide-react";
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
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./button";

export function AppSidebar() {
    const { authUser, logout } = useAuth()
    const location = useLocation();

    const shortEmail = authUser.email.slice(0, 20);

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
                                    isActive={location.pathname === "/testimonials"}
                                    className="h-12 data-[active=true]:text-yellow-400 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <Link to="/testimonials">
                                        <MessageSquare className="!w-6 !h-6" />
                                        <span className="group-data-[collapsible=icon]:hidden font-inter">Testimonios</span>
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

                            

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="cursor-pointer " >

                <div className="flex justify-center m-0">
                    <img src={authUser.photo} alt="" className="h-9 w-9 object-cover rounded-full hidden group-data-[collapsible=icon]:block ring-white" />
                </div>

                <Popover >
                    <PopoverTrigger>
                        <div className=" sidebarFooter flex flex-row items-center justify-between lg:justify-start p-1 rounded-xl ring-2 ring-gray-700 gap-3 mx-1 group-data-[collapsible=icon]:hidden hover:!bg-gray-800 transition-colors duration-200">
                            <img src={authUser.photo} alt="" className="h-10 w-10 object-cover rounded-full" />
                            <div className="flex flex-col m-0 items-center sm:items-start">
                                <p className="font-bold text-xs">{authUser.name}</p>
                                <p className="text-xs hidden sm:block">{shortEmail}...</p>
                                <p className="text-xs sm:hidden">{authUser.email}</p>
                            </div>
                            <EllipsisVertical className="!w-4 !h-4 shrink-0" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-50 bg-gray-100 mb-1" >
                        <PopoverHeader>
                            <PopoverTitle className="text-center">
                                Perfil
                            </PopoverTitle>
                            <div className="flex flex-col justify-center items-center gap-2 p-3">
                                <img src={authUser.photo} alt="" className="size-30 object-cover rounded-full" />
                                <div>
                                    <p className="font-bold text-center">{authUser.name} {authUser.last_name}</p>
                                    <p className="text-center text-sm">Administrador</p>
                                </div>
                                <Button variant="outline" onClick={logout}>
                                    <LogOut />
                                    Cerrar sesión
                                </Button>
                            </div>
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>

            </SidebarFooter>
        </Sidebar>
    )
} 
