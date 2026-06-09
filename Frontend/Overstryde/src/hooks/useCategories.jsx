import categoryService from "@/services/categoryService"
import { useCallback, useEffect, useMemo, useState } from "react"

const CATEGORY_ORDER = ["male", "female", "accesory"]

const useCategories = () => {
    const [groupedCategories, setGroupedCategories] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadGroupedCategories = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await categoryService.getGroupedCategories()
            setGroupedCategories(response)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadGroupedCategories()
    }, [loadGroupedCategories])

    const navigationCategories = useMemo(
        () => CATEGORY_ORDER.map((type) => groupedCategories[type]).filter(Boolean),
        [groupedCategories],
    )

    return {
        groupedCategories,
        navigationCategories,
        isLoading,
        error,
        loadGroupedCategories,
    }
}

export default useCategories
