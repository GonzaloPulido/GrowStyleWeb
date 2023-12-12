import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

interface AppLayoutProps{
    children: React.ReactNode
    title: string
    
}


const AppLayout: React.FC<AppLayoutProps> = ({children, title}) => {
  return (
    <SAppContainer>
        <Header/>
          {children}
        <Footer/>
    </SAppContainer>
  )
}

const SAppContainer = styled.div`
    display: flex;
    flex-direction: column; 
    min-height: 100vh;
    width: 100%;
    background-color: ${COLORS.backgroundWhite};
`

export default AppLayout