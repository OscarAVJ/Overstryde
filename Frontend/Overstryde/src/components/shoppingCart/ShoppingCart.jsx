import useCart from '@/hooks/useCart'
import { Skeleton } from '../ui/skeleton'
import { ShoppingCartProduct } from './ShoppingCartProduct'

const ShoppingCartSkeleton = () => (
  <div className='flex flex-col gap-y-3'>
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className='flex flex-col gap-y-2'>
        <div className='flex w-full gap-x-2'>
          <Skeleton className='h-24 w-24 shrink-0 rounded-lg' />
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex items-start justify-between gap-2'>
              <Skeleton className='h-5 w-2/3' />
              <Skeleton className='h-5 w-14' />
            </div>
            <Skeleton className='h-4 w-1/2' />
            <div className='mt-auto flex items-center gap-2'>
              <Skeleton className='h-8 w-24 rounded-sm' />
              <Skeleton className='h-8 w-10 rounded-sm' />
            </div>
          </div>
        </div>
        <Skeleton className='h-px w-full' />
      </div>
    ))}
  </div>
)

export const ShoppingCart = () => {
  const { cart, isLoading, updateCartItemQuantity, removeCartItem } = useCart()

  if (isLoading) {
    return <ShoppingCartSkeleton />
  }

  if (!cart?.products?.length) {
    return <p className='text-sm text-gray-500'>Tu carrito esta vacio.</p>
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {cart.products.map((item) => (
        <ShoppingCartProduct
          key={item.variantId || item.productId?._id || item.productId}
          item={item}
          isShoppingCart={true}
          onQuantityChange={updateCartItemQuantity}
          onRemove={removeCartItem}
        />
      ))}
    </div>
  )
}
