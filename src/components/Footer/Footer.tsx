import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import logoGrowStyle from '../../../public/icons/bigLogoGrowStyle.png'
import instagram from '../../../public/icons/instagram.svg'
import twitter from '../../../public/icons/twitter.svg'
import tiktok from '../../../public/icons/tiktok.svg'
import {Nunito } from "next/font/google"
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })

const Footer = () => {
    
  return (
    <SFooter>
        <SFooterFirstContainer>
            <SSocialMedia>
                <SSocialMediaImage src={logoGrowStyle.src} alt='' width="0" height="0"/>
                <SLogos>
                    <SLogoSocial src={instagram} alt=''/>
                    <SLogoSocial src={twitter} alt=''/>
                    <SLogoSocial src={tiktok} alt=''/>
                </SLogos>
            </SSocialMedia>
            <SLegalDocuments>
                <STitle>Documentos legales</STitle>
                <SHref>Aviso legal</SHref>
                <SHref>Politica de privacidad</SHref>
                <SHref>Terminos</SHref>
            </SLegalDocuments>
            <SSupport>
                <STitle>Soporte</STitle>
                <SHref>Tarjeta regalo</SHref>
                <SHref>Sobre nosotros</SHref>
                <SHref>Atencion al cliente</SHref>
            </SSupport>
        </SFooterFirstContainer>
        <SFooterSecondContainer>
            GrowStyle©
        </SFooterSecondContainer>
    </SFooter>
  )
}

const SFooter = styled.footer`
    width: 100%;
    background: ${COLORS.white};
    background: linear-gradient(0deg, ${COLORS.white} 0%, ${COLORS.green} 100%);
`

const SFooterFirstContainer = styled.div`
    //border-top: 0.125rem solid ${COLORS.black};
    padding: 1.875rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const SFooterSecondContainer = styled.div`
    width: 100%;
    height: 2.5rem;
    display:flex;
    justify-content: center;
    align-items: center;
`

const SSocialMedia = styled.div`
    width: 18.75rem;
    height: 9.375rem;
    display:flex; 
    flex-direction: column;
    justify-content:space-between;
    align-items: center;
`

const SSocialMediaImage = styled(Image)`
    width: 11.875rem;
    height: 3.75rem;
`

const SLogos = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    width: 100%;
    
`

const SLogoSocial = styled(Image)`
    width: 2.188rem;
    height: 2.188rem;
`

const SLegalDocuments = styled.div`
    width: 18.75rem;
    height: 9.375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const STitle = styled.h2`
    font-size: 1.25rem;
    text-decoration: underline;
`

const SHref = styled.h3`
    font-family: ${nunito.style.fontFamily};
    font-size: 0.875rem;
    cursor: pointer;
`

const SSupport = styled.div`
    width: 18.75rem;
    height: 9.375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export default Footer