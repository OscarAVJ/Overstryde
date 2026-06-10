import React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const CustomerEditDialog = ({
  open,
  onOpenChange,
  loading,
  register,
  watch,
  setValue,
  errors,
  onSubmit,
  onCancel,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-2">
      <div className="space-y-4 px-4 pt-4">
      <DialogHeader>
        <DialogTitle>Editar customer</DialogTitle>
        <DialogDescription>
          Actualiza los datos principales y el estado del customer.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      </div>
      <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={onSubmit}>
        <div className="min-h-0 overflow-y-auto overflow-x-hidden px-4 pb-4">
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="customerName">Nombre</FieldLabel>
              <Input
                id="customerName"
                placeholder="Nombre"
                {...register("name", { required: "El nombre es obligatorio." })}
              />
              {errors.name && <FieldDescription className="text-red-500">{errors.name.message}</FieldDescription>}
            </Field>
            <Field>
              <FieldLabel htmlFor="customerLastName">Apellido</FieldLabel>
              <Input
                id="customerLastName"
                placeholder="Apellido"
                {...register("last_name", { required: "El apellido es obligatorio." })}
              />
              {errors.last_name && <FieldDescription className="text-red-500">{errors.last_name.message}</FieldDescription>}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="customerEmail">Correo</FieldLabel>
            <Input
              id="customerEmail"
              type="email"
              placeholder="customer@email.com"
              {...register("email", { required: "El correo es obligatorio." })}
            />
            {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="customerPhone">Telefono</FieldLabel>
              <Input id="customerPhone" placeholder="7000-0000" {...register("phone")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="customerCountry">Pais</FieldLabel>
              <Input id="customerCountry" placeholder="El Salvador" {...register("country")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="customerDepartment">Departamento</FieldLabel>
              <Input id="customerDepartment" placeholder="San Salvador" {...register("department")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="customerCity">Ciudad</FieldLabel>
              <Input id="customerCity" placeholder="San Salvador" {...register("city")} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="customerAddress">Direccion</FieldLabel>
            <Input id="customerAddress" placeholder="Direccion principal" {...register("address")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="customerReferences">Referencias</FieldLabel>
            <Input id="customerReferences" placeholder="Punto de referencia" {...register("references")} />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="customerIsActive">Activo</FieldLabel>
              <Switch
                id="customerIsActive"
                checked={Boolean(watch("isActive"))}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="customerIsVerified">Verificado</FieldLabel>
              <Switch
                id="customerIsVerified"
                checked={Boolean(watch("isVerified"))}
                onCheckedChange={(checked) => setValue("isVerified", checked)}
              />
            </Field>
          </div>
        </FieldGroup>
        </div>
        <DialogFooter className="shrink-0 border-t bg-background px-4 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>Guardar cambios</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
