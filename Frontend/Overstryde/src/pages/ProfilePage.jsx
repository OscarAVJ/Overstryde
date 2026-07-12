import { Accordion } from '@/components/ui/accordion'
import { AccordionItemUser } from '@/components/userProfile/AccordionItemProfile'
import { DirectionsCard } from '@/components/userProfile/DirectionsCard'
import { UserCard } from '@/components/userProfile/UserCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, PackageSearch, Plus, X } from 'lucide-react'
import useProfile from '@/hooks/useProfile'

const ProfileListSkeleton = ({ rows = 2 }) => (
  <div className='mt-4 grid grid-cols-1 gap-3'>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className='rounded-lg border bg-white p-3 shadow-sm'>
        <div className='flex items-start justify-between gap-3'>
          <Skeleton className='h-5 w-32' />
          <div className='flex gap-1'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        </div>
        <div className='mt-5 space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='h-4 w-3/5' />
        </div>
      </div>
    ))}
  </div>
)

const OrdersSkeleton = () => (
  <div className='mt-4 space-y-3'>
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className='rounded-lg border bg-white p-4'>
        <div className='flex items-center justify-between gap-3'>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-20' />
        </div>
        <Skeleton className='mt-3 h-4 w-3/4' />
      </div>
    ))}
  </div>
)

