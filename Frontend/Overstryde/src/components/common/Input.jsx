import { Search } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

export const Input = ({ value = "", onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-xs">
            <InputGroup>
                <InputGroupInput
                    value={value}
                    onChange={onChange}
                    placeholder="Buscar..."
                    aria-label="Buscar productos"
                />
                <InputGroupAddon>
                    <button type="submit" aria-label="Buscar productos">
                        <Search />
                    </button>
                </InputGroupAddon>
            </InputGroup>
        </form>
    )
}
