const URL = "http://localhost:4000/api/banners"
const bannerService = {}

bannerService.getBanners = async () => {
    const response = await fetch(`${URL}/`)
    if (!response.ok) {
        throw new Error("Could not load banners")
    }
    return response.json()
}

bannerService.getActiveBanners = async () => {
    const response = await fetch(`${URL}/active`)
    if (!response.ok) {
        throw new Error("Could not load active banners")
    }
    return response.json()
}

bannerService.getBannerById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error("Could not load banner")
    }
    return response.json()
}

bannerService.createBanner = async (formData) => {
    const response = await fetch(`${URL}/`, {
        method: "POST",
        body: formData,
    })
    if (!response.ok) {
        throw new Error("Could not create banner")
    }
    return response.json()
}

bannerService.updateBanner = async (id, formData) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        body: formData,
    })
    if (!response.ok) {
        throw new Error("Could not update banner")
    }
    return response.json()
}

bannerService.deleteBanner = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error("Could not delete banner")
    }
    return response.json()
}

export default bannerService
