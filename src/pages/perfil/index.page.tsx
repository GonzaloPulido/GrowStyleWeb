import React, { ReactElement, useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import profile from '../../../public/icons/profileIcon.svg'
import location from '../../../public/icons/location.svg'
import pedidos from '../../../public/icons/basketIcon.svg'
import fav from '../../../public/icons/heartIcon.svg'
import logout from '../../../public/icons/logout.svg'
import Image from 'next/image'
import Cuenta from '../../modules/Cuenta/Cuenta'
import Direccion from '../../modules/Direccion/Direccion'
import Pedidos from '../../components/Pedidos/Pedidos'
import Favoritos from '../../components/Favoritos/Favoritos'
import router from 'next/router'
import { COLORS } from '../../share/colors'
import useAuthStore from '../../store/loginStore'

const Perfil = () => {
  const [selected, setSelected] = useState(1)
  const checkLogin = useAuthStore.getState().isLogged;
  const usuarioLogueado = useAuthStore.getState().loggedUser
  const userName = usuarioLogueado?.nombre
  console.log(userName);
  console.log(usuarioLogueado);
  
  
  useEffect(() => {
    console.log(checkLogin);
    if (!checkLogin){
      router.push('/')
    }
  }, [])
  
  return (
    <SGeneralContainer>
    <SOptionsContainer>
      <SOptionsDiv>
        <SOptionsTitle>
          Menu de perfil
        </SOptionsTitle>
        <SOptions>
          <SOption onClick={() => setSelected(1)}>
            <SOptionIcon src={profile} alt=''/>
            <SOptionTitle className={selected == 1 ? "selected" : ""}>Mi cuenta</SOptionTitle>
          </SOption>
          <SOption onClick={() => setSelected(2)}>
            <SOptionIcon src={location} alt=''/>
            <SOptionTitle className={selected == 2 ? "selected" : ""}> Mi dirección</SOptionTitle>
          </SOption>
          <SOption onClick={() => setSelected(3)}>
            <SOptionIcon src={pedidos} alt=''/>
            <SOptionTitle className={selected == 3 ? "selected" : ""}>Mis pedidos</SOptionTitle>
          </SOption>
          <SOption onClick={() => setSelected(4)}>
            <SOptionIcon src={fav} alt=''/>
            <SOptionTitle className={selected == 4 ? "selected" : ""}>Favoritos</SOptionTitle>
          </SOption>
          <SOption onClick={() => router.push("/")}>
            <SOptionIcon src={logout} alt=''/>
            <SOptionTitle className={selected == 5 ? "selected" : ""} onClick={() => useAuthStore.getState().logout()}>Cerrar Sesión</SOptionTitle>
          </SOption>
        </SOptions>
      </SOptionsDiv>
    </SOptionsContainer>
    {selected === 1 && <Cuenta/>}
    {selected === 2 && <Direccion/>}
    {selected === 3 && <Pedidos/>}
    {selected === 4 && <Favoritos/>}
    </SGeneralContainer>
  )
}
Perfil.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

const SGeneralContainer = styled.div`
  display: flex;
  gap: 50px;
  padding: 50px;
  padding-top: 150px;
  justify-content: center;
  min-height: 635px;
  background-color: ${COLORS.green};
  @media (max-width: 1180px) {
    flex-direction: column;
    padding-top: 50px;
  }
`
const SOptionsContainer = styled.div`
  @media (max-width: 1180px) {
    margin:auto;
  }
`

const SOptionsTitle = styled.h2`
  font-size: 25px;
  text-decoration: underline;
`

const SOptionsDiv = styled.div`
  
`
const SOptions = styled.div`
  margin-top: 20px; 
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SOption = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
  align-items: center;
  cursor: pointer;
`

const SOptionIcon = styled(Image)`
  width: 25px;
  height: 25px;
`

const SOptionTitle = styled.div`
  font-size: 20px;
  &.selected{
    text-decoration: underline;
  }
`

export default Perfil