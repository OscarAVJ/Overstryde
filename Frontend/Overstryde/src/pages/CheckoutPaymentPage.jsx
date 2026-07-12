import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import useCart from "@/hooks/useCart"
import useOrder from "@/hooks/useOrder"
import { useAuth } from "@/hooks/useAuth"
import { ArrowLeft, BadgeCheck, CreditCard, LockKeyhole, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useMemo, useState } from "react"

const COUNTRY_VALUES = {
    "El Salvador": "SV",
    Mexico: "MX",
    Nicaragua: "NI",
}

const COUNTRY_LABELS = {
    SV: "El Salvador",
    MX: "Mexico",
    NI: "Nicaragua",
}

const EMPTY_SHIPPING_ADDRESS = {
    country: "SV",
    firstName: "",
    lastName: "",
    address: "",
    department: "",
    city: "",
    reference: "",
    phoneNumber: "",
}

const getAddressFormState = (address = {}, user = {}) => ({
    country: COUNTRY_VALUES[address.country] || address.country || "SV",
    firstName: user?.name || "",
    lastName: user?.last_name || "",
    address: address.address || "",
    department: address.department || "",
    city: address.city || "",
    reference: address.references || "",
    phoneNumber: address.phone || "",
})

const CheckoutItem = ({ item, formatCurrency }) => {
    const product = item.productId
    const image = product?.images?.[0]?.path

    return (
        <div className="grid grid-cols-[72px_1fr_auto] gap-3">
            <div className="relative">
                <img
                    src={image}
                    alt={product?.name || "Producto"}
                    className="h-18 w-18 rounded-lg bg-gray-100 object-cover"
                />
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-black px-1.5 text-xs font-semibold text-white">
                    {item.quantity}
                </span>
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-950">{product?.name}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                    {item.option && <span>Talla: {item.option}</span>}
                    {item.color && (
                        <span className="inline-flex items-center gap-1.5">
                            Color: {item.color}
                            {item.hexColor && (
                                <span
                                    className="h-3 w-3 rounded-full border border-black/20"
                                    style={{ backgroundColor: item.hexColor }}
                                />
                            )}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    {formatCurrency(product?.price)} x {item.quantity}
                </p>
            </div>
            <p className="text-sm font-semibold text-gray-950">{formatCurrency(item.subTotal)}</p>
        </div>
    )
}

const OrderSummarySkeleton = () => (
    <aside className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-44" />
            </div>
            <Skeleton className="h-7 w-24 rounded-full" />
        </div>

        <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid grid-cols-[72px_1fr_auto] gap-3">
                    <Skeleton className="h-18 w-18 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-40 max-w-full" />
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-14" />
                </div>
            ))}
        </div>

        <Skeleton className="my-4 h-px w-full" />

        <div className="space-y-3">
            <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
            </div>
        </div>

        <Skeleton className="mt-4 h-9 w-full rounded-lg" />
    </aside>
)

const CustomerStatusSkeleton = () => (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-56 max-w-full" />
                <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
        </div>
    </div>
)

