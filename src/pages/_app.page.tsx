import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import growStyleIcon from "../../public/icons/logoGrowStyle.png"
import styled, { createGlobalStyle } from 'styled-components'
import {Nunito, Poppins } from "next/font/google"
import { COLORS } from '../share/colors'
import {ToastCloseButton} from '../share/notifications'
import { ToastContainer } from 'react-toastify'
//import { nunito } from './index.page'
import 'react-toastify/dist/ReactToastify.css';
export const poppins = Poppins({ subsets: ["latin"], weight: ["600"] })
export const nunito = Nunito({ subsets: ["latin"], weight: ["600"] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P,IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return(
    <>
    <Head>
      <title>GrowStyle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href={growStyleIcon.src} type="image/png" />
    </Head>
    {getLayout(<Component {...pageProps}/>)}
    <SToastContainer closeButton={ToastCloseButton} autoClose={3000}/>
    <GlobalStyle/>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: var(--medium);
    font-weight: 600;
    font-family: ${poppins.style.fontFamily};
  }

  p{
    font-family: ${nunito.style.fontFamily};
  }

  a,a:visited{
    text-decoration: none;
  }

  body, html{
    min-height: 100vh;
    height: 100%;
    width: 100%;
  }

  ::-webkit-scrollbar{
    width: 0.75rem;
    position: absolute;
    right: 0.125rem;
  }

  ::-webkit-scrollbar-track{
    border-radius: 0.75rem; 
  }

  ::-webkit-scrollbar-thumb{
    background: #D9D9D9;
    border-radius: 0.75rem; 
    background-clip: padding-box;
    border: 0.188rem solid rgba(0,0,0,0);
  }

  ::-webkit-scrollbar-thumb:hover{
    background: #cfcfcf;
    background-clip: padding-box;
    border: 0.188rem solid rgba(0,0,0,0);
  } 
`

const SToastContainer = styled(ToastContainer)`
  // Reference: https://fkhadra.github.io/react-toastify/how-to-style#override-existing-css-classes
  &.Toastify__toast-container {
    // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;
    
  }

  .Toastify__toast {
    height: fit-content;
    box-shadow: 0px 2px 4px rgba(30, 41, 59, 0.25);
    gap: 0.625rem;
    border-radius: 6px;
    padding: 0.625rem 1rem;
    min-height: unset;
    width: fit-content;
    min-width: 12rem;
    align-items: center;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
    gap: 0.625rem;
    font-family: ${nunito.style.fontFamily};
    font-size: var(--small);
    line-height: 1;
    vertical-align: bottom;
  }

  .Toastify__toast-theme--light {
    background-color: ${COLORS.white};
  }

  .Toastify__toast--info {
    border: 1px solid ${COLORS.gray};
  }

  .Toastify__toast--success {
    border: 1px solid ${COLORS.gray};
  }

  .Toastify__toast--error {
    border: 1px solid ${COLORS.red};
  }

  .Toastify__toast-icon {
    margin-left: 0;
  }`