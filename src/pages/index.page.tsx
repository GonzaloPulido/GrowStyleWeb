import Head from 'next/head'
import React from 'react'
import { NextPageWithLayout } from './_app.page'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import AppLayout from '../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import Image from 'next/image'
import sales from '../../public/icons/rebajas.png'
import logo from '../../public/icons/bigLogoGrowStyle.png'
import { COLORS } from '../share/colors'
import router from 'next/router'
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
    <SMain>
      <SSalesImage src={sales.src} alt='' width="0" height="0" onClick={() => router.push("/catalogo")}/>
      <SLogoImage src={logo.src} alt='' width="0" height="0" onClick={() => router.push("/")}/>
      <SDescription>"En GrowStyle, creemos en el poder transformador del crecimiento personal y el estilo auténtico. 
        Somos una tienda dedicada a ofrecer camisetas y sudaderas que reflejan esta filosofía única. 
        Nuestro nombre, "GrowStyle", representa la combinación perfecta entre el crecimiento personal y el 
        estilo de vida. Cada prenda que ofrecemos está cuidadosamente diseñada para transmitir un mensaje de 
        empoderamiento y motivación"</SDescription>
    </SMain>
    </>
  )
}

IndexPage.getLayout = (page: ReactElement) => {
  return <AppLayout title={''}>{page}</AppLayout>
}

const SMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; 
  padding: 1.875rem;
  background-color: ${COLORS.green};
  height: 62rem;
`

const SSalesImage = styled(Image)`
  width: 50.25rem;
  height: 33.75rem; 
  cursor: pointer;
  border-radius: 0.375rem;
  &:hover{
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
  }
  
`

const SLogoImage = styled(Image)`
  width: 28.875rem;
  height: 8.75rem;
  cursor: pointer;
`
const SDescription = styled.p`
  width: 50rem;
  text-align: center;
  font-family: ${nunito.style.fontFamily};
  font-size: 1.25rem; 
`

export default IndexPage
