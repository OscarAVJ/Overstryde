import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

export const ProductCarouselMovile = ({products}) => {
  return (
      <Carousel className="w-full mt-5">
        <CarouselContent>
          {products.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-105 md:h-130 w-full overflow-hidden rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-6" />
      </Carousel>
  )
}
