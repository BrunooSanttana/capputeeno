
import styled from "styled-components"
import { FilterByType } from "./filter-by-type"
import { ArrowIcon } from "./arrow-icon"
import { useState } from "react"
import { useFilter } from "../hooks/useFilter"
import { PriorityTypes } from "../types/priority-types"

interface FilterOrderProps {

}

const FilterContainer = styled.div`
display: flex;
position: relative;
align-itens: center;

    button {
        cursor: pointer;
        font-family: inherit;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: var(--text-dark);
        border: none;
        background: transparent;

        svg {
            margin-left: 16px;
        }
    }
`
const PriorityFilter = styled.ul`
    width: 150px;
    position: absolute;
    border-radius: 4px;
    padding: 20px;
    top: 100%;
    margin-top: 2px;

    li {
        color: var(--text-dark);
        font-weight: 400;
        font-size: 14px;
        cursor: pointer;
        margin-top: -20px;
        &:hover {
            color: var(--orange-low);
        }
    }

    li + li {
        margin-top: 4px;
    }
`

export function FilterOrder(props: FilterOrderProps) {
    const [isOpen, setIsOpen] = useState(false)

    const { setPriority } = useFilter()

    const handleUpdatePriority = (value: PriorityTypes) => {
        setPriority(value)
        setIsOpen(false)
    }

    const handleOpen = () => setIsOpen(prev => !prev)

    return (
        <FilterContainer>
            <button onClick={handleOpen}>
                Ordernar por
                <ArrowIcon />
            </button>
            {isOpen && 
             <PriorityFilter>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.NEWS)}>Novidades</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.MINOR_PRICE)}>Preço: Maior - Menor</li>
                <li onClick={()=> handleUpdatePriority (PriorityTypes.BIGGEST_PRICE)}>Preço: Menor - Maior</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais Vendidos</li>
             </PriorityFilter> }
        </FilterContainer >
    )
}