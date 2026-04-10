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
import { ProductCard } from "@/components/ProductCard"
import { products } from "@/data/productsData.js"
import { NavLink } from "react-router-dom"
const genders = {
  "women": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
  "men": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}
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

  const menData = products.filter((item) => item.category === "Hombres")
  const womenData = products.filter((item) => item.category === "Mujeres")

  return (
    <section className="bg-gray-100 w-full px-4 md:px-6 py-10">
      <Carousel className="w-full mt-5">
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
                    <p className="text-yellow-400 underline" >Ver más</p>
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
        <GenderSeparator image={genders.men} text={"Para el"} subText={"Ropa masculina"} path={"/men"} />
        <GenderSeparator image={genders.women} text={"Para ella"} subText={"Ropa femenina"} path={"/men"} />
      </div>
      <div>
      </div>
      <div className="mt-2 w-full">
        <h2 className="uppercase text-yellow-500 font-extrabold">Hombres</h2>
        <p className="font-semibold">Ultimos ingresos</p>
        <div className="grid grid-cols-2 gap-2  md:grid-cols-4  mt-2">
          {menData.map((item, index) => <ProductCard key={item.id} product={item} />)}
        </div>
        <div className="flex justify-center items-center mt-2">
          <NavLink to={`/products?category=${encodeURIComponent("Hombres")}`}>
            <Button>Explorar más</Button>
          </NavLink>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="uppercase text-yellow-500 font-extrabold">Mujeres</h2>
        <p className="font-semibold">Ultimos ingresos</p>
        <div className="grid grid-cols-2 gap-2 md:gap-2  md:grid-cols-4  mt-2">
          {womenData.map((item, index) => <ProductCard key={item.id} product={item} />)}
        </div>
        <div className="flex justify-center items-center mt-2">
          {/* ///Aca le pasamos los parametros a la ruta, diciendo que queremos los productos en donde la categoria sea = Mujeres y eso esta dentro de la funcion encode.... para que no salga el texto plano */}
          <NavLink to={`/products?category=${encodeURIComponent("Mujeres")}`}>
            <Button>Explorar más</Button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}