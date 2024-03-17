import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import close from "../../../public/icons/closeIcon.svg"
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface FilterProps {
    isActive: boolean,
    onClose: () => void,
    setOrderBy: React.Dispatch<React.SetStateAction<"" | "asc" | "desc">>,
    setColor: React.Dispatch<React.SetStateAction<"" | "Negro" | "Blanco" | "Rojo" | "Azul" | "Verde" | "Marron">>,
    setPrice: React.Dispatch<React.SetStateAction<"" | "5-10" | "10-15" | "15-20" | "20-25" | "25-30">>,
}

const Filtros: React.FC<FilterProps> = ({onClose, isActive,setOrderBy,setColor,setPrice}) => {
    const [orderBy, setFilterOrderBy] = useState("")
    const [color, setFilterColor] = useState("")
    const [price, setFilterPrice] = useState("")

    const selectOrder = (selectedOrder: string) => {
        if (selectedOrder === "asc"){
            if (orderBy === "asc"){
                setOrderBy("")
                setFilterOrderBy("")
            }else{
                setOrderBy("asc")
                setFilterOrderBy("asc")
            }
        } else if (selectedOrder === "desc"){
            if (orderBy === "desc"){
                setOrderBy("")
                setFilterOrderBy("")
            }else{
                setOrderBy("desc")
                setFilterOrderBy("desc")
            }
        }
    }

    const selectColor = (selectedColor: string) => {
        if (selectedColor === "Negro") {
            if (color === "Negro") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Negro")
                setFilterColor("Negro")
            }
        } else if (selectedColor === "Blanco") {
            if (color === "Blanco") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Blanco")
                setFilterColor("Blanco")
            }
        }else if (selectedColor === "Rojo") {
            if (color === "Rojo") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Rojo")
                setFilterColor("Rojo")
            }
        }else if (selectedColor === "Azul") {
            if (color === "Azul") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Azul")
                setFilterColor("Azul")
            }
        }else if (selectedColor === "Verde") {
            if (color === "Verde") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Verde")
                setFilterColor("Verde")
            }
        }else if (selectedColor === "Marron") {
            if (color === "Marron") {
                setColor("")
                setFilterColor("")
            }else {
                setColor("Marron")
                setFilterColor("Marron")
            }
        }
    }

    const selectPrice = (selectedPrice: string) => {
        if (selectedPrice === "5-10") {
            if (price === "5-10") {
                setPrice("")
                setFilterPrice("")
            }else {
                setPrice("5-10")
                setFilterPrice("5-10")
            }
        } else if (selectedPrice === "10-15") {
            if (price === "10-15") {
                setPrice("")
                setFilterPrice("")
            }else {
                setPrice("10-15")
                setFilterPrice("10-15")
            }
        }else if (selectedPrice === "15-20") {
            if (price === "15-20") {
                setPrice("")
                setFilterPrice("")
            }else {
                setPrice("15-20")
                setFilterPrice("15-20")
            }
        }else if (selectedPrice === "20-25") {
            if (price === "20-25") {
                setPrice("")
                setFilterPrice("")
            }else {
                setPrice("20-25")
                setFilterPrice("20-25")
            }
        }else if (selectedPrice === "25-30") {
            if (price === "25-30") {
                setPrice("")
                setFilterPrice("")
            }else {
                setPrice("25-30")
                setFilterPrice("25-30")
            }
        }
    }

  return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="login">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Filtros</STitle>
                            <SFilters>
                                <SOrderBy>
                                    <SFilterTitle>Ordenar por</SFilterTitle>
                                    <SOptions>
                                        <SOption onClick={() => {selectOrder("asc")}} className={orderBy == "asc" ? "selected" : ""}>Precio ascendente</SOption>
                                        <SOption onClick={() => {selectOrder("desc")}} className={orderBy == "desc" ? "selected" : ""}>Precio descendente</SOption>
                                    </SOptions>
                                </SOrderBy>
                                <SColor>
                                    <SFilterTitle>Color</SFilterTitle>
                                    <SColorSelector>
                                        <SSingleColor id="negro" onClick={() => selectColor("Negro")} className={color == "Negro" ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="blanco" onClick={() => selectColor("Blanco")} className={color == "Blanco" ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="rojo" onClick={() => selectColor("Rojo")} className={color == "Rojo" ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="azul" onClick={() => selectColor("Azul")} className={color == "Azul" ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="verde" onClick={() => selectColor("Verde")} className={color == "Verde" ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="marron" onClick={() => selectColor("Marron")} className={color == "Marron" ? "selected" : ""}></SSingleColor>
                                    </SColorSelector>
                                </SColor>
                                <SPrice>
                                    <SFilterTitle>Precio</SFilterTitle>
                                    <SOptions>
                                        <SPriceOption onClick={() => selectPrice("5-10")} className={price == "5-10" ? "selected" : ""}>5€ - 10€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice("10-15")} className={price == "10-15" ? "selected" : ""}>10€ - 15€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice("15-20")} className={price == "15-20" ? "selected" : ""}>15€ - 20€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice("20-25")} className={price == "20-25" ? "selected" : ""}>20€ - 25€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice("25-30")} className={price == "25-30" ? "selected" : ""}>25€ - 30€</SPriceOption>
                                    </SOptions>
                                </SPrice>
                            </SFilters>
                        </SPopUpContainer>
                    </SShader>
                </DynamicPortal>
                
            )}
        </>
    )
}