export const ProfilePage = () => {
  const {
    user,
    isLoading,
    addresses,
    orders,
    formAddress,
    addressFormTitle,
    isAddressModalOpen,
    isSavingAddress,
    addressError,
    profileForm,
    isProfileModalOpen,
    isSavingProfile,
    profileError,
    handleAddressChange,
    openNewAddressModal,
    closeAddressModal,
    handleEditAddress,
    handleSubmitAddress,
    handleDeleteAddress,
    openProfileModal,
    closeProfileModal,
    handleProfileChange,
    handleSubmitProfile,
  } = useProfile()

  return (
    <div className='mx-4 py-2 space-y-5'>
      <UserCard user={user} isLoading={isLoading} onEditProfile={openProfileModal} />
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,420px)_1fr]'>
        <section className='rounded-lg border bg-white p-5 shadow-sm'>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className='text-xs font-semibold uppercase text-amber-600'>Entrega</p>
              <h1 className='text-xl font-semibold text-gray-950'>Direcciones guardadas</h1>
            </div>
            <Button type="button" onClick={openNewAddressModal}>
              <Plus className='size-4' />
              Agregar
            </Button>
          </div>

          {isLoading ? (
            <ProfileListSkeleton />
          ) : (
            <div className='mt-4 grid grid-cols-1 gap-3'>
              {addresses.length > 0
              ? addresses.map((address, i) => (
                <DirectionsCard
                  key={address._id || i}
                  address={address}
                  title={`Direccion ${i + 1}`}
                  onEdit={() => handleEditAddress(address)}
                  onDelete={() => handleDeleteAddress(address._id)}
                />
              ))
              : (
                <div className='rounded-lg border border-dashed bg-gray-50 p-5 text-center'>
                  <MapPin className='mx-auto size-8 text-gray-400' />
                  <h2 className='mt-2 font-semibold text-gray-950'>Sin direcciones guardadas</h2>
                  <p className='mt-1 text-sm text-gray-500'>Agrega una direccion para acelerar tu proximo checkout.</p>
                  <Button type="button" className='mt-4' onClick={openNewAddressModal}>Agregar direccion</Button>
                </div>
              )}
            </div>
          )}
        </section>

        <section className='rounded-lg border bg-white p-5 shadow-sm'>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className='text-xs font-semibold uppercase text-amber-600'>Compras</p>
              <h1 className='text-xl font-semibold text-gray-950'>Historial de compra</h1>
              <p className='mt-1 text-sm text-gray-500'>Consulta tus pedidos, pagos y productos comprados.</p>
            </div>
            <PackageSearch className='size-5 text-gray-400' />
          </div>

          {isLoading ? (
            <OrdersSkeleton />
          ) : (
            <div className='mt-4'>
              {orders.length > 0 ? (
              <Accordion type="single" collapsible className="gap-3">
                {orders.map((order, index) => (
                  <AccordionItemUser key={order._id || index} value={order._id || String(index)} order={order} />
                ))}
              </Accordion>
            ) : (
              <div className='rounded-lg border border-dashed bg-gray-50 p-8 text-center'>
                <PackageSearch className='mx-auto size-8 text-gray-400' />
                <h2 className='mt-2 font-semibold text-gray-950'>Aun no hay compras</h2>
                <p className='mt-1 text-sm text-gray-500'>Cuando completes una compra, aparecera aqui con su detalle.</p>
              </div>
            )}
            </div>
          )}
        </section>
      </div>

      {isAddressModalOpen && (
        <div className='fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-6'>
          <div className='w-full max-w-xl rounded-lg bg-white shadow-xl'>
            <div className='flex items-center justify-between gap-3 border-b p-4'>
              <div>
                <p className='text-xs font-semibold uppercase text-amber-600'>Direccion</p>
                <h2 className='text-lg font-semibold text-gray-950'>{addressFormTitle}</h2>
              </div>
              <button
                type='button'
                className='grid size-8 place-items-center rounded-lg hover:bg-gray-100'
                onClick={closeAddressModal}
                aria-label='Cerrar modal de direccion'
              >
                <X className='size-4' />
              </button>
            </div>

            <form className='grid gap-3 p-4' onSubmit={handleSubmitAddress}>
              <div className='grid gap-3 sm:grid-cols-2'>
                <Input name="country" placeholder="Pais" value={formAddress.country} onChange={handleAddressChange} required />
                <Input name="department" placeholder="Departamento" value={formAddress.department} onChange={handleAddressChange} required />
              </div>
              <Input name="address" placeholder="Direccion" value={formAddress.address} onChange={handleAddressChange} required />
              <div className='grid gap-3 sm:grid-cols-2'>
                <Input name="city" placeholder="Ciudad" value={formAddress.city} onChange={handleAddressChange} required />
                <Input name="phone" placeholder="Telefono" value={formAddress.phone} onChange={handleAddressChange} required />
              </div>
              <Input name="references" placeholder="Punto de referencia" value={formAddress.references} onChange={handleAddressChange} />
              {addressError && <p className='rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700'>{addressError}</p>}
              <div className='flex flex-wrap justify-end gap-2 pt-2'>
                <Button type="button" variant="outline" onClick={closeAddressModal}>Cancelar</Button>
                <Button type="submit" disabled={isSavingAddress}>{isSavingAddress ? 'Guardando...' : 'Guardar direccion'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className='fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-6'>
          <div className='w-full max-w-lg rounded-lg bg-white shadow-xl'>
            <div className='flex items-center justify-between gap-3 border-b p-4'>
              <div>
                <p className='text-xs font-semibold uppercase text-amber-600'>Perfil</p>
                <h2 className='text-lg font-semibold text-gray-950'>Editar perfil</h2>
              </div>
              <button
                type='button'
                className='grid size-8 place-items-center rounded-lg hover:bg-gray-100'
                onClick={closeProfileModal}
                aria-label='Cerrar modal de perfil'
              >
                <X className='size-4' />
              </button>
            </div>

            <form className='grid gap-3 p-4' onSubmit={handleSubmitProfile}>
              <div className='grid gap-3 sm:grid-cols-2'>
                <Input name="name" placeholder="Nombre" value={profileForm.name} onChange={handleProfileChange} required />
                <Input name="last_name" placeholder="Apellido" value={profileForm.last_name} onChange={handleProfileChange} required />
              </div>
              <Input name="email" type="email" placeholder="Correo" value={profileForm.email} onChange={handleProfileChange} required />
              {profileError && <p className='rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700'>{profileError}</p>}
              <div className='flex flex-wrap justify-end gap-2 pt-2'>
                <Button type="button" variant="outline" onClick={closeProfileModal}>Cancelar</Button>
                <Button type="submit" disabled={isSavingProfile}>{isSavingProfile ? 'Guardando...' : 'Guardar cambios'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
