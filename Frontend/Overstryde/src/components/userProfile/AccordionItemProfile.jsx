import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { ShoppingCartProduct } from '../shoppingCart/ShoppingCartProduct'

export const AccordionItemUser = ({ value, details }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>Compra 00001</AccordionTrigger>

      <AccordionContent className="pt-2">
        <h1>
          jkjskjskjskjskjskjksjksjksjksjs
          jkjskjskjskjskjskjksjksjksjksjssjksjksj
          skjskjs
        </h1>

        <Accordion
          type="single"
          collapsible
          className="w-full p-3"
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