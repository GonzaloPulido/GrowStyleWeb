import React, { ReactElement, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import card from '../../../public/icons/card.png'
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })
import cart from '../../../public/icons/basketIcon.svg'

const TarjetaRegalo = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  const handleOptionSelect = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null); // Deseleccionar la opción si ya está seleccionada
    } else {
      setSelectedOption(option); // Seleccionar la opción si no está seleccionada
    }
  };



  return (
    <SContainer>
      <SLeft>
        <SCardImage src={card.src} alt='' width={0} height={0}/>
      </SLeft>
      <SRight>
        <STitle>Gift Card</STitle>
        <SDescription>La tarjeta regalo GrowStyle es la solución perfecta para cualquier ocasión. 
          Disponible para canjear en línea. Se le enviará un código digital por correo electrónico 
          después de realizar el pedido.</SDescription>
        <SOptions>
          <SOption className={selectedOption === 'option1' ? 'selected' : ''} onClick={() => handleOptionSelect('option1')}>25€</SOption>
          <SOption className={selectedOption === 'option2' ? 'selected' : ''} onClick={() => handleOptionSelect('option2')}>50€</SOption>
          <SOption className={selectedOption === 'option3' ? 'selected' : ''} onClick={() => handleOptionSelect('option3')}>100€</SOption>
        </SOptions>
        <SButton>
          <SCartIcon src={cart} alt=''/>
          <SButtonTitle>Añadir al carrito</SButtonTitle>
        </SButton>
      </SRight>
    </SContainer>
  )
}


const SContainer = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 1.875rem;
  background-color: ${COLORS.green};
  min-height: 50rem;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
const SLeft = styled.div`
  
`

const SRight = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const SCardImage = styled(Image)`
  width: 700px;
  height: 418px;
  @media (max-width: 800px) {
    width: 550px;
    height: 318px;
  }
  @media (max-width: 800px) {
    width: 450px;
    height: 250px;
  }
`

const STitle = styled.h1`
  font-size: 40px;
  color: ${COLORS.black};
`

const SDescription = styled.h2`
  //text-align: center;
  font-family: ${nunito.style.fontFamily};
  font-size: 1.25rem; 
`

const SOptions = styled.div`
  display: flex;
  justify-content: space-around;
`

const SOption = styled.button`
  font-size: 1.25rem;
  height: 2.5rem;
  color: ${COLORS.white};
  background-color: ${COLORS.green};
  border: 2px solid ${COLORS.black};
  align-self: center;
  width: 6rem;
  cursor: pointer;
  color: ${COLORS.black};
  &.selected{
    background-color: ${COLORS.darkGreen};
    color: ${COLORS.white};
  }
`

const SButton = styled.button`
  font-size: 1.25rem;
  height: 2.5rem;
  color: ${COLORS.white};
  background-color: ${COLORS.darkGreen};
  border: 2px solid ${COLORS.black};
  align-self: center;
  width: 25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const SCartIcon = styled(Image)`
  width: 20px;
  height: 20px;
  filter: invert(100%);
`

const SButtonTitle = styled.h2`
  
`

TarjetaRegalo.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default TarjetaRegalo