import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { SearchIcon } from "./search-icon";

export const PrimaryInput = styled.input`
width: 352px;
padding: 10px, 16px, 10px, 16px;
border-radius: 8px;
border: none;
margin-left: 100%;
margin-top: 7%;
background-color: var(--bg-secondary);

font-family: inherit;
font-weight: 400;
line-height: 22px;
font-size: 14px;
color: var(--text-dark);
`
// LUPA
const InputContainer =styled.div` 
position: relative;
width: 302px;

svg {
    position: absolute;
    margin-left: 630px;
    top: 50%;
}
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string,
    handleChange: (value: string ) => void
}

export function PrimaryInputWSearchIcon(props: InputProps){
    return(
       <InputContainer>
            <PrimaryInput onChange={(event) => props.handleChange(event.target.value)}{...props}/>
            <SearchIcon/>
       </InputContainer>
    )
}
