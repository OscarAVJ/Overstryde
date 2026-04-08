import React from 'react'
import { Search } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

export const Input = () => {
    return (
        <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Buscar..." />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
