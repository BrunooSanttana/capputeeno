import styled from "styled-components";
import { formatPrice } from "../utils/format-price";

interface ProductCardProps {
    img: string;
    title: string;
    price: number;

}

const Card = styled.div`
            display: flex;
            align-items: start;
            justify-content: center;
            flex-direction: column;
            background: rgba (255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
            border-radius: 0px, 0px, 4px, 4px;
            width: 256px;

            img {
                width: 256px;
                height: 258px;    
                border-radius: 10px;
                margin-top: 30px;
                
            }


            h3 {
                font-weight: 300;
                font-size: 16px;
                line-height: 150%
                color: var(--text-dark2);

            }

            p {
                font-size: 14px;
                font-weight: 600;
                line-height: 150%;
                color: var(--shapes-dark);
                text-aligen: left;

            }


            > div {
                width: 228px;
                height: 1px;
                margin: 8px 0;
                background: var(--shapes);
            }

`

export function ProductCard(props: ProductCardProps) {
    const price = formatPrice(props.price)

    return (
        <Card>
            <img src={props.img}/>
            <h3>{props.title}</h3>
            <p>{price}</p>
        </Card>
    )
}