const URL = "http://localhost:4000/api/categories"
const categoryService = {}

categoryService.getCategories = async () => {
    const response = await fetch(`${URL}/`)
    if (!response.ok) {
        throw new Error("Could not load categories")
    }
    return response.json()
}

categoryService.getGroupedCategories = async () => {
    const response = await fetch(`${URL}/grouped`)
    if (!response.ok) {
        throw new Error("Could not load grouped categories")
    }
    return response.json()
}

categoryService.getCategoryById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error("Could not load category")
    }
    return response.json()
}

categoryService.createCategory = async (category) => {
    const response = await fetch(`${URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    })
    if (!response.ok) {
        throw new Error("Could not create category")
    }
    return response.json()
}

categoryService.updateCategory = async (id, category) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    })
    if (!response.ok) {
        throw new Error("Could not update category")
    }
    return response.json()
}

categoryService.deleteCategory = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error("Could not delete category")
    }
    return response.json()
}

export default categoryService
