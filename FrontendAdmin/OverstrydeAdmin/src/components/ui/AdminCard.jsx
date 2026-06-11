import React from "react"
import { Mail, Pencil, ShieldCheck, Trash2, UserCheck, UserX } from "lucide-react"
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

export const AdminCard = ({ admin, onEdit, onToggleActive, onDelete }) => (
  <Card>
    <CardHeader>
      <div className="flex items-start gap-3">
        <UserAvatar user={admin} />
        <div className="min-w-0">
          <CardTitle className="truncate">{admin.name} {admin.last_name}</CardTitle>
          <CardDescription className="flex items-center gap-1 truncate">
            <Mail className="size-4" />
            {admin.email}
          </CardDescription>
        </div>
      </div>
      <CardAction>
        <ShieldCheck className="size-5 text-muted-foreground" />
      </CardAction>
    </CardHeader>
    <CardContent className="space-y-4">
      <StatusBadges user={admin} />
    </CardContent>
    <CardFooter className="justify-end gap-2">
      <Button size="icon" variant="ghost" onClick={() => onEdit(admin)}>
        <Pencil className="size-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => onToggleActive(admin)}>
        {admin.isActive ? <UserX className="size-4" /> : <UserCheck className="size-4" />}
      </Button>
      <Button size="icon" variant="ghost" onClick={() => onDelete(admin._id)}>
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </CardFooter>
  </Card>
)
