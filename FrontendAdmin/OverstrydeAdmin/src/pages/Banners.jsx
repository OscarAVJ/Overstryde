import * as React from "react"
import { BannerHeader } from "@/components/ui/BannerHeader"
import { BannerList } from "@/components/ui/BannerList"

const Banners = () => {
  return (
    <div className="p-6 space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold">Banners</h1>
        <p className="text-muted-foreground text-sm">
          Gestiona los banners
        </p>
      </div>

      <BannerHeader />

      <BannerList />

    </div>
  )
}

export default Banners