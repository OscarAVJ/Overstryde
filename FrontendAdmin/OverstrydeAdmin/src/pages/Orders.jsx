import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, Search, Pencil, Trash2, Eye } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card2"
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table2";
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'

const Orders = () => {

  const orders = [
    {
      name: "Ana Martínez",
      orderId: "#ORD-001",
      products: [
        {
          productName: "Camiseta deportiva",
          price: 23,
          quantity: 2
        },
        {
          productName: "Creatina 500g",
          price: 30,
          quantity: 1
        },
        {
          productName: "Mancuerna 10kg",
          price: 30,
          quantity: 1
        }
      ],
      date: "12/04/23"
    },
    {
      name: "Rodrigo Salguero",
      orderId: "#ORD-002",
      products: [
        {
          productName: "Camiseta deportiva",
          price: 23,
          quantity: 2
        },
        {
          productName: "Creatina 500g",
          price: 30,
          quantity: 1
        }
      ],
      date: "12/04/23"
    },
    {
      name: "Fernando Velásquez",
      orderId: "#ORD-003",
      products: [
        {
          productName: "Camiseta deportiva",
          price: 23,
          quantity: 2
        },
        {
          productName: "Creatina 500g",
          price: 30,
          quantity: 1
        }
      ],
      date: "12/04/23"
    },
    {
      name: "Jennifer Alfaro",
      orderId: "#ORD-004",
      products: [
        {
          productName: "Camiseta deportiva",
          price: 23,
          quantity: 2
        }
      ],
      date: "12/04/23"
    },
    {
      name: "Max Jiménez",
      orderId: "#ORD-005",
      products: [
        {
          productName: "Camiseta deportiva",
          price: 23,
          quantity: 2
        },
        {
          productName: "Creatina 500g",
          price: 30,
          quantity: 1
        }
      ],
      date: "12/04/23"
    }
  ]

  return (
    <>
      <div className='space-y-6 min-h-screen p-6 rounded-lg'>
        <div className='grid grid-cols-1 gap-3'>
          <div className='flex flex-col gap-1.5 font-inter justify-center sm:justify-start'>
            <p className='leading-none text-2xl font-bold text-center sm:text-left'>Gestionar órdenes</p>
            <p className='text-muted-foreground text-center sm:text-left'>Administra las órdenes de compra de la tienda</p>
          </div>
        </div>
        <Separator />
        <div>
          <Card>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 items-end'>
                <Field>
                  <FieldLabel htmlFor="searchBar" className="font-bold">BUSCAR ÓRDEN</FieldLabel>
                  <Input id="searchBar" type="text" placeholder="Buscar por usuario o ID..." />
                </Field>
                <Field>
                  <FieldLabel htmlFor="statusSelect" className="font-bold">ESTADO</FieldLabel>
                  <Select>
                    <SelectTrigger id="statusSelect" defaultValue="">
                      <SelectValue placeholder="Elegir estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Todos los estados</SelectItem>
                        <SelectItem value="2">Entregado</SelectItem>
                        <SelectItem value="3">Enviado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="dateFilter" className="font-bold">FECHA</FieldLabel>
                  <Select>
                    <SelectTrigger id="dateFilter" defaultValue="">
                      <SelectValue placeholder="Elegir período de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Todos los tiempos</SelectItem>
                        <SelectItem value="2">Última semana</SelectItem>
                        <SelectItem value="3">Último mes</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Button className="h-12 font-bold">
                  <Search />
                  FILTRAR
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>

          {orders.map((order, index) => {

            return (
              <Card className="shadow flex flex-col h-full" key={index}>
                <CardContent className="flex flex-1 flex-col h-fulls">
                  <div>

                    <div className='header mb-6'>
                      <div className='grid grid-cols-2'>
                        <div className='flex flex-row items-center gap-4'>
                          <img src="https://media.istockphoto.com/id/1142192548/es/vector/perfil-de-avatar-hombre-silueta-de-cara-masculina-o-icono-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=O6KtgzjlrIvoGi2Cb1ZyppWKlqGL_5IXVHLUdLN33Ag=" alt="" className='h-9 w-9' />
                          <div className='flex flex-col'>
                            <p>{order.name}</p>
                            <p>{order.orderId}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <p className='text-end text-green-700 font-bold'>Entregada</p>
                        </div>
                      </div>
                    </div>

                    <div className='body mb-3'>
                      <div className='flex flex-col gap-2'>

                        {order.products.map((product, index) => {

                          return (
                            <div className='grid grid-cols-2' key={index}>
                              <div className='flex flex-row items-center gap-2'>
                                <img src="https://cicadex.com/wp-content/uploads/2020/01/350-33-Camiseta-Hom-Azul-ped-27-3-4-RH-copia.jpg" alt="" className='w-5 h-5' />
                                <p>{product.productName}</p>
                              </div>
                              <div className='flex items-center justify-end'>
                                <p className='font-bold'> {product.quantity} x ${product.price}</p>
                              </div>
                            </div>
                          )

                        })}

                      </div>
                    </div>

                  </div>

                  <div className='mt-auto'>
                    <Separator className="mb-3" />
                    <div className='grid grid-cols-2'>
                      <div className='flex flex-row items-center gap-2'>
                        <p className='text-lg font-bold'>Total: $139.48</p>
                      </div>
                      <div className='flex items-center justify-end'>
                        <p className='text-gray-400'>{order.date}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-bold">
                    <Eye />
                    Ver
                  </Button>
                </CardFooter>
              </Card>
            )

          })}

          {/* 
          <Card className="shadow">
            <CardContent>
              <div className='header mb-6'>
                <div className='grid grid-cols-2'>
                  <div className='flex flex-row items-center gap-4'>
                    <img src="https://media.istockphoto.com/id/1142192548/es/vector/perfil-de-avatar-hombre-silueta-de-cara-masculina-o-icono-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=O6KtgzjlrIvoGi2Cb1ZyppWKlqGL_5IXVHLUdLN33Ag=" alt="" className='h-9 w-9' />
                    <div className='flex flex-col'>
                      <p>María Martínez</p>
                      <p>#ORD-001</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className='text-end text-green-700 font-bold'>Entregada</p>
                  </div>
                </div>
              </div>
              <div className='body mb-3'>
                <div className='flex flex-col gap-2'>

                  <div className='grid grid-cols-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <img src="https://cicadex.com/wp-content/uploads/2020/01/350-33-Camiseta-Hom-Azul-ped-27-3-4-RH-copia.jpg" alt="" className='w-5 h-5' />
                      <p>Camiseta deportiva</p>
                    </div>
                    <div className='flex items-center justify-end'>
                      <p className='font-bold'> 2 x $34.30</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <img src="https://cicadex.com/wp-content/uploads/2020/01/350-33-Camiseta-Hom-Azul-ped-27-3-4-RH-copia.jpg" alt="" className='w-5 h-5' />
                      <p>Creatina 500g</p>
                    </div>
                    <div className='flex items-center justify-end'>
                      <p className='font-bold'> 1 x $40.30</p>
                    </div>
                  </div>

                </div>
              </div>
              <Separator className="mb-3" />
              <div className='grid grid-cols-2'>
                <div className='flex flex-row items-center gap-2'>
                  <p className='text-lg font-bold'>Total: $139.48</p>
                </div>
                <div className='flex items-center justify-end'>
                  <p className='text-gray-400'>11/03/26</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold">
                <Eye />
                Ver
              </Button>
            </CardFooter>
          </Card>
          */}

        </div>
      </div>

    </>
  )
}

export default Orders