import React from "react"
import { Mail, MapPin, Pencil, ShoppingBag, Trash2, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card2"
import { StatusBadges } from "@/components/ui/StatusBadges"
import { UserAvatar } from "@/components/ui/UserAvatar"

export const CustomerCard = ({ customer, onEdit, onToggleActive, onDelete }) => {
  const primaryAddress = customer.addresses?.[0]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <UserAvatar user={customer} />
          <div className="min-w-0">
            <CardTitle className="truncate">{customer.name} {customer.last_name}</CardTitle>
            <CardDescription className="flex items-center gap-1 truncate">
              <Mail className="size-4" />
              {customer.email}
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <ShoppingBag className="size-5 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatusBadges user={customer} />
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" />
            {primaryAddress ? `${primaryAddress.city}, ${primaryAddress.department}` : "Sin direccion registrada"}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground">Ordenes</p>
              <p className="font-semibold">{customer.purchase_history?.length || 0}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Telefono</p>
              <p className="font-semibold">{primaryAddress?.phone || "N/A"}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button size="icon" variant="ghost" onClick={() => onEdit(customer)}>
          <Pencil className="size-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => onToggleActive(customer)}>
          {customer.isActive ? <UserX className="size-4" /> : <UserCheck className="size-4" />}
        </Button>
        <Button size="icon" variant="ghost" onClick={() => onDelete(customer._id)}>
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  )
}
