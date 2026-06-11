import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const AdminRegisterDialog = ({
  open,
  onOpenChange,
  isEditing,
  loading,
  register,
  watch,
  setValue,
  errors,
  onSubmit,
  onCancel,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button className="h-11">
        <Plus />
        Nuevo administrador
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Editar administrador" : "Registrar administrador"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Actualiza los datos principales del administrador."
            : "Estos campos coinciden con el registro de administradores del backend."}
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form className="space-y-4" onSubmit={onSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="adminName">Nombre</FieldLabel>
            <Input
              id="adminName"
              name="name"
              placeholder="Nombre"
              {...register("name", { required: "El nombre es obligatorio." })}
            />
            {errors.name && <FieldDescription className="text-red-500">{errors.name.message}</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel htmlFor="adminLastName">Apellido</FieldLabel>
            <Input
              id="adminLastName"
              name="last_name"
              placeholder="Apellido"
              {...register("last_name", { required: "El apellido es obligatorio." })}
            />
            {errors.last_name && <FieldDescription className="text-red-500">{errors.last_name.message}</FieldDescription>}
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="adminEmail">Correo</FieldLabel>
          <Input
            id="adminEmail"
            name="email"
            type="email"
            placeholder="admin@overstryde.com"
            {...register("email", { required: "El correo es obligatorio." })}
          />
          {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
        </Field>
        {!isEditing && (
        <Field>
          <FieldLabel htmlFor="adminPassword">Constraseña</FieldLabel>
          <Input
            id="adminPassword"
            name="password"
            type="password"
            placeholder="********"
            {...register("password", { required: "La contrasena es obligatoria." })}
          />
          {errors.password && <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>}
        </Field>
        )}
        <Field>
          <FieldLabel htmlFor="adminPhoto">Foto</FieldLabel>
          <Input id="adminPhoto" name="photo" type="file" accept="image/*" {...register("photo")} />
          {isEditing && (
            <FieldDescription>
              Selecciona una nueva foto solo si quieres reemplazar la actual.
            </FieldDescription>
          )}
        </Field>
        {isEditing && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="adminIsActive">Activo</FieldLabel>
              <Switch
                id="adminIsActive"
                checked={Boolean(watch("isActive"))}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="adminIsVerified">Verificado</FieldLabel>
              <Switch
                id="adminIsVerified"
                checked={Boolean(watch("isVerified"))}
                onCheckedChange={(checked) => setValue("isVerified", checked)}
              />
            </Field>
          </div>
        )}
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {isEditing ? "Guardar cambios" : "Registrar"}
        </Button>
      </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
