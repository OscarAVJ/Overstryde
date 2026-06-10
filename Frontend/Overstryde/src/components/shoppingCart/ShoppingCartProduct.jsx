import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

export const ShoppingCartProduct = ({ item, isShoppingCart, onQuantityChange, onRemove }) => {
  if (!item) {
    return null
  }

  const product = item.productId
  const image = product?.images?.[0]?.path
  const itemKey = item.variantId || product?._id || item.productId

  return (
    <div className='flex flex-col gap-y-2'>
      <div className={`flex w-full gap-x-2 ${isShoppingCart ? 'min-h-20' : 'min-h-27'}`}>
        <img src={image} alt={product?.name} className='w-24 h-24 object-cover rounded-lg shrink-0 bg-gray-100' />
        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <h1 className='font-bold text-lg leading-tight truncate'>
              {product?.name}
            </h1>
            <p className='font-bold text-lg shrink-0'>${item.subTotal}</p>
          </div>
          <div className='flex flex-wrap gap-2 font-extralight text-sm'>
            {item.option && <p>Opcion: {item.option}</p>}
            {item.color && <p>Color: #{item.color.replace("#", "")}</p>}
          </div>
          <div className='flex mt-auto items-center gap-2'>
            <div className='flex justify-center bg-gray-100 rounded-sm gap-3 px-3 py-1'>
              {isShoppingCart ? (
                <>
                  <button
                    className='transform duration-300 active:-translate-y-0.5'
                    onClick={() => onQuantityChange(itemKey, item.quantity - 1)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className='transform duration-300 active:-translate-y-0.5'
                    onClick={() => onQuantityChange(itemKey, item.quantity + 1)}
                  >
                    +
                  </button>
                </>
              ) : (
                `Cantidad: ${item.quantity}`
              )}
            </div>
            <Button
              variant='outlined'
              className={"h-auto p-2 bg-gray-100"}
              onClick={() => onRemove(itemKey)}
            >
              <Trash size={24} />
            </Button>
          </div>
        </div>
      </div>
      <Separator className={""} />
    </div>
  )
}
