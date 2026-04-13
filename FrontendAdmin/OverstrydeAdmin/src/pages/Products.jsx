import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, Search, Pencil, Trash2 } from 'lucide-react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card2"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator"

const Products = () => {

  const products = [
    {
      name: "Camiseta Deportiva",
      sku: "TSH001",
      category: "Hombres > Camisas",
      price: 25.99,
      stock: 45,
    },
    {
      name: "Leggings de Yoga",
      sku: "LEG002",
      category: "Mujeres > Leggings",
      price: 39.99,
      stock: 8,
    },
    {
      name: "Mancuernas 5kg",
      sku: "DUM003",
      category: "Accesorios > Mancuernas",
      price: 49.99,
      stock: 0,
    },
  ];

  function getStatus(stock) {
    if (stock === 0) return { label: "Sin stock", variant: "destructive" };
    if (stock < 10) return { label: "Poco stock", variant: "secondary" };
    return { label: "En stock", variant: "default" };
  }



  return (
    <div className=' bg-gray-100 space-y-6 min-h-screen p-6 rounded-lg'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1.5 font-inter justify-center sm:justify-start'>
          <p className='leading-none text-2xl font-bold text-center sm:text-left'>Gestionar productos</p>
          <p className='text-muted-foreground text-center sm:text-left'>Administra los productos y categorías de la tienda</p>
        </div>
        <div className='flex flex-row gap-1.5 items-center justify-center sm:justify-end'>
          <Button className="h-12">
            <Plus />
            Nuevo producto
          </Button>
          <Button className="h-12 bg-mist-800 text-white !categoriesBtn">
            <FolderOpen />
            Ver categorías
          </Button>
        </div>
      </div>
      <Separator></Separator>
      <div>
        <Card>
          <CardContent>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 items-end'>
              <Field>
                <FieldLabel htmlFor="searchBar" className="font-bold">BUSCAR PRODUCTO</FieldLabel>
                <Input id="searchBar" type="text" placeholder="Buscar..." />
              </Field>
              <Field>
                <FieldLabel htmlFor="categorySelect" className="font-bold">CATEGORÍA</FieldLabel>
                <Select>
                  <SelectTrigger id="categorySelect" defaultValue="">
                    <SelectValue placeholder="Elegir categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Categoría 1</SelectItem>
                      <SelectItem value="2">Categoría 2</SelectItem>
                      <SelectItem value="3">Categoría 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="stateSelect" className="font-bold">ESTADO</FieldLabel>
                <Select>
                  <SelectTrigger id="stateSelect" defaultValue="">
                    <SelectValue placeholder="Elegir estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Estado 1</SelectItem>
                      <SelectItem value="2">Estado 2</SelectItem>
                      <SelectItem value="3">Estado 3</SelectItem>
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

      <div className="p-6 bg-white rounded-2xl shadow">
        <div className='w-full overflow-x-auto scrollbar-thin'>
          <Table className="min-w-[850px]">
            <TableHeader >
              <TableRow >
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product, index) => {
                const status = getStatus(product.stock);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className='flex flex-row gap-4 items-center'>
                        <div>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAJV9_rVLHwEzDUX9qb_rtro45QEioa1w25or8foB71YkaPZx5DpoExwBMt1ps_xho7puazbZEvR2Doa6JKlpkBTM&s&ec=121630504" alt="" className='h-13 w-13' />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>

                    </TableCell>

                    <TableCell>{product.category}</TableCell>

                    <TableCell>${product.price.toFixed(2)}</TableCell>

                    <TableCell>{product.stock} unidades</TableCell>

                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button size="icon" variant="ghost">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  )
}

export default Products