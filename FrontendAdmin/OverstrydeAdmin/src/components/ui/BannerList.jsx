import * as React from "react"
import { BannerCard } from "./BannerCard"
import { banners } from "@/data/bannersData.js"

export function BannerList() {
  return (
    <div className="space-y-4 mt-4">
      {banners.map((banner) => (
        <BannerCard
          key={banner.id}
          banner={banner}
        />
      ))}
    </div>
  )
}