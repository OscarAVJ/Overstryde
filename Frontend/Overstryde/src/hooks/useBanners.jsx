import bannerService from "@/services/bannerService"
import { useCallback, useEffect, useState } from "react"

const useBanners = () => {
    const [banners, setBanners] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadActiveBanners = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await bannerService.getActiveBanners()
            setBanners(response)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadActiveBanners()
    }, [loadActiveBanners])

    return { banners, isLoading, error, loadActiveBanners }
}

export default useBanners
