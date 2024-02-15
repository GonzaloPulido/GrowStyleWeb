import dynamic from 'next/dynamic'
import React, { useState } from 'react'
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
    onClose: () => void
}

const Filtros: React.FC<FilterProps> = ({onClose, isActive}) => {
    const [orderBy, setOrderBy] = useState(0)
    const [color, setColor] = useState(0)
    const [size, setSize] = useState(0)
    const [price, setPrice] = useState(0)

    const selectOrder = (selectedNumber: number) => {
        if (selectedNumber === 1){
            if (orderBy === 1){
                setOrderBy(0)
            }else{
                setOrderBy(1)
            }
        } else if (selectedNumber === 2){
            if (orderBy === 2){
                setOrderBy(0)
            }else{
                setOrderBy(2)
            }
        }
    }

    const selectColor = (selectedColor: number) => {
        if (selectedColor === 1) {
            if (color === 1) {
                setColor(0)
            }else {
                setColor(1)
            }
        } else if (selectedColor === 2) {
            if (color === 2) {
                setColor(0)
            }else {
                setColor(2)
            }
        }else if (selectedColor === 3) {
            if (color === 3) {
                setColor(0)
            }else {
                setColor(3)
            }
        }else if (selectedColor === 4) {
            if (color === 4) {
                setColor(0)
            }else {
                setColor(4)
            }
        }else if (selectedColor === 5) {
            if (color === 5) {
                setColor(0)
            }else {
                setColor(5)
            }
        }else if (selectedColor === 6) {
            if (color === 6) {
                setColor(0)
            }else {
                setColor(6)
            }
        }
    }

    const selectSize = (selectedSize: number) => {
        if (selectedSize === 1) {
            if (size === 1) {
                setSize(0)
            }else {
                setSize(1)
            }
        } else if (selectedSize === 2) {
            if (size === 2) {
                setSize(0)
            }else {
                setSize(2)
            }
        }else if (selectedSize === 3) {
            if (size === 3) {
                setSize(0)
            }else {
                setSize(3)
            }
        }else if (selectedSize === 4) {
            if (size === 4) {
                setSize(0)
            }else {
                setSize(4)
            }
        }else if (selectedSize === 5) {
            if (size === 5) {
                setSize(0)
            }else {
                setSize(5)
            }
        }else if (selectedSize === 6) {
            if (size === 6) {
                setSize(0)
            }else {
                setSize(6)
            }
        }
    }

    const selectPrice = (selectedPrice: number) => {
        if (selectedPrice === 1) {
            if (price === 1) {
                setPrice(0)
            }else {
                setPrice(1)
            }
        } else if (selectedPrice === 2) {
            if (price === 2) {
                setPrice(0)
            }else {
                setPrice(2)
            }
        }else if (selectedPrice === 3) {
            if (price === 3) {
                setPrice(0)
            }else {
                setPrice(3)
            }
        }else if (selectedPrice === 4) {
            if (price === 4) {
                setPrice(0)
            }else {
                setPrice(4)
            }
        }else if (selectedPrice === 5) {
            if (price === 5) {
                setPrice(0)
            }else {
                setPrice(5)
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
                                        <SOption onClick={() => selectOrder(1)} className={orderBy == 1 ? "selected" : ""}>Precio ascendente</SOption>
                                        <SOption onClick={() => selectOrder(2)} className={orderBy == 2 ? "selected" : ""}>Precio descendente</SOption>
                                    </SOptions>
                                </SOrderBy>
                                <SColor>
                                    <SFilterTitle>Color</SFilterTitle>
                                    <SColorSelector>
                                        <SSingleColor id="negro" onClick={() => selectColor(1)} className={color == 1 ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="blanco" onClick={() => selectColor(2)} className={color == 2 ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="rojo" onClick={() => selectColor(3)} className={color == 3 ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="azul" onClick={() => selectColor(4)} className={color == 4 ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="verde" onClick={() => selectColor(5)} className={color == 5 ? "selected" : ""}></SSingleColor>
                                        <SSingleColor id="marron" onClick={() => selectColor(6)} className={color == 6 ? "selected" : ""}></SSingleColor>
                                    </SColorSelector>
                                </SColor>
                                <SSize>
                                    <SFilterTitle>Talla</SFilterTitle>
                                    <SSizeSelector>
                                        <SSizeOption onClick={() => selectSize(1)} className={size == 1 ? "selected" : ""}>XS</SSizeOption>
                                        <SSizeOption onClick={() => selectSize(2)} className={size == 2 ? "selected" : ""}>S</SSizeOption>
                                        <SSizeOption onClick={() => selectSize(3)} className={size == 3 ? "selected" : ""}>M</SSizeOption>
                                        <SSizeOption onClick={() => selectSize(4)} className={size == 4 ? "selected" : ""}>L</SSizeOption>
                                        <SSizeOption onClick={() => selectSize(5)} className={size == 5 ? "selected" : ""}>XL</SSizeOption>
                                        <SSizeOption onClick={() => selectSize(6)} className={size == 6 ? "selected" : ""}>XXL</SSizeOption>
                                    </SSizeSelector>
                                </SSize>
                                <SPrice>
                                    <SFilterTitle>Precio</SFilterTitle>
                                    <SOptions>
                                        <SPriceOption onClick={() => selectPrice(1)} className={price == 1 ? "selected" : ""}>5€ - 10€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice(2)} className={price == 2 ? "selected" : ""}>10€ - 15€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice(3)} className={price == 3 ? "selected" : ""}>15€ - 20€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice(4)} className={price == 4 ? "selected" : ""}>20€ - 25€</SPriceOption>
                                        <SPriceOption onClick={() => selectPrice(5)} className={price == 5 ? "selected" : ""}>25€ - 30€</SPriceOption>
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
    height: 37rem;
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