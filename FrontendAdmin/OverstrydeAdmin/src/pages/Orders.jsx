import React from 'react'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Eye, ArrowLeftRight } from 'lucide-react'
import { Card, CardContent, CardFooter, } from "@/components/ui/card2"
import { Field, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import useOrders from '@/hooks/useOrders'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'

const Orders = () => {

  //HOOK de ORDERS
  const { loading, orders, editOrder } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  //Obtener estado de la orden
  const getOrderStatus = (status) => {
    if (status === "pending") {
      return {
        color: "text-yellow-800",
        text: "Pendiente"
      }
    } else if (status === "delivered") {
      return {
        color: "text-green-700",
        text: "Entregada"
      }
    } else if (status === "returned") {
      return {
        color: "text-red-700",
        text: "Devuelta"
      }
    } else {
      s
      return {
        color: "text-gray-800",
        text: status
      }
    }
  }

  //Cambiar estado de la orden
  const onEdit = async (newStatus, order, id) => {
    try {

      const updatedOrder = {
        ...order,
        status: newStatus,
        customerId: order.customerId._id,
        shopping_cart_id: order.shopping_cart_id._id
      };
      await editOrder(id, updatedOrder);
      toast.success("El estado de la orden fue actualizado", {
        position: "top-right"
      })

    } catch (error) {
      toast.error("Error actualizando la orden", {
        position: "top-right"
      })
    }
  }

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      // ========= BUSCADOR =========
      const customer =
        `${order.customerId.name} ${order.customerId.last_name}`.toLowerCase();

      const orderId = order._id.toLowerCase();

      const matchesSearch =
        customer.includes(search.toLowerCase()) ||
        orderId.includes(search.toLowerCase());

      // ========= ESTADO =========
      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      // ========= FECHA =========
      let matchesDate = true;

      const created = new Date(order.createdAt);
      const today = new Date();

      if (dateFilter === "week") {

        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);

        matchesDate = created >= weekAgo;

      } else if (dateFilter === "month") {

        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);

        matchesDate = created >= monthAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;

    });

  }, [orders, search, statusFilter, dateFilter]);


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
                  <Input
                    id="searchBar"
                    type="text"
                    placeholder="Buscar por usuario o ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="statusSelect" className="font-bold">ESTADO</FieldLabel>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger id="statusSelect">
                      <SelectValue placeholder="Elegir estado" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="delivered">Entregada</SelectItem>
                        <SelectItem value="returned">Devuelta</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="dateFilter" className="font-bold">FECHA</FieldLabel>
                  <Select
                    value={dateFilter}
                    onValueChange={setDateFilter}
                  >
                    <SelectTrigger id="dateFilter">
                      <SelectValue placeholder="Elegir período de tiempo" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Todos los tiempos</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mes</SelectItem>
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

          {filteredOrders.map((order, index) => {

            const statusInfo = getOrderStatus(order.status);
            const orderDate = order.createdAt.slice(0, 10)

            return (
              <Card className="shadow flex flex-col h-full" key={index}>
                <CardContent className="flex flex-1 flex-col h-fulls">
                  <div>

                    <div className='header mb-6'>
                      <div className='grid grid-cols-2'>
                        <div className='flex flex-row items-center gap-4'>
                          <img src="https://media.istockphoto.com/id/1142192548/es/vector/perfil-de-avatar-hombre-silueta-de-cara-masculina-o-icono-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=O6KtgzjlrIvoGi2Cb1ZyppWKlqGL_5IXVHLUdLN33Ag=" alt="" className='h-9 w-9' />
                          <div className='flex flex-col'>
                            <p className='font-semibold'>{order.customerId.name} {order.customerId.last_name}</p>
                            <p>Órden #{index}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <p className={`text-end ${statusInfo.color} font-bold`}>{statusInfo.text}</p>
                        </div>
                      </div>
                    </div>

                    <div className='body mb-3'>
                      <div className='flex flex-col gap-2'>

                        {order.shopping_cart_id.products.map((product, index) => {

                          return (
                            <div className='grid grid-cols-2' key={index}>
                              <div className='flex flex-row items-center gap-2'>
                                <img src={product.productId.images[0].path} alt="" className='w-5 h-5' />
                                <p>{product.productId.name}</p>
                              </div>
                              <div className='flex items-center justify-end'>
                                <p className='font-bold'> {product.quantity} x ${product.productId.price.toFixed(2)}</p>
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
                        <p className='text-lg font-bold'>
                          Total: ${order.shopping_cart_id.total.toFixed(2)}
                        </p>
                      </div>
                      <div className='flex items-center justify-end'>
                        <p className='text-gray-400'>{orderDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                      <Button className="w-full font-bold">
                        <Eye />
                        Ver opciones
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="w-auto">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <ArrowLeftRight />
                          Cambiar estado
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => {
                                onEdit("returned", order, order._id)
                              }}
                            >
                              Cancelada
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                onEdit("pending", order, order._id)
                              }}
                            >
                              Pendiente
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                onEdit("delivered", order, order._id)
                              }}
                            >
                              Entregada
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>



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