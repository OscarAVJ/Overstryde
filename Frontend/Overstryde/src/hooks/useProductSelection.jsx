import { useCallback, useEffect, useMemo, useState } from "react"
import useCart from "@/hooks/useCart"

export const normalizeColorValue = (color = "") => {
    const trimmedColor = color.trim()

    if (/^[0-9a-fA-F]{3}$/.test(trimmedColor) || /^[0-9a-fA-F]{6}$/.test(trimmedColor)) {
        return `#${trimmedColor}`
    }

    return trimmedColor
}

const getVariantColorName = (variant) => variant.color?.trim() || variant.hexColor?.trim() || ""
const getVariantHexColor = (variant) => variant.hexColor?.trim() || variant.color?.trim() || ""

const useProductSelection = (product) => {
    const { addCartItem } = useCart()
    const [selectedOption, setSelectedOption] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [cartMessage, setCartMessage] = useState("")

    const images = product?.images || []
    const isClothing = product?.product_type === "ropa"
    const variants = useMemo(
        () => isClothing ? product?.variants || [] : [],
        [isClothing, product],
    )
    const colors = useMemo(
        () => {
            const uniqueColors = new Map()

            variants.forEach((variant) => {
                const name = getVariantColorName(variant)
                if (!name || uniqueColors.has(name)) return

                uniqueColors.set(name, {
                    name,
                    hexColor: getVariantHexColor(variant),
                })
            })

            return [...uniqueColors.values()]
        },
        [variants],
    )
    const options = useMemo(
        () => [...new Set(variants.map((variant) => variant.size).filter(Boolean))],
        [variants],
    )
    const selectedVariant = useMemo(() => {
        if (variants.length === 0) return null

        return variants.find((variant) => {
            const matchesOption = options.length === 0 || variant.size === selectedOption
            const matchesColor = colors.length === 0 || getVariantColorName(variant) === selectedColor

            return matchesOption && matchesColor
        }) || null
    }, [colors, options, selectedColor, selectedOption, variants])
    const stock = isClothing ? selectedVariant?.stock || 0 : Number(product?.stock || 0)
    const categoryNames = useMemo(
        () => [
            ...new Set(
                product?.subCategories
                    ?.map((subCategory) => subCategory.category?.name)
                    .filter(Boolean) || [],
            ),
        ],
        [product],
    )
    const subCategoryNames = useMemo(
        () => product?.subCategories?.map((subCategory) => subCategory.name) || [],
        [product],
    )
    const optionLabel = "Talla"
    const canAddToCart = Boolean(
        product &&
        (!isClothing || selectedVariant) &&
        quantity > 0 &&
        quantity <= stock &&
        (options.length === 0 || selectedOption) &&
        (colors.length === 0 || selectedColor),
    )

    useEffect(() => {
        if (!product) return

        setSelectedImage(product.images?.[0] || null)
        setQuantity(1)
        setCartMessage("")

        if (!isClothing || variants.length === 0) {
            setSelectedOption("")
            setSelectedColor("")
            return
        }

        const firstVariant = variants[0]
        setSelectedOption(firstVariant.size || "")
        setSelectedColor(getVariantColorName(firstVariant))
    }, [isClothing, product, variants])

    const handleOptionChange = useCallback((value) => {
        if (!value) return
        setSelectedOption(value)
        const firstVariantForOption = variants.find((variant) => variant.size === value)
        const firstColorForOption = firstVariantForOption ? getVariantColorName(firstVariantForOption) : ""
        if (firstColorForOption) {
            setSelectedColor(firstColorForOption)
        }
        setQuantity(1)
        setCartMessage("")
    }, [variants])

    const handleColorChange = useCallback((value) => {
        if (!value) return
        setSelectedColor(value)
        setQuantity(1)
        setCartMessage("")
    }, [])

    const handleImageChange = useCallback((image) => {
        setSelectedImage(image)
    }, [])

    const decreaseQuantity = useCallback(() => {
        setQuantity((value) => Math.max(1, value - 1))
    }, [])

    const increaseQuantity = useCallback(() => {
        setQuantity((value) => Math.min(stock, value + 1))
    }, [stock])

    const handleAddToCart = useCallback(async () => {
        if (!canAddToCart) {
            setCartMessage(isClothing ? "Selecciona una variante disponible." : "No hay stock disponible.")
            return
        }

        try {
            await addCartItem({
                productId: product._id,
                variantId: selectedVariant?._id,
                quantity,
            })
            setCartMessage("Producto agregado al carrito.")
        } catch {
            setCartMessage("No se pudo agregar el producto al carrito.")
        }
    }, [addCartItem, canAddToCart, isClothing, product, quantity, selectedVariant])

    return {
        images,
        selectedImage,
        colors,
        options,
        selectedOption,
        selectedColor,
        selectedVariant,
        isClothing,
        stock,
        quantity,
        cartMessage,
        categoryNames,
        subCategoryNames,
        optionLabel,
        canAddToCart,
        handleOptionChange,
        handleColorChange,
        handleImageChange,
        decreaseQuantity,
        increaseQuantity,
        handleAddToCart,
    }
}

export default useProductSelection