const SShader = styled.div`
    width: 100%;
    height: 100%;
    //background-color: #00000077;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10000;
    top: 0;
`

const SPopUpContainer = styled.div`
    width: 30.5rem;
    height: 34rem;
    background-color: ${COLORS.backgroundWhite};
    border-bottom-left-radius: 0.375rem;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    display: inline-flex;
    z-index: 2000;
    position: absolute;
    top: 0;
    right: 0;
    border-left: 0.125rem solid ${COLORS.black};
    border-bottom: 0.125rem solid ${COLORS.black};
    padding-top: 1.25rem;
    padding-bottom: 1.875rem;
`

const SCloseButton = styled.div`
    position: absolute;
    margin-left: 0.75rem;
    cursor: pointer;
    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
    }
`

const SCloseImage = styled(Image)`
    width: 2.5rem;
    height: 2.5rem;
`

const STitle = styled.h2`
    width: 100%;
    font-size: 2.625rem;
    text-align: center;
`

const SFilters = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
    gap: 10px;
`

const SFilterTitle = styled.h2`
    font-size: 30px;
`

const SOrderBy = styled.div`
    
`

const SOptions = styled.div`
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const SOption = styled.h3`
    width: 200px;
    font-size: 20px;
    font-family: ${nunito.style.fontFamily};
    cursor: pointer;
    &.selected{
        text-decoration: underline;
    }
`

const SColor = styled.div`
    
`

const SColorSelector = styled.div`
    padding-left: 40px;
    display: flex;
    gap: 25px;
`

const SSingleColor = styled.div`
    width: 40px;
    height: 20px;
    cursor: pointer;
    &#rojo{
        /* border: 2px solid ${COLORS.black}; */
        background-color: red;
        &.selected{
            border: 2px solid ${COLORS.black};
        }
    }
    &#azul{
        background-color: blue;
        &.selected{
            border: 2px solid ${COLORS.black};
        }
    }
    &#negro{
        background-color: black;
        &.selected{
            border: 2px solid ${COLORS.gray};
        }
    }
    &#verde{
        background-color: green;
        &.selected{
            border: 2px solid ${COLORS.black};
        }
    }
    &#blanco{
        background-color: white;
        &.selected{
            border: 2px solid ${COLORS.black};
        }
    }
    &#marron{
        background-color: #6b3e3e;
        &.selected{
            border: 2px solid ${COLORS.black};
        }
    }
`

const SSize = styled.div`
    
`

const SSizeSelector = styled.div`
    padding-left: 40px;
    display: flex;
    gap: 30px;
`

const SSizeOption = styled.h2`
    font-size: 20px;
    font-family: ${nunito.style.fontFamily};
    cursor: pointer;
    &.selected{
        text-decoration: underline;
    }
`

const SPrice = styled.div`
    
`

const SPriceOption = styled.h3`
    width: 100px;
    font-size: 20px;
    font-family: ${nunito.style.fontFamily};
    cursor: pointer;
    &.selected{
        text-decoration: underline;
    }
`



export default Filtros