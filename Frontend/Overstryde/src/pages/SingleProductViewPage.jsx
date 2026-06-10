import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ProductCarouselMovile } from '@/components/products/ProductCarouselMovile'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useParams } from 'react-router-dom'
import useProduct from '@/hooks/useProduct'
import useProductSelection, { normalizeColorValue } from '@/hooks/useProductSelection'

export const SingleProductView = () => {
  const { id } = useParams()
  const { product, isLoading, error } = useProduct(id)
  const {
    images,
    selectedImage,
    colors,
    options,
    selectedOption,
    selectedColor,
    selectedVariant,
    stock,
    quantity,
    cartMessage,
    optionLabel,
    canAddToCart,
    handleOptionChange,
    handleColorChange,
    handleImageChange,
    decreaseQuantity,
    increaseQuantity,
    handleAddToCart,
  } = useProductSelection(product)

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center px-4 mx-auto pt-15 md:flex-row md:max-w-6xl w-full gap-3'>
        <Skeleton className='hidden sm:block w-85 h-120 rounded-lg' />
        <div className='flex flex-col gap-3 w-auto md:w-140'>
          <Skeleton className='h-8 w-4/5' />
          <Skeleton className='h-5 w-28' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-32 w-full' />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return <p className='px-4 py-8 text-red-600'>No se pudo cargar el producto.</p>
  }

  return (
    <div className='flex flex-col justify-center px-4 mx-auto pt-15 md:flex-row md:max-w-6xl w-full gap-3'>
      <div className='flex-col items-center gap-2 hidden sm:flex'>
        <img
          src={selectedImage?.path || images[0]?.path}
          alt={product.name}
          className='w-85 h-120 rounded-lg object-cover'
        />
        <div className='grid grid-cols-4 gap-2'>
          {images.slice(0, 4).map((image) => (
            <button
              key={image.public_id || image.path}
              type="button"
              onClick={() => handleImageChange(image)}
              className={`rounded-lg overflow-hidden border-2 ${selectedImage?.path === image.path ? "border-yellow-400" : "border-transparent"}`}
            >
              <img
                src={image.path}
                alt={product.name}
                className='w-30 h-40 rounded-lg object-cover'
              />
            </button>
          ))}
        </div>
      </div>

      <div className='sm:hidden'>
        <ProductCarouselMovile products={images.map((image) => ({
          id: image.public_id || image.path,
          image: image.path,
          name: product.name,
        }))} />
      </div>

      <div className='flex flex-col gap-2 w-auto md:w-140'>
        <h1 className='uppercase font-bold'>{product.name}</h1>
        <p className='font-bold text-xl'>${product.price}</p>
      
        <Separator />

        {options.length > 0 && (
          <>
            <p>{optionLabel}</p>
            <ToggleGroup
              type="single"
              value={selectedOption}
              onValueChange={handleOptionChange}
              className="flex flex-wrap justify-start"
              variant="outline"
            >
              {options.map((option) => (
                <ToggleGroupItem key={option} value={option} aria-label={option}>
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        )}

        {colors.length > 0 && (
          <>
            <p>Color {selectedColor && <span className='text-gray-500'>({selectedColor})</span>}</p>
            <ToggleGroup
              type="single"
              value={selectedColor}
              onValueChange={handleColorChange}
              className="flex flex-wrap justify-start"
              variant="outline"
            >
              {colors.map((color) => (
                <ToggleGroupItem
                  key={color}
                  value={color}
                  aria-label={color}
                  className="h-9 w-9 p-1"
                >
                  <span
                    className="block h-6 w-6 rounded-full border border-black/20"
                    style={{ backgroundColor: normalizeColorValue(color) }}
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        )}

        {selectedVariant && (
          <p className='text-sm text-gray-600'>Stock disponible: {stock}</p>
        )}

        <div className='flex items-center gap-3'>
          <Button
            type="button"
            variant="outline"
            disabled={quantity <= 1}
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <span className='min-w-8 text-center font-semibold'>{quantity}</span>
          <Button
            type="button"
            variant="outline"
            disabled={!selectedVariant || quantity >= stock}
            onClick={increaseQuantity}
          >
            +
          </Button>
        </div>

        <Button disabled={!canAddToCart} onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        {cartMessage && <p className='text-sm text-gray-600'>{cartMessage}</p>}
        <Separator />

        <p className='font-semibold'>Descripcion</p>
        <p>{product.description}</p>
      </div>
    </div>
  )
}
