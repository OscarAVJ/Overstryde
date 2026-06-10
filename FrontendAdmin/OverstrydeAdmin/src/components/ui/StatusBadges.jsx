import React from "react"
import { Badge } from "@/components/ui/badge"

export const StatusBadges = ({ user }) => (
  <div className="flex flex-wrap gap-2">
    <Badge variant={user.isActive ? "default" : "destructive"}>
      {user.isActive ? "Activo" : "Inactivo"}
    </Badge>
    <Badge variant={user.isVerified ? "secondary" : "outline"}>
      {user.isVerified ? "Verificado" : "Pendiente"}
    </Badge>
  </div>
)
