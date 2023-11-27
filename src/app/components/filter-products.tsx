"use client"

import styled from "styled-components"
import { FilterByType } from "./filter-by-type"
import { FilterOrder } from "./filter-priority"


interface FilterProductsProps {

}

const FilterContainer = styled.div`
display: flex;
width: 100%;
align-itens: start;
justify-content: space-between;
`

export function FilterProducts(props: FilterProductsProps){
    return (
        <FilterContainer>
            <FilterByType/>
            <FilterOrder/>
        </FilterContainer>
    )
}