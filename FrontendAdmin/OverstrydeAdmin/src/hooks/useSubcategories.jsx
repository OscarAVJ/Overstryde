import { useState, useEffect } from "react";
import { getSubCategories } from "@/services/subCategories.service.js";

const useSubcategories = () =>{
    const [subcategories, setSubcategories] = useState([])
    const [error, setError] = useState("")

    const fetchSubcategories = async () => {
        try {
            const data = await getSubCategories();
            setSubcategories(data)
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() =>{
        fetchSubcategories();
    }, [])

    return{
        subcategories
    }
}

export default useSubcategories;