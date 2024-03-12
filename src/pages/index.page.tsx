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
import videoGrow from '../../public/video/video.mp4'

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
    <SMain>
      <SVideoContainer>
        <SVideo autoPlay muted loop>
          <SSource src={videoGrow} type='video/mp4'/>
        </SVideo>
        <SLogoImage src={logo.src} alt='' width="0" height="0" onClick={() => router.push("/")}/>
      </SVideoContainer>
      {/* <SSalesImage src={sales.src} alt='' width="0" height="0" onClick={() => router.push("/catalogo")}/> */}
      
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
  justify-content: space-evenly;
  align-items: center; 
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  padding-bottom: 1.875rem;
  background-color: ${COLORS.green};
  height: 62rem;
  @media (max-width: 950px) {
      height: 45rem;
    }
`


const SLogoImage = styled(Image)`
  margin: auto;
  width: 28.875rem;
  height: 8.75rem;
  margin-top: -55px;
  cursor: pointer;
    @media (max-width: 950px) {
      width: 21.875rem;
      height: 5.75rem;
    }
    @media (max-width: 950px) {
      width: 18.875rem;
      height: 5.75rem;
    }
`

const SDescription = styled.p`
  width: 50rem;
  text-align: center;
  font-family: ${nunito.style.fontFamily};
  font-size: 1.25rem;
    @media (max-width: 900px) {
        width: 40rem;
    } 
    @media (max-width: 700px) {
        width: 30rem;
    }
    @media (max-width: 550px) {
        width: 25rem;
    }
`
const SVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  @media (max-width: 1550px) {
    width: 1000px;
    height: 563px;
  }
  @media (max-width: 1350px) {
    width: 1000px;
    height: 563px;
  }
  @media (max-width: 1050px) {
    width: 800px;
    height: 450px;
  }
  @media (max-width: 950px) {
    width: 800px;
    height: 515px;
  }
  @media (max-width: 850px) {
    width: 650px;
    height: 430px;
  }
  @media (max-width: 700px) {
    width: 500px;
    height: 342px;
  }
  @media (max-width: 550px) {
    width: 450px;
    height: 315px;
  }
`;

// Estilo para el video
const SVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const SSource = styled.source`
  
`

export default IndexPage
