import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { GenderSeparator } from "@/components/home/GenderSeparator"
import { ProductCard } from "@/components/products/ProductCard"
import { NavLink } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import useBanners from "@/hooks/useBanners"
import useProducts from "@/hooks/useProducts"

const genders = {
  women: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
  men: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

export const HomePage = () => {
  const { products } = useProducts()
  const { banners, isLoading: isLoadingBanners } = useBanners()
  const menData = products.filter((item) => item.gender === "male")
  const womenData = products.filter((item) => item.gender === "female")
  const accesoriesData = products.filter((item) => item.gender === "accesory")

  return (
    <section className="bg-gray-100 w-full px-4 py-2">
      {isLoadingBanners ? (
        <Skeleton className="w-full mt-5 h-105 md:h-130 rounded-2xl" />
      ) : banners.length > 0 && (
        <Carousel className="w-full mt-5">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner._id}>
                <div className="relative h-105 md:h-130 w-full overflow-hidden rounded-2xl">
                  <img
                    src={banner.image?.path}
                    alt={banner.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-xl px-6 md:px-12 text-white">
                      <h1 className="text-4xl md:text-6xl font-extrabold uppercase">
                        {banner.title}
                      </h1>
                      <p className="text-sm md:text-base text-white/90">
                        {banner.description}
                      </p>
                      {banner.shortcut && (
                        <NavLink
                          to={banner.shortcut.path}
                          className="text-yellow-400 underline font-semibold"
                        >
                          {banner.shortcut.shortcut_title}
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6" />
          <CarouselNext className="right-6" />
        </Carousel>
      )}

      <div className="flex flex-col md:flex-row pt-3 gap-2">
        <GenderSeparator image={genders.men} text={"Para el"} subText={"Ropa masculina"} path={`/products?gender=${encodeURIComponent("male")}`} />
        <GenderSeparator image={genders.women} text={"Para ella"} subText={"Ropa femenina"} path={`/products?gender=${encodeURIComponent("female")}`} />
      </div>

      <div className="mt-2 w-full">
        <h2 className="uppercase text-yellow-500 font-extrabold">Hombres</h2>
        <p className="font-semibold">Ultimos ingresos</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-2">
          {menData.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
        <div className="flex justify-center items-center mt-2">
          <NavLink to={`/products?gender=${encodeURIComponent("male")}`}>
            <Button>Explorar mas</Button>
          </NavLink>
        </div>
      </div>

      <div className="mt-2">
        <h2 className="uppercase text-yellow-500 font-extrabold">Mujeres</h2>
        <p className="font-semibold">Ultimos ingresos</p>
        <div className="grid grid-cols-2 gap-2 md:gap-2 md:grid-cols-5 mt-2">
          {womenData.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
        <div className="flex justify-center items-center mt-2">
          <NavLink to={`/products?gender=${encodeURIComponent("female")}`}>
            <Button>Explorar mas</Button>
          </NavLink>
        </div>
      </div>

      <div className="mt-2">
        <h2 className="uppercase text-yellow-500 font-extrabold">Accesorios</h2>
        <p className="font-semibold">Ultimos ingresos</p>
        <div className="grid grid-cols-2 gap-2 md:gap-2 md:grid-cols-5 mt-2">
          {accesoriesData.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
        <div className="flex justify-center items-center mt-2">
          <NavLink to={`/products?gender=${encodeURIComponent("accesories")}`}>
            <Button>Explorar mas</Button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}
