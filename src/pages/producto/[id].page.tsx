import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout';
import styled from 'styled-components';
import Image from 'next/image';
import { COLORS } from '../../share/colors';
import fav from "../../../public/icons/heartIcon.svg"
import noFav from "../../../public/icons/noHeartIcon.svg"
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })
import cart from "../../../public/icons/basketIcon.svg"
import { fetchProductById } from '../../api/utils/productoFunctions';
import { base64topng } from '../../functions/generalFunctions';
import defaultImage from '../../../public/icons/default.png';
import useAuthStore from '../../store/loginStore';
import { fetchCreateFavorite, fetchDeleteFavorite, fetchFavoriteByUserId } from '../../api/utils/favoritoFunctions';
import { customToast } from '../../share/notifications';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_descuento: number;
  color: string;
  imagen: string;
  talla_xs: number;
  talla_s: number;
  talla_m: number;
  talla_l: number;
  talla_xl: number;
  talla_xxl: number;
}

interface Favorito {
  id: number;
  id_usuario: number;
  id_producto: number;
}

const Producto = () => {
    const router = useRouter()
    const [errorAlertShown, setErrorAlertShown] = useState(false)
    const [product, setProduct] = useState<Producto>();
    const [imageSrc, setImageSrc] = useState('')
    const {id} = router.query;
    const [size, setSize] = useState(0)
    const [favoritos, setFavoritos] = useState<Favorito[]>()
    const checkLogged = useAuthStore.getState().isLogged
    const myUser = useAuthStore.getState().loggedUser
    const favorito: any = favoritos?.find(fav => fav.id_producto === product?.id && fav.id_usuario === myUser.id);
    const [favIcon, setFavIcon] = useState(favorito)
    const [idFav, setIdFav] = useState(favorito ? favorito.id : 0)



    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchProductById(id as unknown as number)
          if (data) {
            setProduct(data);
          } else {
            console.error('Error: Datos de productos no válidos.');
          }
        } catch (error) {
          console.error('Error fetching productos:', error);
        }
      };
  
      fetchData();
    }, [id]);

    useEffect(() => {
      setFavIcon(favorito)
      setIdFav(favorito ? favorito.id : 0)
    }, [favorito])
    

    useEffect(() => {
      if (checkLogged) {
        const fetchFavoritos = async () => {
          try {
            const data = await fetchFavoriteByUserId(myUser.id);
            if (data && Array.isArray(data)) {
              setFavoritos(data);
            } else {
              console.error('Error: Datos de productos no válidos.');
            }
          } catch (error) {
            console.error('Error fetching productos:', error);
          }
        };
        fetchFavoritos();
      }
    }, []);

    useEffect(() => {
      const fetchImage = async () => {
        try {
          if(product?.imagen) {
            const img = await base64topng(product?.imagen);
            setImageSrc(img);
          }
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
      };
  
      if (product) {
        fetchImage();
      }
    }, [product?.imagen]);

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

  const AddDeleteFavorite = async () => {
    if (checkLogged){
        if(favIcon){
            if(idFav) {
                setFavIcon(false)
                await fetchDeleteFavorite(idFav)
                setFavIcon(!favIcon)
                setIdFav(0)
                if (!errorAlertShown) {
                    customToast("Producto eliminado de favoritos", {
                        type: "success",
                        position: "top-left",
                        autoClose: 3000,
                        theme: "colored",
                    });
                    setErrorAlertShown(true);
                }
                setErrorAlertShown(false);
                return
            }
        }else if (!favIcon){
        const myFavorito = {id_usuario: myUser.id, id_producto: id}
        const myResponse = await fetchCreateFavorite(myFavorito)
        setIdFav(myResponse?.id)
        setFavIcon(true)
        if (!errorAlertShown) {
            customToast("Producto añadido a favoritos", {
                type: "success",
                position: "top-left",
                autoClose: 3000,
                theme: "colored",
            });
            setErrorAlertShown(true);
        } 
        setErrorAlertShown(false);
        return
        }
    }else{
        if (!errorAlertShown) {
        customToast("Debes estar logueado", {
            type: "error",
            position: "top-left",
            autoClose: 3000,
            theme: "colored",
        });
        setErrorAlertShown(true);
    }setErrorAlertShown(false);
    }
    }
    
  return (
    <SProductoContainer>
      <SLeft>
        <SProductImage src={ imageSrc ? imageSrc :  defaultImage.src} alt='' width={0} height={0}/>
      </SLeft>
      <SRight>
        <SNombreFavContainer>
          <SNombre>{product?.nombre}</SNombre>
          <SFavIcon src={favIcon ? fav : noFav} alt='' onClick={() => AddDeleteFavorite()}/> 
        </SNombreFavContainer>
        <SPricesContainer>
          {!product?.precio_descuento &&<SDiscountPrice>{product?.precio_descuento}€</SDiscountPrice>}
          <SPrice className={!product?.precio_descuento ? "noprice" : ""}>{product?.precio}€</SPrice>
          <SColor id={product?.color}></SColor>
        </SPricesContainer>
        <SSizeSelector>
          <SSizeOption onClick={() => selectSize(1)} className={size == 1 ? "selected" : ""} disabled={product?.talla_xs ? false : true}>XS</SSizeOption>
          <SSizeOption onClick={() => selectSize(2)} className={size == 2 ? "selected" : ""} disabled={product?.talla_s ? false : true}>S</SSizeOption>
          <SSizeOption onClick={() => selectSize(3)} className={size == 3 ? "selected" : ""} disabled={product?.talla_m ? false : true}>M</SSizeOption>
          <SSizeOption onClick={() => selectSize(4)} className={size == 4 ? "selected" : ""} disabled={product?.talla_l ? false : true}>L</SSizeOption>
          <SSizeOption onClick={() => selectSize(5)} className={size == 5 ? "selected" : ""} disabled={product?.talla_xl ? false : true}>XL</SSizeOption>
          <SSizeOption onClick={() => selectSize(6)} className={size == 6 ? "selected" : ""} disabled={product?.talla_xxl ? false : true}>XXL</SSizeOption>
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
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: ${COLORS.black};
`

const SFavIcon = styled(Image)`
  width: 30px;
  height: 30px;
  cursor: pointer;
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
  &.noprice {
    text-decoration: line-through;
  }
`

const SColor = styled.div`
  width: 80px;
  height: 25px;
  &#Rojo{
      border: 2px solid ${COLORS.black};
      background-color: red;
  }
  &#Azul{
      border: 2px solid ${COLORS.black};
      background-color: blue;
  }
  &#Negro{
      border: 2px solid ${COLORS.gray};
      background-color: black;
  }
  &#Verde{
      border: 2px solid ${COLORS.black};
      background-color: green;
  }
  &#Marron{
      border: 2px solid ${COLORS.black};
      background-color: brown;
  }
  &#Blanco{
      border: 2px solid ${COLORS.gray};
      background-color: white;
  }
`

const SSizeSelector = styled.div`
  display: flex;
  justify-content: space-between;
`

const SSizeOption = styled.button`
    border: 0;
    background-color: ${COLORS.green};
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