import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout';
import styled from 'styled-components';
import Image from 'next/image';
import { COLORS } from '../../share/colors';
import fav from "../../../public/icons/heartIcon.svg"
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })
import cart from "../../../public/icons/basketIcon.svg"

const Producto = () => {
    const myProduct = {id: 1, nombre : "Camiseta Roja" , color: "rojo", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"}
    const router = useRouter()
    const {id}:any = router.query;
    const [size, setSize] = useState(0)
    
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
    
  return (
    <SProductoContainer>
      <SLeft>
        <SProductImage src={myProduct.imagen} alt='' width={0} height={0}/>
      </SLeft>
      <SRight>
        <SNombreFavContainer>
          <SNombre>{myProduct.nombre}</SNombre>
          <SFavIcon src={fav} alt=''/>
        </SNombreFavContainer>
        <SPricesContainer>
          <SDiscountPrice>{myProduct.precio}€</SDiscountPrice>
          <SPrice>{myProduct.descuento}€</SPrice>
          <SColor id={myProduct.color}></SColor>
        </SPricesContainer>
        <SSizeSelector>
          <SSizeOption onClick={() => selectSize(1)} className={size == 1 ? "selected" : ""}>XS</SSizeOption>
          <SSizeOption onClick={() => selectSize(2)} className={size == 2 ? "selected" : ""}>S</SSizeOption>
          <SSizeOption onClick={() => selectSize(3)} className={size == 3 ? "selected" : ""}>M</SSizeOption>
          <SSizeOption onClick={() => selectSize(4)} className={size == 4 ? "selected" : ""}>L</SSizeOption>
          <SSizeOption onClick={() => selectSize(5)} className={size == 5 ? "selected" : ""}>XL</SSizeOption>
          <SSizeOption onClick={() => selectSize(6)} className={size == 6 ? "selected" : ""}>XXL</SSizeOption>
      </SSizeSelector>
      <SButton>
        <SCartIcon src={cart} alt=''/>
        <SButtonTitle>Añadir al carrito</SButtonTitle>
      </SButton>
      </SRight>
    </SProductoContainer>
  )
}

const SProductoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  padding: 1.875rem;
  background-color: ${COLORS.green};
  min-height: 50rem;
`

const SLeft = styled.div`
  
`

const SRight = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const SProductImage = styled(Image)`
  width: 100%;
  height: 480px;
`

const SNombreFavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SNombre = styled.h2`
  font-size: 40px;
  color: ${COLORS.black};
`

const SFavIcon = styled(Image)`
  width: 30px;
  height: 30px;
`

const SPricesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SDiscountPrice =styled.h2`
  font-size: 40px;
  color: red;

`

const SPrice =styled.h2`
  font-size: 40px;
  text-decoration: line-through;
`

const SColor = styled.div`
  width: 80px;
  height: 25px;
  &#rojo{
      border: 2px solid ${COLORS.black};
      background-color: red;
  }
  &#azul{
      border: 2px solid ${COLORS.black};
      background-color: blue;
  }
  &#negro{
      border: 2px solid ${COLORS.gray};
      background-color: black;
  }
  &#verde{
      border: 2px solid ${COLORS.black};
      background-color: green;
  }
`

const SSizeSelector = styled.div`
  display: flex;
  justify-content: space-between;
`

const SSizeOption = styled.h2`
    font-size: 40px;
    cursor: pointer;
    &.selected{
        text-decoration: underline;
    }
`

const SButton = styled.button`
  font-size: 1.25rem;
  height: 3rem;
  color: ${COLORS.white};
  background-color: ${COLORS.darkGreen};
  border: 3px solid ${COLORS.black};
  align-self: center;
  width: 25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const SCartIcon = styled(Image)`
  width: 25px;
  height: 25px;
  filter: invert(100%);
`

const SButtonTitle = styled.h2`
  font-size: 25px;
`



Producto.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Producto