import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'

const Pedidos = () => {
    const [prodCarrito, setProdCarrito] = useState([
        {id: 1, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 30,cantidad: 1 , descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 2, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 3, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 4, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 30, cantidad: 1, descuento: 0, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 5, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 6, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 30, cantidad: 1, descuento: 0, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 7, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 8, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 9, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 10, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 30, cantidad: 1, descuento: 0, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 11, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 12, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    ])

    let precioFinal = 0

  return (
    
    <SData>
        <SDataTitle>
            Pedidos
        </SDataTitle>
        <SPedidos>
        {prodCarrito.map((prod)=>{
            if (prod.descuento > 0) {
                precioFinal = prod.descuento
            }else {
                precioFinal = prod.precio
            }
            const { id, nombre, color, precio, descuento, imagen, cantidad, talla } = prod;
            return(
                <SPedido>
                    <SPedidoImage src={imagen} alt='' width={0} height={0}/>
                    <SInfoContainer>
                        <SNombrePedido>{nombre}</SNombrePedido>
                        <SDatosPedido>
                            <SColor id={color}/>
                            <STalla>{talla}</STalla>
                            <SCantidad>{cantidad}</SCantidad>
                            <SPrecio>{precioFinal}€</SPrecio>
                        </SDatosPedido>
                    </SInfoContainer>
                </SPedido>
            )
        })}
        </SPedidos>
    </SData>
  )
}

const SData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SDataTitle = styled.div`
  font-size: 25px;
  text-decoration: underline;
`

const SPedidos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
`

const SPedido = styled.div`
    width: 700px;
    display: flex;
    gap: 90px;
    border-bottom: 2px solid ${COLORS.gray};
`

const SPedidoImage = styled(Image)`
    width: 150px;
    height: 200px;
`

const SInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
    
`

const SNombrePedido = styled.h2`
    text-align: center;
    font-size: 25px;
`

const SDatosPedido = styled.div`
    display: flex;
    width: 300px;
    
    justify-content: space-between;
    
`

const SColor = styled.div`
    padding: 5px;
    border-radius: 100%;
    width: 35px;
    height: 35px;
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

const STalla = styled.div`
    font-size: 25px;
`

const SCantidad = styled.div`
    font-size: 25px;
`

const SPrecio = styled.div`
    font-size: 25px;
`



export default Pedidos