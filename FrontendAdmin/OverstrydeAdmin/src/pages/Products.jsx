import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, Search, Pencil, Trash2 } from 'lucide-react'
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
    {
      name: "Mancuernas 10kg",
      sku: "DUM004",
      category: "Accesorios > Mancuernas",
      price: 49.99,
      stock: 0,
    },
    {
      name: "Guantes",
      sku: "DUM003",
      category: "Accesorios > Guantes",
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
    <div className='space-y-6 min-h-screen p-6 rounded-lg'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1.5 font-inter justify-center sm:justify-start'>
          <p className='leading-none text-2xl font-bold text-center sm:text-left'>Gestionar productos</p>
          <p className='text-muted-foreground text-center sm:text-left'>Administra los productos y categorías de la tienda</p>
        </div>
        <div className='flex flex-row gap-1.5 items-center justify-center sm:justify-end'>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="h-12">
                  <Plus />
                  Nuevo producto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Agregar nuevo producto</DialogTitle>
                  <DialogDescription>Complete todos los datos del nuevo producto</DialogDescription>
                </DialogHeader>
                <Separator></Separator>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-2'>
                  <div className='sm:col-span-2'>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="productName">Nombre del producto<span className='text-red-500'>*</span></FieldLabel>
                        <Input id="productName" name="name" placeholder="Introduzca nombre del producto..." />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="productCategory">Categoría</FieldLabel>
                        <Select>
                          <SelectTrigger id="productCategory" defaultValue="">
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
                        <FieldLabel htmlFor="productDesc">Descripción</FieldLabel>
                        <Textarea id="productDesc" placeholder="Descripción del producto..."></Textarea>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="productPrice">Precio</FieldLabel>
                        <Input id="productPrice" type="number"></Input>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="productStock">Stock</FieldLabel>
                        <Input id="productStock" type="number"></Input>
                        <FieldDescription>
                          Usar solo para productos generales o alimenticios; la ropa maneja stock por variantes.
                        </FieldDescription>
                      </Field>
                    </FieldGroup>
                  </div>

                  <div className="flex items-center justify-center h-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                      <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild> 
                    <Button variant='outline'>Cancelar</Button>
                  </DialogClose>
                  <Button>Guardar</Button>
                </DialogFooter>

              </DialogContent>
            </form>
          </Dialog>

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

      <div className="p-6 bg-white rounded-2xl shadow border-1">
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
            <TableFooter className="h-14">
              <TableRow>
                <TableCell colSpan={3} className="text-gray-500">
                  Mostrando 1 - 3 productos de 24
                </TableCell>
                <TableCell colSpan={3}>
                  <div className='flex justify-end gap-1'>
                    <Button className="bg-white shadow">Anterior</Button>
                    <Button className="bg-white shadow">1</Button>
                    <Button className="bg-white shadow">2</Button>
                    <Button className="bg-white shadow">Siguiente</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

      </div>
    </div>
  )
}

export default Products
