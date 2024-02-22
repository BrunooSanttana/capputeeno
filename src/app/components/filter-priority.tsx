
import styled from "styled-components"
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
margin-right: 80px;


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
            margin-left: 10px;
        }
    }
`
const PriorityFilter = styled.ul`
    width: -5px;
    border-radius: 4px;
    padding: 20px;
    top: 100%;
    margin-top: 10px;
    z-index: 999;

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
        margin-top: 10px;
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
                <li onClick={()=> handleUpdatePriority (PriorityTypes.BIGGEST_PRICE)}>Preço: Menor - Maior</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais Vendidos</li>
             </PriorityFilter> }
        </FilterContainer >
    )
}