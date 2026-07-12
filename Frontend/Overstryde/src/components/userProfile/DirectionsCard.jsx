import { IconRounded } from '../common/IconRounded'
import { Pencil, Trash2 } from 'lucide-react'

export const DirectionsCard = ({ address, title = "Direccion guardada", onEdit, onDelete }) => {
    return (
        <div className='flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm'>
            <div className="relative p-3">
                <div className="absolute top-2 right-2 flex gap-1">
                    {onEdit && (
                        <button type="button" onClick={onEdit} className="hover:-translate-y-0.5 duration-300" aria-label="Editar direccion">
                            <IconRounded icon={<Pencil color="#dfc201" />} />
                        </button>
                    )}
                    {onDelete && (
                        <button type="button" onClick={onDelete} className="hover:-translate-y-0.5 duration-300" aria-label="Eliminar direccion">
                            <IconRounded icon={<Trash2 color="#b91c1c" />} />
                        </button>
                    )}
                </div>
                <h1 className='font-semibold'>{title}</h1>
                <div className='flex flex-col gap-2 items-start pt-6'>
                    <p>Direccion: {address?.address || "Sin direccion guardada"}</p>
                    <p>Pais: {address?.country || "Sin pais guardado"}</p>
                    <p>Departamento: {address?.department || "Sin departamento guardado"}</p>
                    {address?.city && <p>Ciudad: {address.city}</p>}
                    {address?.phone && <p>Telefono: {address.phone}</p>}
                </div>
            </div>
        </div>
    )
}
