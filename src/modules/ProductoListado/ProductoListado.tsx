import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import fav from '../../../public/icons/heartIcon.svg'

interface ProductoListadoProps {
    imagen: string,
    nombre: string,
    precioDescuento: number,
    precio: number,
    isFav?: boolean,

}

const ProductoListado: React.FC<ProductoListadoProps> = ({imagen,nombre,precioDescuento,precio,isFav}) => {
  return (
    <SProductoContainer>
        <SImagen src={imagen} alt='' width={0} height={0}/>
        <SInformacion>
            <SLeftContainer>
                <SName>{nombre}</SName>
                <SPrices>
                    <SDiscountPrice>{precioDescuento}€</SDiscountPrice>
                    <SPrice>{precio}€</SPrice>
                </SPrices>
            </SLeftContainer>
            <SRightContainer>
                <SFavIcon src={fav} alt=''/>
            </SRightContainer>
        </SInformacion>
    </SProductoContainer>
  )
}

const SProductoContainer = styled.div`
    width: 350px;
    height: 600px;
    background-color: red;
    display: flex;
    flex-direction: column;
`

const SImagen = styled(Image)`
    width: 100%;
    height: 480px;
    border: 3px solid ${COLORS.black};
    //object-fit: cover;
`
const SInformacion = styled.div`
    border: 2px solid ${COLORS.black};
    background-color: ${COLORS.white};
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

const SLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const SRightContainer = styled.div`
    display: flex;
    align-items: center;
`

const SName = styled.h2`
    font-size: 25px;
`

const SPrices = styled.div`
    display: flex;
    gap: 15px;
`

const SDiscountPrice = styled.h2`
    font-size: 25px;
    color: ${COLORS.darkRed}; 
`

const SPrice = styled.h2`
    font-size: 25px;
    text-decoration: line-through;
`

const SFavIcon = styled(Image)`
    width: 30px;
    height: 30px;
    margin-right: 15px;
`

export default ProductoListado