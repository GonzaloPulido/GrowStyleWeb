import React, { ReactElement, useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import filter from '../../../public/icons/filterIcon.svg'
import Filtros from '../../modules/Filtros/Filtros'
import ProductoListado from '../../modules/ProductoListado/ProductoListado'
import { fetchAllProductos } from '../../api/utils/productoFunctions'
import { fetchFavoriteByUserId } from '../../api/utils/favoritoFunctions'
import useAuthStore from '../../store/loginStore'

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

const Rebajas = () => {
  const [filters, setFilters] = useState(false)
  const [productos, setProductos] = useState<Producto[]>([]);
  const [favoritos, setFavoritos] = useState<Favorito[]>()
  const myUser = useAuthStore.getState().loggedUser
  const checkLogged = useAuthStore.getState().isLogged
  
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
    const fetchData = async () => {
      try {
        const data = await fetchAllProductos();
        if (data && Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('Error: Datos de productos no válidos.');
        }
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <SContainer>
      {(filters) && (<Filtros isActive={filters} onClose={() => setFilters(false)}/>)}
      <SBlock1 onClick={() => setFilters(true)}>
        <SFilterImage src={filter} alt=''/>
        <SFilterTitle >Filtros</SFilterTitle>
      </SBlock1>
      <SBlock2>
      {productos.map( (prod)=>{
        const { id, nombre, precio, precio_descuento, imagen  } = prod;
        const favorito: any = favoritos?.find(fav => fav.id_producto === id && fav.id_usuario === myUser.id);
        
        return(
            nombre != "Tarjeta regalo" && precio_descuento > 0 && <ProductoListado key={id} id={id} imagen={imagen} nombre={nombre} precioDescuento={precio_descuento} precio={precio} isFav={favorito} favId={favorito ? favorito.id : 0}></ProductoListado>
        )
      })}
      </SBlock2>
    </SContainer>
  )
}

const SContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.875rem;
  background-color: ${COLORS.green};
  min-height: 50rem;
`

const SBlock1 = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: right;
  align-self: end;
  cursor: pointer;
`

const SFilterImage = styled(Image)`
  width: 25px;
  height: 25px;
`

const SFilterTitle = styled.h2`
  font-size: 35px;
`

const SBlock2 = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
`

Rebajas.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Rebajas