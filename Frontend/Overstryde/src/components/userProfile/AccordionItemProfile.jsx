import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Badge } from '../ui/badge'

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat('es-SV', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(value) || 0)

const formatDate = (date) => {
    if (!date) return 'Sin fecha'

    return new Intl.DateTimeFormat('es-SV', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

const STATUS_LABELS = {
    pending: 'Pendiente',
    delivered: 'Entregado',
    returned: 'Devuelto',
}

const PAYMENT_STATUS_LABELS = {
    pending: 'Pago pendiente',
    paid: 'Pagado',
    failed: 'Pago fallido',
}

export const AccordionItemUser = ({ order, value }) => {
    const cart = order?.shopping_cart_id
    const products = cart?.products || []
    const total = cart?.total || products.reduce((sum, item) => sum + (Number(item.subTotal) || 0), 0)
    const itemCount = products.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    const orderNumber = order?._id?.slice(-6)?.toUpperCase() || '000000'

    return (
        <AccordionItem value={value} className="rounded-lg border bg-white px-4 shadow-sm not-last:border">
            <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-950">Compra #{orderNumber}</p>
                        <p className="text-xs text-gray-500">{formatDate(order?.createdAt)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pr-3">
                        <Badge variant="secondary">{STATUS_LABELS[order?.status] || order?.status || 'Pendiente'}</Badge>
                        <span className="text-sm font-semibold text-gray-950">{formatCurrency(total)}</span>
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pb-4">
                <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">Entrega</p>
                        <p>{order?.delivery_address?.address || order?.delivered_address || 'Sin direccion registrada'}</p>
                        {order?.delivery_address?.city && (
                            <p>{order.delivery_address.city}, {order.delivery_address.department}</p>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">Pago</p>
                        <p>{order?.payment_method || 'Metodo no registrado'}</p>
                        <p>{PAYMENT_STATUS_LABELS[order?.payment_status] || order?.payment_status || 'Pago pendiente'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">Productos</p>
                        <p>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">Total</p>
                        <p className="font-semibold text-gray-950">{formatCurrency(total)}</p>
                    </div>
                </div>

                {products.length > 0 && (
                    <Accordion type="single" collapsible className="rounded-lg border bg-gray-50 px-3">
                        <AccordionItem value={`details-${value}`} className="border-none">
                            <AccordionTrigger className="text-sm font-semibold text-amber-700 hover:no-underline">
                                Ver productos
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3">
                                {products.map((item) => {
                                    const product = item.productId
                                    const image = product?.images?.[0]?.path

                                    return (
                                        <div key={item.variantId || product?._id} className="grid grid-cols-[56px_1fr_auto] gap-3 rounded-lg bg-white p-2">
                                            <img
                                                src={image}
                                                alt={product?.name || 'Producto'}
                                                className="size-14 rounded-md bg-gray-100 object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-950">{product?.name || 'Producto'}</p>
                                                <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                                                {(item.option || item.color) && (
                                                    <p className="text-xs text-gray-500">
                                                        {[item.option && `Talla ${item.option}`, item.color && `Color ${item.color}`].filter(Boolean).join(' | ')}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-sm font-semibold text-gray-950">{formatCurrency(item.subTotal)}</p>
                                        </div>
                                    )
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}
