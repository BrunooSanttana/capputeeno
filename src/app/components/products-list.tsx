"use client"

import styled from "styled-components";
import { useProducts } from "../hooks/useProducts"
import { ProductCard } from "./product-card";


const ListContainer = styled.div `
    display: grid;
    grid-template-columns: repeat(4, 256px);
    grid-gap: 32px;
    max-widht: 1100%;

`

export function ProductsList() {
    const { data } = useProducts();
    return (
        <ListContainer>
            {data?.map(product => 
                <ProductCard
                    key={product.id}
                    title={product.name}
                    price={product.price_in_cents}
                    img={product.image_url}
                    id={product.id}
                />
            )}
        </ListContainer>
    );
}