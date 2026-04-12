import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"

export function BannerHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      
      <Input
        placeholder="Buscar banners..."
        className="max-w-sm"
      />

      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="size-4 mr-1" />
          Filtrar
        </Button>

        <Button>
          <Plus className="size-4 mr-1" />
          Nuevo banner
        </Button>
      </div>
    </div>
  )
}