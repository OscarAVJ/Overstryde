import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash2 } from "lucide-react"

export function BannerCard({ banner, onEdit, onDelete }) {

  const [active, setActive] = useState(banner?.active ?? false)

  return (
    <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 hover:shadow-md transition">

      <div className="flex flex-col sm:flex-row gap-4 flex-1">

        <div className="relative w-full sm:w-40 md:w-44 h-40 sm:h-28 shrink-0">
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/5 rounded-md"></div>
        </div>

        <CardContent className="space-y-2 p-0">

          <h3 className="text-base md:text-lg font-semibold">
            {banner.title}
          </h3>

          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {banner.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            {banner.tags?.length > 0 ? (
              banner.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Sin etiquetas
              </span>
            )}
          </div>

        </CardContent>

      </div>

      <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-4 md:gap-6">

        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-100 text-cyan-700 text-xs md:text-sm">
            {active ? "Activo" : "Inactivo"}
          </Badge>

          <Switch
            checked={active}
            onCheckedChange={setActive}
            className="data-[state=checked]:bg-yellow-400"
          />
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block h-12"
        />

        <div className="flex flex-row md:flex-col gap-2 md:gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit?.(banner)}
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete?.(banner.id)}
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>

      </div>

    </Card>
  )
}