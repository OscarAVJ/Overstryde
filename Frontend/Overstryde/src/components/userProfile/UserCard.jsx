import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { NavLink } from 'react-router-dom'
import { Mail, ShieldCheck, UserRound } from 'lucide-react'

export const UserCard = ({ user, isLoading, onEditProfile }) => {
    const fullName = [user?.name, user?.last_name].filter(Boolean).join(' ')

    if (isLoading) {
        return (
            <div className='rounded-lg border bg-white shadow-sm'>
                <div className='flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between'>
                    <div className='flex items-center gap-4'>
                        <Skeleton className='size-12 rounded-lg' />
                        <div className='space-y-2'>
                            <Skeleton className='h-7 w-56' />
                            <Skeleton className='h-4 w-64 max-w-full' />
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                        <Skeleton className='h-6 w-16 rounded-full' />
                        <Skeleton className='h-9 w-28 rounded-md' />
                    </div>
                </div>
            </div>
        )
    }

    if (!user?._id) {
        return (
            <div className='rounded-lg border bg-white shadow-sm'>
                <div className='flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-xl font-semibold'>Inicia sesion</h1>
                        <p className='text-sm text-gray-500'>Accede para ver tu perfil y tus compras.</p>
                    </div>
                    <Button asChild>
                        <NavLink to="/login">Iniciar sesion</NavLink>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className='rounded-lg border bg-white shadow-sm'>
            <div className='flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='grid size-12 place-items-center rounded-lg bg-gray-100 text-gray-700'>
                        <UserRound className='size-6' />
                    </div>
                    <div className='space-y-1'>
                        <h1 className='text-2xl font-semibold text-gray-950'>{fullName || 'Cliente Overstryde'}</h1>
                        <p className='flex items-center gap-2 text-sm text-gray-600'>
                            <Mail className='size-4' />
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <Badge>{user.isActive === false ? 'Inactivo' : 'Activo'}</Badge>
                    {user.isVerified && (
                        <Badge variant='secondary'>
                            <ShieldCheck className='size-3.5' />
                            Verificado
                        </Badge>
                    )}
                    <Button type="button" onClick={onEditProfile}>Editar perfil</Button>
                    {!user.isVerified && <Button variant='secondary'>Verificar cuenta</Button>}
                </div>
            </div>
        </div>
    )
}
