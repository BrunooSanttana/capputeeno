import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { SearchIcon } from "./search-icon";

export const PrimaryInput = styled.input`
    width: 100%;
    border-radius: 8px;
    border: none;
    padding: 10px 16px;
    margin-left: 70%;

    background-color: var(--bg-secondary);

    font-family: inherit;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: var(--text-dark);

    @media(min-width: ${props => props.theme.desktopBreakpoint}){
        font-size: 14px;
        line-height: 22px;
    }
`

const InputContainer = styled.div`
    position: relative;
    width: 250px;
    margin-right: 5%;

    @media(min-width: ${props => props.theme.desktopBreakpoint}){
        width: 352px;
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
       </InputContainer>
    )
}
