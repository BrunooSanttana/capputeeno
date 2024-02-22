"use client"

import styled from "styled-components"

import { Saira_Stencil_One } from "next/font/google"
import { PrimaryInputWSearchIcon } from "./primary-input"
import { BagControl } from "./bag-control"
import { useFilter } from "../hooks/useFilter"


interface HeaderProps {

}

const sairaStencil = Saira_Stencil_One ({ 
    weight: ['400'],
    subsets: ['latin'] })

const TagHeader = styled.header`
display: flex; 
align-itens: center
justify-content: space-between;
padding: 20px 160px;
`
const Logo = styled.a`
color: var(--logo-color);
font-weight: 400;
font-size: 40px;
line-height: 150%;
`

 
export function Header (props: HeaderProps){
    const {setSearch, search}= useFilter();
    return (
       <TagHeader>
        <Logo className={sairaStencil.className} href="/">Capputeeno</Logo>
        <div>
            <PrimaryInputWSearchIcon
            value={search}
            handleChange={setSearch}
            placeholder="procurando por algo especifico?"/>
            <BagControl/>
        </div>
       </TagHeader>
    )
}