import React, { ReactElement, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import filter from '../../../public/icons/filterIcon.svg'
import Filtros from '../../modules/Filtros/Filtros'
import ProductoListado from '../../modules/ProductoListado/ProductoListado'

const Catalogo = () => {
  const [filters, setFilters] = useState(false)

  const [prodFavoritos, setProdFavoritos] = useState([
    {id: 1, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 2, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 3, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 4, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 5, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 6, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 7, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    {id: 8, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
  ])


  return (
    <SContainer>
      {(filters) && (<Filtros isActive={filters} onClose={() => setFilters(false)}/>)}
      <SBlock1 onClick={() => setFilters(true)}>
        <SFilterImage src={filter} alt=''/>
        <SFilterTitle >Filtros</SFilterTitle>
      </SBlock1>
      <SBlock2>
      {prodFavoritos.map((prod)=>{
                                const { id, nombre, color, precio, descuento, imagen } = prod;
                                console.log(imagen);
                                return(
                                    <ProductoListado imagen={imagen} nombre={nombre} precioDescuento={descuento} precio={precio} isFav={false}></ProductoListado>
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

Catalogo.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Catalogo