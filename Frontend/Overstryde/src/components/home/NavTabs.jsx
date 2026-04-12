
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MenuAccordion } from "./MenuAccordion"

const navItems = [
    {
        title: "Hombres",
        columns: [
            {
                category: "Camisas y tops",
                items: [
                    "Todos",
                    "Camisas de compresión",
                    "Camisetas",
                    "Camisetas oversize",
                    "Manga larga",
                    "Camisetas negras"
                ]
            },
            {
                category: "Productos",
                items: [
                    "Todos",
                    "Camisas y tops",
                    "Shorts",
                    "Hoodies",
                    "Joggers",
                    "Pants",
                    "Sueters",
                    "Sudaderas"
                ]
            },
            {
                category: "Accesorios",
                items: [
                    "Todos"
                ]
            }
        ]
    },
    {
        title: "Mujeres",
        columns: [
            {
                category: "Leggins",
                items: [
                    "Todos",
                    "Leggins negros",
                    "Leggins de cintura alta",
                    "Leggins acampanados",
                    "Leggins con bolsillos",
                    "Leggins efecto \"scrunch\""
                ]
            },
            {
                category: "Productos",
                items: [
                    "Todos",
                    "Camisas y tops",
                    "Sujetadores deportivos",
                    "Camisetas de manga larga",
                    "Shorts",
                    "Sudaderas y hoodies",
                    "Joggers y pantalones deportivos",
                    "Pantalones",
                    "Bodies",
                    "Chándales"
                ]
            },
            {
                category: "Accesorios",
                items: [
                    "Todos"
                ]
            }
        ]
    },
    {
        title: "Accesorios",
        columns: [
            {
                category: "Mochilas",
                items: [
                    "Todos"
                ]
            },
            {
                category: "Equipamiento",
                items: [
                    "Todos",
                    "Camisas y tops",
                    "Sujetadores deportivos",
                    "Camisetas de manga larga",
                    "Shorts",
                    "Sudaderas y hoodies",
                    "Joggers y pantalones deportivos",
                    "Pantalones",
                    "Bodies",
                    "Chándales"
                ]
            },
            {
                category: "Ropa interior",
                items: [
                    "Todos"
                ]
            },
            {
                category: "Calzado",
                items: [
                    "Todos"
                ]
            },
            {
                category: "Suplementos",
                items: [
                    "Proteína",
                    "Creatina",
                    "Vitaminas"
                ]
            }
        ]
    }
];

export function NavTabs() {
    return (
        <Tabs defaultValue="men">
            <TabsList variant="line">
                <TabsTrigger value="men">{navItems[0].title}</TabsTrigger>
                <TabsTrigger value="fem">{navItems[1].title}</TabsTrigger>
                <TabsTrigger value="acc">{navItems[2].title}</TabsTrigger>
            </TabsList>
            <TabsContent value="men">
                <MenuAccordion columns={navItems[0].columns} />
            </TabsContent>
            <TabsContent value="fem">
                <MenuAccordion columns={navItems[1].columns} />
            </TabsContent>            <TabsContent value="acc">
                <MenuAccordion columns={navItems[2].columns} />
            </TabsContent>
        </Tabs>
    )
}