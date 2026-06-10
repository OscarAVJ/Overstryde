import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCard } from "@/components/ui/AdminCard"
import { AdminRegisterDialog } from "@/components/ui/AdminRegisterDialog"
import { CustomerEditDialog } from "@/components/ui/CustomerEditDialog"
import { CustomerCard } from "@/components/ui/CustomerCard"
import useAdmins from "@/hooks/useAdmins"
import useCustomers from "@/hooks/useCustomers"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const Users = () => {
  const { admins, loading, error, addAdmin, editAdmin, removeAdmin } = useAdmins()
  const {
    customers,
    loading: customersLoading,
    error: customersError,
    editCustomer,
    removeCustomer,
  } = useCustomers()
  const [openAdminDialog, setOpenAdminDialog] = useState(false)
  const [isEditingAdmin, setIsEditingAdmin] = useState(false)
  const [editingAdminId, setEditingAdminId] = useState("")
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      photo: null,
      isActive: true,
      isVerified: false,
      loginAttempts: 0,
      timeOut: null,
    },
  })
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)
  const [editingCustomerId, setEditingCustomerId] = useState("")
  const [editingCustomerOrders, setEditingCustomerOrders] = useState([])
  const {
    register: registerCustomer,
    watch: watchCustomer,
    setValue: setCustomerValue,
    handleSubmit: handleSubmitCustomer,
    reset: resetCustomer,
    formState: { errors: customerFormErrors },
  } = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      country: "",
      address: "",
      department: "",
      city: "",
      references: "",
      phone: "",
      isActive: true,
      isVerified: false,
      loginAttempts: 0,
      timeOut: null,
    },
  })

  const resetAdminForm = () => {
    reset({
      name: "",
      last_name: "",
      email: "",
      password: "",
      photo: null,
      isActive: true,
      isVerified: false,
      loginAttempts: 0,
      timeOut: null,
    })
    setIsEditingAdmin(false)
    setEditingAdminId("")
  }

  const getAdminPayload = (data) => ({
    ...data,
    photo: data.photo?.[0],
  })

  const onSubmitAdmin = async (data) => {
    const action = isEditingAdmin
      ? editAdmin(editingAdminId, {
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          photo: data.photo?.[0],
          isActive: data.isActive,
          isVerified: data.isVerified,
          loginAttempts: data.loginAttempts,
          timeOut: data.timeOut,
        })
      : addAdmin(getAdminPayload(data))

    try {
      await toast.promise(action, {
        loading: isEditingAdmin ? "Actualizando administrador..." : "Creando administrador...",
        success: isEditingAdmin ? "Administrador actualizado." : "Administrador creado.",
        error: (error) => error.message || "No se pudo guardar el administrador.",
        position: "top-right",
      })
      resetAdminForm()
      setOpenAdminDialog(false)
    } catch {
      return
    }
  }

  const onErrorAdmin = (errors) => {
    toast.error("Formulario incompleto.", {
      description: Object.values(errors)[0]?.message,
      position: "top-right",
      descriptionClassName: "!text-black",
    })
  }

  const onEditAdmin = (admin) => {
    setIsEditingAdmin(true)
    setEditingAdminId(admin._id)
    reset({
      name: admin.name || "",
      last_name: admin.last_name || "",
      email: admin.email || "",
      password: "",
      photo: null,
      isActive: Boolean(admin.isActive),
      isVerified: Boolean(admin.isVerified),
      loginAttempts: admin.loginAttempts || 0,
      timeOut: admin.timeOut || null,
    })
    setOpenAdminDialog(true)
  }

  const onToggleAdminActive = async (admin) => {
    const action = editAdmin(admin._id, {
        name: admin.name,
        last_name: admin.last_name,
        email: admin.email,
        isActive: !admin.isActive,
        isVerified: admin.isVerified,
        loginAttempts: admin.loginAttempts || 0,
        timeOut: admin.timeOut || null,
      })

    try {
      await toast.promise(action, {
        loading: "Actualizando estado...",
        success: admin.isActive ? "Administrador desactivado." : "Administrador activado.",
        error: (error) => error.message || "No se pudo cambiar el estado.",
        position: "top-right",
      })
    } catch {
      return
    }
  }

  const onDeleteAdmin = async (id) => {
    const toastId = toast.warning("Eliminar administrador", {
      description: "Esta accion no se puede deshacer.",
      position: "top-right",
      duration: 10000,
      action: {
        label: "Eliminar",
        onClick: () => {
          toast.dismiss(toastId)
          toast.promise(removeAdmin(id), {
            loading: "Eliminando administrador...",
            success: "Administrador eliminado.",
            error: (error) => error.message || "No se pudo eliminar el administrador.",
            position: "top-right",
          })
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => toast.dismiss(toastId),
      },
    })
  }

  const getCustomerUpdatePayload = (customer, overrides = {}) => ({
    name: customer.name,
    last_name: customer.last_name,
    email: customer.email,
    addresses: customer.addresses || [],
    purchase_history: customer.purchase_history?.map((purchase) => ({
      orders_id: purchase.orders_id?._id || purchase.orders_id,
    })) || [],
    isActive: customer.isActive,
    isVerified: customer.isVerified,
    loginAttempts: customer.loginAttempts || 0,
    timeOut: customer.timeOut || null,
    ...overrides,
  })

  const resetCustomerForm = () => {
    resetCustomer({
      name: "",
      last_name: "",
      email: "",
      country: "",
      address: "",
      department: "",
      city: "",
      references: "",
      phone: "",
      isActive: true,
      isVerified: false,
      loginAttempts: 0,
      timeOut: null,
    })
    setEditingCustomerId("")
    setEditingCustomerOrders([])
  }

  const onEditCustomer = (customer) => {
    const primaryAddress = customer.addresses?.[0] || {}

    setEditingCustomerId(customer._id)
    setEditingCustomerOrders(customer.purchase_history || [])
    resetCustomer({
      name: customer.name || "",
      last_name: customer.last_name || "",
      email: customer.email || "",
      country: primaryAddress.country || "",
      address: primaryAddress.address || "",
      department: primaryAddress.department || "",
      city: primaryAddress.city || "",
      references: primaryAddress.references || "",
      phone: primaryAddress.phone || "",
      isActive: Boolean(customer.isActive),
      isVerified: Boolean(customer.isVerified),
      loginAttempts: customer.loginAttempts || 0,
      timeOut: customer.timeOut || null,
    })
    setOpenCustomerDialog(true)
  }

  const onSubmitCustomer = async (data) => {
    const payload = {
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      addresses: [
        {
          country: data.country,
          address: data.address,
          department: data.department,
          city: data.city,
          references: data.references,
          phone: data.phone,
        },
      ],
      purchase_history: editingCustomerOrders.map((purchase) => ({
        orders_id: purchase.orders_id?._id || purchase.orders_id,
      })),
      isActive: data.isActive,
      isVerified: data.isVerified,
      loginAttempts: data.loginAttempts || 0,
      timeOut: data.timeOut || null,
    }

    try {
      await toast.promise(editCustomer(editingCustomerId, payload), {
        loading: "Actualizando customer...",
        success: "Customer actualizado.",
        error: (error) => error.message || "No se pudo actualizar el customer.",
        position: "top-right",
      })
      resetCustomerForm()
      setOpenCustomerDialog(false)
    } catch {
      return
    }
  }

  const onErrorCustomer = (errors) => {
    toast.error("Formulario incompleto.", {
      description: Object.values(errors)[0]?.message,
      position: "top-right",
      descriptionClassName: "!text-black",
    })
  }

  const onToggleCustomerActive = async (customer) => {
    const action = editCustomer(
      customer._id,
      getCustomerUpdatePayload(customer, { isActive: !customer.isActive })
    )

    try {
      await toast.promise(action, {
        loading: "Actualizando estado del customer...",
        success: customer.isActive ? "Customer desactivado." : "Customer activado.",
        error: (error) => error.message || "No se pudo cambiar el estado del customer.",
        position: "top-right",
      })
    } catch {
      return
    }
  }

  const onDeleteCustomer = async (id) => {
    const toastId = toast.warning("Eliminar customer", {
      description: "Esta accion no se puede deshacer.",
      position: "top-right",
      duration: 10000,
      action: {
        label: "Eliminar",
        onClick: () => {
          toast.dismiss(toastId)
          toast.promise(removeCustomer(id), {
            loading: "Eliminando customer...",
            success: "Customer eliminado.",
            error: (error) => error.message || "No se pudo eliminar el customer.",
            position: "top-right",
          })
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => toast.dismiss(toastId),
      },
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona administradores y clientes de la tienda
          </p>
        </div>
        <AdminRegisterDialog
          open={openAdminDialog}
          onOpenChange={(open) => {
            setOpenAdminDialog(open)
            if (!open) resetAdminForm()
          }}
          isEditing={isEditingAdmin}
          loading={loading}
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          onSubmit={handleSubmit(onSubmitAdmin, onErrorAdmin)}
          onCancel={resetAdminForm}
        />
        <CustomerEditDialog
          open={openCustomerDialog}
          onOpenChange={(open) => {
            setOpenCustomerDialog(open)
            if (!open) resetCustomerForm()
          }}
          loading={customersLoading}
          register={registerCustomer}
          watch={watchCustomer}
          setValue={setCustomerValue}
          errors={customerFormErrors}
          onSubmit={handleSubmitCustomer(onSubmitCustomer, onErrorCustomer)}
          onCancel={resetCustomerForm}
        />
      </div>

      <Tabs defaultValue="admins" className="space-y-4">
        <TabsList className="h-10">
          <TabsTrigger value="admins" className="px-4">
            Administradores
          </TabsTrigger>
          <TabsTrigger value="customers" className="px-4">
            Customers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admins" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Usuarios administradores</h2>
              <p className="text-sm text-muted-foreground">Acceso al panel administrativo</p>
            </div>
            <Badge variant="secondary">{admins.length} admins</Badge>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && <p className="text-sm text-muted-foreground">Cargando administradores...</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {admins.map((admin) => (
              <AdminCard
                key={admin._id}
                admin={admin}
                onEdit={onEditAdmin}
                onToggleActive={onToggleAdminActive}
                onDelete={onDeleteAdmin}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Customers</h2>
              <p className="text-sm text-muted-foreground">Clientes registrados en la tienda</p>
            </div>
            <Badge variant="secondary">{customers.length} customers</Badge>
          </div>
          {customersError && <p className="text-sm text-red-600">{customersError}</p>}
          {customersLoading && <p className="text-sm text-muted-foreground">Cargando customers...</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {customers.map((customer) => (
              <CustomerCard
                key={customer._id}
                customer={customer}
                onEdit={onEditCustomer}
                onToggleActive={onToggleCustomerActive}
                onDelete={onDeleteCustomer}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Users
