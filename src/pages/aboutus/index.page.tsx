import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import Image from 'next/image'
import { COLORS } from '../../share/colors'
import {Nunito } from "next/font/google"
import router from 'next/router'
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })
import nosotros from '../../../public/icons/empresa.jpeg'
import logo from '../../../public/icons/bigLogoGrowStyle.png'

const AboutUs = () => {
  return (
    <SMain>
      <STitle>¿Quienes Somos?</STitle>
      <SAboutUsImg src={nosotros.src} alt='' width="0" height="0"/>
      <SDescription>"En GrowStyle, somos más que una tienda de camisetas y sudaderas. Nosotros representamos una 
        comunidad que abraza el crecimiento personal y la expresión auténtica a través del estilo. 
        Nuestra pasión radica en brindarte prendas de vestir de alta calidad que te permitan mostrar quién eres 
        y lo que valoras.
      </SDescription>

      <SDescription>
        Nos enorgullece crear prendas que no solo te hagan lucir bien, sino que también te hagan 
        sentir empoderado/a. Nuestro compromiso con la calidad se refleja en cada detalle, desde la elección de 
        los materiales hasta los acabados finales. Queremos que te sientas cómodo/a y seguro/a usando nuestras prendas, 
        sabiendo que estás vistiendo un estilo que representa tu crecimiento personal y tu individualidad."
      </SDescription>
    </SMain>
  )
}


const SMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; 
  padding: 1.875rem;
  background-color: ${COLORS.green};
  height: 65rem;
`

const STitle = styled.h1`
  font-size: 60px;
  @media (max-width: 850px) {
    font-size: 50px;
  }
  @media (max-width: 850px) {
    font-size: 40px;
  }
`

const SAboutUsImg = styled(Image)`
  width: 50.25rem;
  height: 33.75rem; 
  border-radius: 0.375rem;
  @media (max-width: 850px) {
    width: 39.25rem;
    height: 26.75rem; 
  }
  @media (max-width: 660px) {
    width: 30.25rem;
    height: 20.75rem;
  }
  @media (max-width: 550px) {
    width: 26.25rem;
    height: 17.75rem;
  }
`

const SDescription = styled.p`
  width: 50rem;
  text-align: center;
  font-size: 1.25rem; 
  @media (max-width: 850px) {
    width: 40rem;
  }
  @media (max-width: 660px) {
    width: 30rem;
  }
  @media (max-width: 550px) {
    width: 25rem;
  }
`

AboutUs.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default AboutUs