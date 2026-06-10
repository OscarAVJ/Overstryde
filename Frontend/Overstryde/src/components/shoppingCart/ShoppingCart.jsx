import useCart from '@/hooks/useCart'
import { ShoppingCartProduct } from './ShoppingCartProduct'

export const ShoppingCart = () => {
  const { cart, isLoading, updateCartItemQuantity, removeCartItem } = useCart()

  if (isLoading) {
    return <p className='text-sm text-gray-500'>Cargando carrito...</p>
  }

  if (!cart?.products?.length) {
    return <p className='text-sm text-gray-500'>Tu carrito esta vacio.</p>
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {cart.products.map((item) => (
        <ShoppingCartProduct
          key={item.variantId}
          item={item}
          isShoppingCart={true}
          onQuantityChange={updateCartItemQuantity}
          onRemove={removeCartItem}
        />
      ))}
    </div>
  )
}
