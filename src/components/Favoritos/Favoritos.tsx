import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'

const Favoritos = () => {
    const [prodFav, setprodFav] = useState([
        {id: 1, nombre: "Camiseta Roja" , color: "rojo", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 2, nombre: "Camiseta Azul" , color: "azul", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 3, nombre: "Camiseta Negro" , color: "negro", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 4, nombre: "Camiseta Verde" , color: "verde", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 5, nombre: "Camiseta Roja" , color: "rojo", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 6, nombre: "Camiseta Azul" , color: "azul", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 7, nombre: "Camiseta Negro" , color: "negro", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 8, nombre: "Camiseta Verde" , color: "verde", talla: "M", descuento: 10, precio: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    ])

    let precioFinal = 0

  return (
    
    <SData>
        <SDataTitle>
            Favoritos
        </SDataTitle>
        <SFavoritos>
        {prodFav.map((prod)=>{
            console.log(prodFav.length);
            if (prod.descuento > 0) {
                precioFinal = prod.descuento
            }else {
                precioFinal = prod.precio
            }
            const { id, nombre, color, precio, descuento, imagen,  talla } = prod;
            return(
                <SFav>
                    <SFavImage src={imagen} alt='' width={0} height={0}/>
                    <SInfoContainer>
                        <SNombreFav>{nombre}</SNombreFav>
                        <SDatoSFav>
                            <SColor id={color}/>
                            <STalla>{talla}</STalla>
                            <SPrecio>{precioFinal}€</SPrecio>
                        </SDatoSFav>
                    </SInfoContainer>
                </SFav>
            )
        })}
        </SFavoritos>
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

const SFavoritos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
`

const SFav = styled.div`
    width: 700px;
    display: flex;
    gap: 90px;
    border-bottom: 2px solid ${COLORS.gray};
`

const SFavImage = styled(Image)`
    width: 150px;
    height: 200px;
`

const SInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
    
`

const SNombreFav = styled.h2`
    text-align: center;
    font-size: 25px;
`

const SDatoSFav = styled.div`
    display: flex;
    width: 300px;
    gap: 70px;
    margin-left: 50px;
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

const SPrecio = styled.div`
    font-size: 25px;
`



export default Favoritos