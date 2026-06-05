import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen, Search, Pencil, Trash2, PlusIcon, Dot, X, ChevronDownIcon } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import useProducts from '@/hooks/useProducts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from "date-fns"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { es } from 'date-fns/locale'


const Products = () => {

  //HOOK PERSONALIZADO DE PRODUCTOS
  const { products } = useProducts();

  //DIALOG PARA ESCOGER SUBCATEGORIAS
  const [openCategories, setOpenCategories] = useState(false)

  //ARRAY PARA EL MOMENTO DE INSERTAR UN PRODUCTO (categorías escogidas)
  const [selectedCategories, setSelectedCategories] = useState([])

  //DIALOG DE EDITAR O AÑADIR VARIANTE DE ROPA
  const [openVariantEdit, setOpenVariantEdit] = useState(false)

  //FECHA VENCIMIENTO ALIMENTOS
  const [dueDate, setDueDate] = useState(new Date());

  const selected = [
    {
      category: "Hombres",
      sub: "Camisa"
    },
    {
      category: "Mujeres",
      sub: "Blusas"
    }
  ]

  const categories = [
    {
      name: "Hombres",
      subcategories: [
        "Camisas",
        "Camisetas",
        "Pants"
      ]
    },
    {
      name: "Mujeres",
      subcategories: [
        "Blusas",
        "Pantalones",
        "Vinchas"
      ]
    }
  ]


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
                <DialogHeader className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
                  <div>
                    <DialogTitle className="text-2xl font-bold">Agregar nuevo producto</DialogTitle>
                    <DialogDescription>Complete todos los datos del nuevo producto</DialogDescription>
                  </div>
                </DialogHeader>
                <Separator></Separator>
                <Tabs>
                  <TabsList>
                    <TabsTrigger value="general">Producto general</TabsTrigger>
                    <TabsTrigger value="food">Producto alimenticio</TabsTrigger>
                    <TabsTrigger value="clothes">Ropa</TabsTrigger>
                  </TabsList>

                  {/*TAB DE PRODUCTO GENERAL */}
                  <TabsContent value="general">
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-2'>
                      <div className='sm:col-span-2'>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="productName">Nombre del producto<span className='text-red-500'>*</span></FieldLabel>
                            <Input id="productName" name="name" placeholder="Introduzca nombre del producto..." />
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <FieldLabel>Categorías</FieldLabel>
                            <Button className="bg-gray-300 text-black h-6 text-sm" onClick={() => setOpenCategories(true)}><PlusIcon className='h-4 w-4' />Añadir</Button>
                            <CommandDialog open={openCategories} onOpenChange={setOpenCategories}>
                              <Command>
                                <CommandInput placeholder="Buscar categoría por nombre." />
                                <CommandList>
                                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                  {categories.map((category, index) => (
                                    <CommandGroup heading={category.name} key={index}>
                                      {category.subcategories.map((sub, index) => (
                                        <CommandItem key={index}>{sub}</CommandItem>
                                      ))}
                                    </CommandGroup>
                                  ))}
                                </CommandList>
                              </Command>
                            </CommandDialog>
                          </div>
                          <div className='flex flex-col p-1 gap-1 rounded-md'>
                            {selected.map((sel, index) => (
                              <Item variant='outline' size='sm' key={index}>
                                <ItemMedia>
                                  <Dot />
                                </ItemMedia>
                                <ItemContent className="flex justify-center items-start">
                                  <ItemTitle >{sel.category + " > " + sel.sub}</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                  <button>
                                    <X className="size-4 cursor-pointer" />
                                  </button>
                                </ItemActions>
                              </Item>
                            ))}
                          </div>
                          <Field>
                            <FieldLabel htmlFor="productDesc">Descripción</FieldLabel>
                            <Textarea id="productDesc" placeholder="Descripción del producto..."></Textarea>
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <Field>
                              <FieldLabel htmlFor="productPrice">Precio</FieldLabel>
                              <Input id="productPrice" type="number" placeholder="$0.00"></Input>
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="productStock">Stock</FieldLabel>
                              <Input id="productStock" type="number" placeholder="0"></Input>
                            </Field>
                          </div>
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
                  </TabsContent>

                  {/* TAB DE PRODUCTOS DE ROPA */}
                  <TabsContent value="clothes">
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-2'>
                      <div className='sm:col-span-2'>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="productName">Nombre del producto<span className='text-red-500'>*</span></FieldLabel>
                            <Input id="productName" name="name" placeholder="Introduzca nombre del producto..." />
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <FieldLabel>Categorías</FieldLabel>
                            <Button className="bg-gray-300 text-black h-6 text-sm" onClick={() => setOpenCategories(true)}><PlusIcon className='h-4 w-4' />Añadir</Button>
                            <CommandDialog open={openCategories} onOpenChange={setOpenCategories}>
                              <Command>
                                <CommandInput placeholder="Buscar categoría por nombre." />
                                <CommandList>
                                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                  {categories.map((category, index) => (
                                    <CommandGroup heading={category.name} key={index}>
                                      {category.subcategories.map((sub, index) => (
                                        <CommandItem key={index}>{sub}</CommandItem>
                                      ))}
                                    </CommandGroup>
                                  ))}
                                </CommandList>
                              </Command>
                            </CommandDialog>
                          </div>
                          <div className='flex flex-col p-1 gap-1 rounded-md'>
                            {selected.map((sel, index) => (
                              <Item variant='outline' size='sm' key={index}>
                                <ItemMedia>
                                  <Dot />
                                </ItemMedia>
                                <ItemContent className="flex justify-center items-start">
                                  <ItemTitle >{sel.category + " > " + sel.sub}</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                  <button>
                                    <X className="size-4 cursor-pointer" />
                                  </button>
                                </ItemActions>
                              </Item>
                            ))}
                          </div>
                          <Field>
                            <FieldLabel htmlFor="productDesc">Descripción</FieldLabel>
                            <Textarea id="productDesc" placeholder="Descripción del producto..."></Textarea>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="productPrice">Precio</FieldLabel>
                            <Input id="productPrice" type="number" placeholder="$0.00"></Input>
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <FieldLabel>Variantes</FieldLabel>
                            <Dialog open={openVariantEdit} onOpenChange={setOpenVariantEdit}>
                              <form>
                                <DialogTrigger asChild>
                                  <Button className="bg-gray-300 text-black h-6 text-sm"><PlusIcon className='h-4 w-4' />Añadir variante</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="hidden">
                                      Variante de producto
                                    </DialogTitle>
                                    <DialogDescription>
                                      Añadir una variante de la prenda.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <FieldGroup>
                                    <div className='flex flex-row gap-2'>
                                      <Field>
                                        <FieldLabel htmlFor="variantColorText">Color</FieldLabel>
                                        <Input id="variantColorText" type="text" placeholder="'Rojo'"></Input>
                                      </Field>
                                      <Field>
                                        <FieldLabel htmlFor="variantColorHex">Definir color</FieldLabel>
                                        <Input id="variantColorHex" type="color" placeholder="0"></Input>
                                      </Field>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                      <Field>
                                        <FieldLabel htmlFor="variantSize">Talla</FieldLabel>
                                        <Input id="variantSize" type="text" placeholder="'M'"></Input>
                                      </Field>
                                      <Field>
                                        <FieldLabel htmlFor="variantStock">Stock</FieldLabel>
                                        <Input id="variantStock" type="number" placeholder="0"></Input>
                                      </Field>
                                    </div>
                                  </FieldGroup>
                                </DialogContent>
                              </form>
                            </Dialog>
                          </div>
                          <ScrollArea className="w-full h-35 rounded-sm border p-3">
                            <div className='flex flex-col gap-4'>
                              <ItemGroup className="gap-1">
                                <Item variant='outline' role="listitem">
                                  <ItemMedia variant='image'>
                                    <div className='h-6 w-6 bg-red-500'></div>
                                  </ItemMedia>
                                  <ItemContent>
                                    <ItemTitle>Color "Rojo"</ItemTitle>
                                    <ItemDescription>Stock: 10 | Talla: L</ItemDescription>
                                  </ItemContent>
                                  <ItemActions>
                                    <button onClick={() => setOpenVariantEdit(true)}>
                                      <Pencil className="size-4 cursor-pointer" />
                                    </button>
                                    <button>
                                      <X className="size-4 cursor-pointer" />
                                    </button>
                                  </ItemActions>
                                </Item>

                                <Item variant='outline' role="listitem">
                                  <ItemMedia variant='image'>
                                    <div className='h-6 w-6 bg-gray-500'></div>
                                  </ItemMedia>
                                  <ItemContent>
                                    <ItemTitle>Color "Gris"</ItemTitle>
                                    <ItemDescription>Stock: 10 | Talla: L</ItemDescription>
                                  </ItemContent>
                                  <ItemActions>
                                    <button onClick={() => setOpenVariantEdit(true)}>
                                      <Pencil className="size-4 cursor-pointer" />
                                    </button>
                                    <button>
                                      <X className="size-4 cursor-pointer" />
                                    </button>
                                  </ItemActions>
                                </Item>

                                <Item variant='outline' role="listitem">
                                  <ItemMedia variant='image'>
                                    <div className='h-6 w-6 bg-black'></div>
                                  </ItemMedia>
                                  <ItemContent>
                                    <ItemTitle>Color "Negro"</ItemTitle>
                                    <ItemDescription>Stock: 10 | Talla: L</ItemDescription>
                                  </ItemContent>
                                  <ItemActions>
                                    <button onClick={() => setOpenVariantEdit(true)}>
                                      <Pencil className="size-4 cursor-pointer" />
                                    </button>
                                    <button>
                                      <X className="size-4 cursor-pointer" />
                                    </button>
                                  </ItemActions>
                                </Item>

                              </ItemGroup>

                            </div>
                          </ScrollArea>
                          <div className='flex flex-row gap-2'>
                            <Field>
                              <FieldLabel htmlFor="productStock">Stock</FieldLabel>
                              <Input id="productStock" type="number" placeholder="0"></Input>
                            </Field>
                          </div>
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
                  </TabsContent>

                  {/*TAB PARA PRODUCTOS ALIMENTICIOS */}
                  <TabsContent value="food">
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-2'>
                      <div className='sm:col-span-2'>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="productName">Nombre del producto<span className='text-red-500'>*</span></FieldLabel>
                            <Input id="productName" name="name" placeholder="Introduzca nombre del producto..." />
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <FieldLabel>Categorías</FieldLabel>
                            <Button className="bg-gray-300 text-black h-6 text-sm" onClick={() => setOpenCategories(true)}><PlusIcon className='h-4 w-4' />Añadir</Button>
                            <CommandDialog open={openCategories} onOpenChange={setOpenCategories}>
                              <Command>
                                <CommandInput placeholder="Buscar categoría por nombre." />
                                <CommandList>
                                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                  {categories.map((category, index) => (
                                    <CommandGroup heading={category.name} key={index}>
                                      {category.subcategories.map((sub, index) => (
                                        <CommandItem key={index}>{sub}</CommandItem>
                                      ))}
                                    </CommandGroup>
                                  ))}
                                </CommandList>
                              </Command>
                            </CommandDialog>
                          </div>
                          <div className='flex flex-col p-1 gap-1 rounded-md'>
                            {selected.map((sel, index) => (
                              <Item variant='outline' size='sm' key={index}>
                                <ItemMedia>
                                  <Dot />
                                </ItemMedia>
                                <ItemContent className="flex justify-center items-start">
                                  <ItemTitle >{sel.category + " > " + sel.sub}</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                  <button>
                                    <X className="size-4 cursor-pointer" />
                                  </button>
                                </ItemActions>
                              </Item>
                            ))}
                          </div>
                          <Field>
                            <FieldLabel htmlFor="productDesc">Descripción</FieldLabel>
                            <Textarea id="productDesc" placeholder="Descripción del producto..."></Textarea>
                          </Field>
                          <div className='flex flex-row gap-2'>
                            <Field>
                              <FieldLabel htmlFor="productPrice">Precio</FieldLabel>
                              <Input id="productPrice" type="number" placeholder="$0.00"></Input>
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="productStock">Stock</FieldLabel>
                              <Input id="productStock" type="number" placeholder="0"></Input>
                            </Field>
                            <Field>
                              <FieldLabel>Fecha vencimiento</FieldLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant='outline'
                                    data-empty={!dueDate}
                                    className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                  >
                                    {dueDate ? format(dueDate, "PPP") : <span>Escoger fecha</span>}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={setDueDate}
                                    locale={es}
                                  />
                                </PopoverContent>
                              </Popover>
                            </Field>
                          </div>
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
                  </TabsContent>

                </Tabs>


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
                const status = getStatus(product.variants[0].stock);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className='flex flex-row gap-4 items-center'>
                        <div>
                          <img src={product.images[0].path} alt="" className='h-13 w-13' />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">
                            Tipo: {product.product_type}
                          </span>
                        </div>
                      </div>

                    </TableCell>

                    <TableCell>{product.categories[0]}</TableCell>

                    <TableCell>${product.price.toFixed(2)}</TableCell>

                    <TableCell>{product.variants[0].stock} unidades</TableCell>

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