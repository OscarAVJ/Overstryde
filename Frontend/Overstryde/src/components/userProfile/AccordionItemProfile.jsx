import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { ShoppingCartProduct } from '../shoppingCart/ShoppingCartProduct'

export const AccordionItemUser = ({ value, details }) => {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger>Compra 00001</AccordionTrigger>

            <AccordionContent className="pt-2">
                <p>
                    Dirección: Casa de Laura
                </p>
                <p>
                    Cantidad de productos: 15
                </p>
                <p>
                    SubTotal: $500
                </p>        
                <p>
                    Decuentos: $100
                </p>               
                <p>
                    Total: $400
                </p>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full px-3"
                >
                    <AccordionItem value={details}>
                        <AccordionTrigger className="text-yellow-500">
                            Ver más detalle
                        </AccordionTrigger>

                        <AccordionContent className="pt-2">
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <ShoppingCartProduct key={i} isShoppingCart={false} />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </AccordionContent>
        </AccordionItem>
    );
};