import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useProductSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.trim();

        if (!query) {
            if (location.pathname === "/products") {
                navigate("/products");
                return;
            }

            return;
        }

        const nextParams = new URLSearchParams();
        nextParams.set("search", query);
        navigate(`/products?${nextParams.toString()}`);
    };

    return {
        searchTerm,
        handleSearchChange,
        handleSearchSubmit,
    };
};

export default useProductSearch;
