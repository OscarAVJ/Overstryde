import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { GenderSeparator } from "@/components/GenderSeparator"

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    title: "DOMINA CADA KILÓMETRO",
    description:
      "Rendimiento sin compromisos para el atleta moderno. Descubre la tecnología Overstryde.",
    buttonText: "VER COLECCIÓN",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    title: "FUERZA EN CADA MOVIMIENTO",
    description:
      "Diseñado para entrenar duro, moverte libre y verte sólido.",
    buttonText: "COMPRAR AHORA",
  },
]

export const HomePage = () => {
  return (
    <section className="bg-gray-100 w-full px-4 md:px-6 py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-105 md:h-130 w-full overflow-hidden rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-xl px-6 md:px-12 text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold uppercase">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-base text-white/90 ">
                      {slide.description}
                    </p>
                    <Button size="lg" >Ver más</Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-6" />
      </Carousel>
      <div className="flex flex-col md:flex-row pt-3 gap-2">
          <GenderSeparator />
          <GenderSeparator />
      </div>
    </section>
  )
}