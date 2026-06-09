import { ShoppingCartProduct } from '@/components/shoppingCart/ShoppingCartProduct'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AccordionItemUser } from '@/components/userProfile/AccordionItemProfile'
import { DirectionsCard } from '@/components/userProfile/DirectionsCard'
import { UserCard } from '@/components/userProfile/UserCard'
import React from 'react'

export const ProfilePage = () => {
  return (
    <div className=' mx-4'>
      <UserCard />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <div className="pt-2">
            <h1 className='text-xl font-semibold'>Direcciones guardadas</h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
            {Array.from({ length: 3 }).map((_, i) => <DirectionsCard key={i} />)}
          </div>
        </div>
        <div>
          <div className="pt-2">
            <h1 className='text-xl font-semibold'>Historial de compra</h1>
          </div>
          <div className=''>
            <Accordion
              type="single"
              collapsible
              className="max-w-lg"
            >
              <AccordionItemUser value={"1"} details={"kl2k"} />
              <AccordionItemUser value={"3"} details={"4"} />
              <AccordionItemUser value={"5"} details={"6"} />
              <AccordionItemUser value={"7"} details={"8"} />
            </Accordion>
          </div>
        </div>
      </div>

    </div>
  )
}
