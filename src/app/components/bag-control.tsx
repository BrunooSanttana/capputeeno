import { styled } from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { BagIcon } from "./bag-Icon";

// contador carrinho
const CartCount = styled.span`
    width: 37px;
    height: 37px;
    border-radius: 100%;
    padding: 0 1px;
    font-size: 10px;

    background-color: var(--delete-color);
    color: white;

    margin-left: -10px;
`

// carrinho de ccompras 
const Container = styled.button`
    position: relative;
    cursor: pointer;
    border: none;
    background: transparent;
    margin-left: 200px;
    top: 30%;
    
`

export function BagControl(){
    const router = useRouter()
    const { value } = useLocalStorage('cart-items', [])

    const handleNavigateToCart = () => {
        router.push("/cart")
    }

    return (
        <Container onClick={handleNavigateToCart}>
            <BagIcon/>
            {value.length > 0 && <CartCount>{value.length}</CartCount>}
        </Container>
    )
}