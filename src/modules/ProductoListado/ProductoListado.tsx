import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import fav from '../../../public/icons/heartIcon.svg'
import noFav from '../../../public/icons/noHeartIcon.svg'
import { useRouter } from 'next/router'
import { base64topng } from '../../functions/generalFunctions'
import defaultImage from '../../../public/icons/default.png'

interface ProductoListadoProps {
    id: number;
    imagen: string,
    nombre: string,
    precioDescuento: number,
    precio: number,
    isFav: boolean,
    

}

const ProductoListado: React.FC<ProductoListadoProps> = ({id,imagen,nombre,precioDescuento,precio,isFav}) => {
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState('')
    
    const handleImageClick = () => {
        router.push(`/producto/${id}`);
    };

    useEffect(() => {
        const fetchImage = async () => {
          try {
            const img = await base64topng(imagen);
            setImageSrc(img);
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
          }
        };
    
        fetchImage();
      }, []);


    

  return (
    <SProductoContainer>
        <SImagen src={ imageSrc ? imageSrc :  defaultImage.src} alt='' width={0} height={0} onClick={handleImageClick}/>
        <SInformacion>
            <SLeftContainer>
                <SName>{nombre}</SName>
                <SPrices>
                    <SDiscountPrice>{precioDescuento}€</SDiscountPrice>
                    <SPrice>{precio}€</SPrice>
                </SPrices>
            </SLeftContainer>
            <SRightContainer>
                <SFavIcon src={isFav ? fav : noFav} alt=''/>
            </SRightContainer>
        </SInformacion>
    </SProductoContainer>
  )
}

const SProductoContainer = styled.div`
    width: 350px;
    height: 600px;
    //background-color: red;
    display: flex;
    flex-direction: column;
`

const SImagen = styled(Image)`
    width: 100%;
    height: 480px;
    border: 3px solid ${COLORS.black};
    object-fit: cover;
    cursor: pointer;
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