const OrderSummary = ({
    cart,
    isLoading,
    compact = false,
    formatCurrency,
    getItemKey,
    itemCount,
    subtotal,
    shipping,
    total,
}) => {
    const products = cart?.products || []

    if (isLoading) {
        return <OrderSummarySkeleton />
    }

    if (!products.length) {
        return (
            <div className="rounded-lg border bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-950">Resumen de orden</h2>
                <p className="mt-2 text-sm text-gray-500">Tu carrito esta vacio.</p>
                <Button asChild className="mt-4 w-full bg-black text-white hover:bg-black/90">
                    <NavLink to="/products">Explorar productos</NavLink>
                </Button>
            </div>
        )
    }

    return (
        <aside className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Tu compra</p>
                    <h2 className="text-xl font-bold text-gray-950">Resumen de orden</h2>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {itemCount} {itemCount === 1 ? "producto" : "productos"}
                </span>
            </div>

            <div className={`${compact ? "max-h-80" : "max-h-[420px]"} mt-3 divide-y overflow-auto pr-1`}>
                {products.map((item) => (
                    <CheckoutItem key={getItemKey(item)} item={item} formatCurrency={formatCurrency} />
                ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Envio</span>
                    <span>{shipping === 0 ? "Gratis" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold text-gray-950">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <Truck className="size-4" />
                <span>Envio gratis disponible para esta orden.</span>
            </div>
        </aside>
    )
}

const SecureBadge = ({ icon, text }) => (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-500">
        {icon}
        <span>{text}</span>
    </div>
)

export const CheckoutPaymentPage = () => {
    const { cart, isLoading, clearCart } = useCart()
    const { user, isLoading: isAuthLoading, refreshUser } = useAuth()
    const {
        order,
        error,
        isCreating,
        createOrderFromCheckout,
        formatCurrency,
        getItemKey,
        itemCount,
        subtotal,
        shipping,
        total,
    } = useOrder(cart, user)
    const hasProducts = Boolean(cart?.products?.length)
    const isLoggedIn = Boolean(user?._id)
    const savedAddresses = useMemo(() => user?.addresses || [], [user?.addresses])
    const fullName = [user?.name, user?.last_name].filter(Boolean).join(" ")
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [newShippingAddress, setNewShippingAddress] = useState(EMPTY_SHIPPING_ADDRESS)
    const [saveAddress, setSaveAddress] = useState(true)
    const activeAddressId = selectedAddressId || savedAddresses[0]?._id || "new"
    const activeSavedAddress = savedAddresses.find((address) => address._id === activeAddressId)
    const shippingAddress = activeSavedAddress
        ? getAddressFormState(activeSavedAddress, user)
        : {
            ...newShippingAddress,
            firstName: newShippingAddress.firstName || user?.name || "",
            lastName: newShippingAddress.lastName || user?.last_name || "",
        }

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId)

        if (addressId === "new") {
            setNewShippingAddress({
                ...EMPTY_SHIPPING_ADDRESS,
                firstName: user?.name || "",
                lastName: user?.last_name || "",
            })
            setSaveAddress(Boolean(user?._id))
            return
        }

        setSaveAddress(false)
    }

    const handleShippingAddressChange = (event) => {
        const { name, value } = event.target
        if (activeSavedAddress) {
            setSelectedAddressId("new")
            setSaveAddress(Boolean(user?._id))
            setNewShippingAddress({ ...shippingAddress, [name]: value })
            return
        }

        setNewShippingAddress((current) => ({ ...current, [name]: value }))
    }

    const handleCountryChange = (country) => {
        if (activeSavedAddress) {
            setSelectedAddressId("new")
            setSaveAddress(Boolean(user?._id))
            setNewShippingAddress({ ...shippingAddress, country })
            return
        }

        setNewShippingAddress((current) => ({ ...current, country }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!isLoggedIn) return
        const formData = new FormData(event.currentTarget)
        formData.set("country", COUNTRY_LABELS[shippingAddress.country] || shippingAddress.country)
        try {
            await createOrderFromCheckout(formData, {
                saveAddress: activeAddressId === "new" && saveAddress,
            })
            if (activeAddressId === "new" && saveAddress) {
                await refreshUser()
            }
            clearCart()
        } catch (submitError) {
            console.error(submitError)
        }
    }

    const summaryProps = {
        cart,
        isLoading,
        formatCurrency,
        getItemKey,
        itemCount,
        subtotal,
        shipping,
        total,
    }

    return (
        <main className="min-h-screen bg-gray-50 pt-16">
            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                <section className="space-y-5">
                    <div className="rounded-lg border bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Checkout</p>
                                <h1 className="text-2xl font-bold text-gray-950">Finalizar compra</h1>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <SecureBadge icon={<ShieldCheck className="size-4 text-emerald-600" />} text="Pago seguro" />
                                <SecureBadge icon={<LockKeyhole className="size-4 text-emerald-600" />} text="Datos protegidos" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <Accordion type="single" collapsible defaultValue="resumen" className="rounded-lg border bg-white px-4 shadow-sm">
                            <AccordionItem value="resumen" className="border-none">
                                <AccordionTrigger className="py-4 text-base font-bold">Resumen de orden</AccordionTrigger>
                                <AccordionContent>
                                    <OrderSummary {...summaryProps} compact />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit} key={user?._id || "guest-checkout"}>
                        {isAuthLoading && <CustomerStatusSkeleton />}

                        {!isAuthLoading && isLoggedIn && (
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Sesion activa</p>
                                        <h2 className="text-base font-bold text-gray-950">
                                            Comprando como {fullName || user.email}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Usamos tu perfil para completar los datos disponibles.
                                        </p>
                                    </div>
                                    <Button asChild variant="outline">
                                        <NavLink to="/profile">Ver perfil</NavLink>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!isAuthLoading && !isLoggedIn && (
                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-base font-bold text-gray-950">Inicia sesion para comprar</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Necesitas una cuenta activa para confirmar tu orden.
                                        </p>
                                    </div>
                                    <Button asChild className="bg-black text-white hover:bg-black/90">
                                        <NavLink to="/login">Iniciar sesion</NavLink>
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="rounded-lg border bg-white p-5 shadow-sm">
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Contacto</FieldLegend>
                                    <FieldDescription>
                                        Te enviaremos la confirmacion y actualizaciones de tu orden.
                                    </FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="gymshark@gmail.com"
                                                type="email"
                                                defaultValue={user?.email || ""}
                                                required
                                            />
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </div>

                        <div className="rounded-lg border bg-white p-5 shadow-sm">
                            <FieldGroup>
                                <FieldSet>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <FieldLegend>Direccion de envio</FieldLegend>
                                            <FieldDescription>
                                                Selecciona una direccion guardada o escribe una nueva.
                                            </FieldDescription>
                                        </div>
                                        <MapPin className="size-5 text-gray-400" />
                                    </div>
                                    <FieldGroup>
                                        {savedAddresses.length > 0 && (
                                            <Field>
                                                <FieldLabel>Direccion guardada</FieldLabel>
                                                <Select value={activeAddressId} onValueChange={handleAddressSelect}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona una direccion" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {savedAddresses.map((address, index) => (
                                                                <SelectItem key={address._id} value={address._id}>
                                                                    {`Direccion ${index + 1}: ${address.address}, ${address.city}`}
                                                                </SelectItem>
                                                            ))}
                                                            <SelectItem value="new">Usar una direccion nueva</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                        <input type="hidden" name="addressId" value={activeAddressId === "new" ? "" : activeAddressId} />
                                        <Field>
                                            <FieldLabel>Pais</FieldLabel>
                                            <Select name="country" value={shippingAddress.country} onValueChange={handleCountryChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="El Salvador" />
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

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <Field>
                                                <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Oscar"
                                                    value={shippingAddress.firstName}
                                                    onChange={handleShippingAddressChange}
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Martinez"
                                                    value={shippingAddress.lastName}
                                                    onChange={handleShippingAddressChange}
                                                    required
                                                />
                                            </Field>
                                        </div>

                                        <Field>
                                            <FieldLabel htmlFor="address">Direccion</FieldLabel>
                                            <Input
                                                id="address"
                                                name="address"
                                                placeholder="Direccion"
                                                value={shippingAddress.address}
                                                onChange={handleShippingAddressChange}
                                                required
                                            />
                                        </Field>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <Field>
                                                <FieldLabel htmlFor="department">Departamento</FieldLabel>
                                                <Input
                                                    id="department"
                                                    name="department"
                                                    placeholder="Departamento"
                                                    value={shippingAddress.department}
                                                    onChange={handleShippingAddressChange}
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="city">Ciudad</FieldLabel>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    placeholder="Ciudad"
                                                    value={shippingAddress.city}
                                                    onChange={handleShippingAddressChange}
                                                    required
                                                />
                                            </Field>
                                        </div>

                                        <Field>
                                            <FieldLabel htmlFor="reference">Referencia</FieldLabel>
                                            <Input
                                                id="reference"
                                                name="reference"
                                                placeholder="Punto de referencia"
                                                value={shippingAddress.reference}
                                                onChange={handleShippingAddressChange}
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="phoneNumber">Numero de telefono</FieldLabel>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder="7123-4567"
                                                value={shippingAddress.phoneNumber}
                                                onChange={handleShippingAddressChange}
                                                required
                                            />
                                        </Field>
                                        {activeAddressId === "new" && isLoggedIn && (
                                            <label className="flex items-start gap-3 rounded-lg border bg-gray-50 p-3 text-sm text-gray-700">
                                                <Checkbox checked={saveAddress} onCheckedChange={(checked) => setSaveAddress(Boolean(checked))} />
                                                <span>Guardar esta direccion en mi perfil para proximas compras.</span>
                                            </label>
                                        )}
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </div>

                        <div className="rounded-lg border bg-white p-5 shadow-sm">
                            <FieldGroup>
                                <FieldSet>
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <FieldLegend>Metodo de pago</FieldLegend>
                                            <FieldDescription>
                                                Todas las transacciones son seguras y estan encriptadas.
                                            </FieldDescription>
                                        </div>
                                        <CreditCard className="size-5 text-gray-400" />
                                    </div>

                                    <div className="mt-4 rounded-lg border bg-gray-50 p-3">
                                        <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
                                            <span className="grid size-4 place-items-center rounded-full border border-black">
                                                <span className="size-2 rounded-full bg-black" />
                                            </span>
                                            <CreditCard className="size-4" />
                                            <span>Tarjeta de credito o debito</span>
                                        </div>
                                    </div>

                                    <FieldGroup className="mt-4">
                                        <Field>
                                            <FieldLabel htmlFor="nombreTarjeta">Nombre en la tarjeta</FieldLabel>
                                            <Input id="nombreTarjeta" name="cardName" placeholder="Oscar Velasquez" required />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="numberCard">Numero de tarjeta</FieldLabel>
                                            <Input
                                                id="numberCard"
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                inputMode="numeric"
                                                required
                                            />
                                            <FieldDescription>Ingresa tu numero de 16 digitos</FieldDescription>
                                        </Field>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <Field>
                                                <FieldLabel htmlFor="monthYear">Mes</FieldLabel>
                                                <Input id="monthYear" name="expirationDate" placeholder="MM/YY" required />
                                                <FieldDescription>Ingresa la fecha de vencimiento</FieldDescription>
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                                                <Input id="cvv" name="cvv" placeholder="000" inputMode="numeric" required />
                                                <FieldDescription>Ingresa tu CVV</FieldDescription>
                                            </Field>
                                        </div>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </div>

                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <div className="mb-4 grid gap-3 text-xs text-gray-500 sm:grid-cols-3">
                                <SecureBadge icon={<ShieldCheck className="size-4 text-emerald-600" />} text="Pago seguro" />
                                <SecureBadge icon={<BadgeCheck className="size-4 text-emerald-600" />} text="SSL activo" />
                                <SecureBadge icon={<PackageCheck className="size-4 text-emerald-600" />} text="Orden verificada" />
                            </div>
                            <Field orientation="horizontal">
                                <Button
                                    className="h-11 w-full bg-black text-white hover:bg-black/90"
                                    type="submit"
                                    disabled={!hasProducts || isLoading || isCreating || isAuthLoading || !isLoggedIn}
                                >
                                    {isCreating ? "Creando orden..." : "Confirmar compra"}
                                </Button>
                            </Field>
                            {!isAuthLoading && !isLoggedIn && (
                                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                                    Para realizar la compra debes iniciar sesion.
                                </p>
                            )}
                            {error && (
                                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {error.message}
                                </p>
                            )}
                            {order && (
                                <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                    Orden creada correctamente.
                                </p>
                            )}
                            <Button asChild variant="outline" className="mt-3 h-10 w-full">
                                <NavLink to="/products">
                                    <ArrowLeft className="size-4" />
                                    Continuar comprando
                                </NavLink>
                            </Button>
                        </div>
                    </form>
                </section>

                <div className="hidden lg:block">
                    <div className="sticky top-20 space-y-4">
                        <OrderSummary {...summaryProps} />
                    </div>
                </div>
            </div>
        </main>
    )
}
