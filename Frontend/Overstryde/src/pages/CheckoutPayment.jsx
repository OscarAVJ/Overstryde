import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ShoppingCartProduct } from '@/components/shoppingCart/ShoppingCartProduct'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const CheckoutPayment = () => {
    return (
        <div className=' mx-auto pt-15 grid md:grid-cols-2 md:max-w-6xl p-2 md:p-0 gap-3'>
            <div>
                <form className='flex flex-col gap-4'>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Contacto</FieldLegend>
                            <FieldDescription>
                                Todas las transacciones son seguras y están encriptadas
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        placeholder="gymshark@gmail.com"
                                        type={"email"}
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <Separator />
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Dirección de envio</FieldLegend>
                            <FieldDescription>
                                Todas las transacciones son seguras y están encriptadas
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>
                                        País
                                    </FieldLabel>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="SV" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="SV">El Salvador</SelectItem>
                                                <SelectItem value="MX">Mexico</SelectItem>
                                                <SelectItem value="NI">Nicaragua</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <div className="flex gap-2">
                                    <Field>
                                        <FieldLabel htmlFor="fisrtName">
                                            Nombre
                                        </FieldLabel>
                                        <Input
                                            id="fisrtName"
                                            placeholder="Oscar"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="lastName">
                                            Apellido
                                        </FieldLabel>
                                        <Input
                                            id="lastName"
                                            placeholder="Martínez"
                                            required
                                        />
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="address">
                                        Dirección
                                    </FieldLabel>
                                    <Input
                                        id="address"
                                        placeholder="Dirección"
                                        required
                                    />
                                </Field>
                                <div className="flex gap-2">
                                    <Field>
                                        <FieldLabel htmlFor="department">
                                            Departamento
                                        </FieldLabel>
                                        <Input
                                            id="department"
                                            placeholder="Departamento"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="city">
                                            Ciudad
                                        </FieldLabel>
                                        <Input
                                            id="city"
                                            placeholder="Cuidad"
                                            required
                                        />
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="reference">
                                        Referencia
                                    </FieldLabel>
                                    <Input
                                        id="reference"
                                        placeholder="Referencia"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="phoneNumber">
                                        Número de telefono
                                    </FieldLabel>
                                    <Input
                                        id="phoneNumber"
                                        placeholder="7123-4567"
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <Separator />
                    <FieldGroup className={"bg-gray-50 rounded-2xl p-3"}>
                        <FieldSet>
                            <FieldLegend>Método de pago</FieldLegend>
                            <FieldDescription>
                                Todas las transacciones son seguras y están encriptadas
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="nombreTarjeta">
                                        Nombre en la tarjeta
                                    </FieldLabel>
                                    <Input
                                        id="nombreTarjeta"
                                        placeholder="Oscar Velasquez"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="numberCard">
                                        Numero de tarjeta
                                    </FieldLabel>
                                    <Input
                                        id="numberCard"
                                        placeholder="1234 5678 9012 3456"
                                        type={"number"}
                                        required
                                    />
                                    <FieldDescription>
                                        Ingresa tu numero de 16 digitos
                                    </FieldDescription>
                                </Field>
                                <div className='flex gap-2'>
                                    <Field>
                                        <FieldLabel htmlFor="monthYear">
                                            Mes
                                        </FieldLabel>
                                        <Input
                                            id="monthYear"
                                            placeholder="MM/YY"
                                            required
                                        />
                                        <FieldDescription>
                                            Ingresa la fecha de vencimiento
                                        </FieldDescription>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="cvv">
                                            CVV
                                        </FieldLabel>
                                        <Input
                                            id="cvv"
                                            placeholder="000"
                                            type={"number"}
                                            required
                                        />
                                        <FieldDescription>
                                            Ingresa tu CVV
                                        </FieldDescription>
                                    </Field>
                                </div>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <div className='md:hidden'>
                        <div className="flex flex-col pt-2">
                            <div className="flex justify-between">
                                <p>Subtotal - 6 productos:</p>
                                <p>$226</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-lg">Total:</p>
                                <p>$226</p>
                            </div>
                        </div>
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="md:hidden w-full rounded-xl border bg-gray-50 px-2"
                    >
                        <AccordionItem value="ver-detalle" className="border-none">
                            <AccordionTrigger className="pt-3">Ver detalle</AccordionTrigger>
                            <AccordionContent>
                                <div className="pt-3 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <ShoppingCartProduct isShoppingCart={false} />
                                        <ShoppingCartProduct isShoppingCart={false} />
                                        <ShoppingCartProduct isShoppingCart={false} />
                                        <ShoppingCartProduct isShoppingCart={false} />
                                        <ShoppingCartProduct isShoppingCart={false} />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Field orientation="horizontal">
                        <Button className={"w-full"} type="submit">Comprar</Button>
                    </Field>
                </form>
            </div>
            <div>
                <div className="bg-gray-50 rounded-sm p-3 flex-col gap-2 hidden pt-15 md:flex">
                    <div className='h-auto max-h-160 overflow-auto'>
                        <ShoppingCartProduct isShoppingCart={false} />
                        <ShoppingCartProduct isShoppingCart={false} />
                        <ShoppingCartProduct isShoppingCart={false} />
                        <ShoppingCartProduct isShoppingCart={false} />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <p> Subtotal - 6 productos:</p>
                            <p>$226</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-semibold text-lg'> Total:</p>
                            <p>$226</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
