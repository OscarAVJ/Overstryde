import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash2 } from "lucide-react"

export function BannerCard({ banner, onEdit, onDelete }) {

  const [active, setActive] = useState(banner.active)

  return (
    <Card className="flex items-center gap-4 p-4 hover:shadow-md transition">

      <div className="relative w-40 h-28 shrink-0">
        
        <img
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />

        <div className="absolute inset-0 bg-black/5 rounded-md"></div>
      </div>

      <CardContent className="flex-1 space-y-2 p-0">
        
        <h3 className="text-lg font-semibold">
          {banner.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {banner.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {banner.tags?.length > 0 ? (
            banner.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
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

      <div className="flex flex-col items-center gap-2 min-w-[80px]">
        
        <Badge variant={active ? "secondary" : "outline"}>
          {active ? "Activo" : "Inactivo"}
        </Badge>

        <Switch
          checked={active}
          onCheckedChange={setActive}
        />
      </div>

      <Separator orientation="vertical" className="h-16" />

      <div className="flex flex-col gap-2 pr-2">
        
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

    </Card>
  )
}