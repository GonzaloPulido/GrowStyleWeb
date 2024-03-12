import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import barsIcon from '../../../public/icons/barsIcon.svg'
import logoGrow from '../../../public/icons/bigLogoGrowStyle.png'
import profileIcon from '../../../public/icons/profileIcon.svg'
import favIcon from '../../../public/icons/heartIcon.svg'
import cartIcon from '../../../public/icons/cartIcon.svg'
import { COLORS } from '../../share/colors'
import router from 'next/router'
import Menu from '../../modules/Menu/Menu'
import Login from '../../modules/Login/Login'
import Favoritos from '../../modules/Favoritos/Favoritos'
import Carrito from '../../modules/Carrito/Carrito'
import useAuthStore from '../../store/loginStore'



const Header = () => {
  const [menu, setMenu] = useState(false)
  const checkLogin = useAuthStore.getState().isLogged;
  // Variables para el icono de perfil
  const [login, setLogin] = useState(false)
  const [favoritos, setFavoritos] = useState(false)
  const [carrito, setCarrito] = useState(false)
  const [profile, setProfile] = useState(false)
  const [logged, setLogged] = useState(false)


  const selectProfileIcon = () => { // Esta funcion comprueba si el usuario esta logueado o si no lo esta, y decide...
    if (logged) {
      setProfile(true)
    } else {
      setLogin(true)
    }
  }

  return (
    <SHeader>
      <SSidebarIcon src={barsIcon} alt='' onClick={() => setMenu(true)}/>
      <SLogoGrowStyle src={logoGrow.src} alt='' width="0" height="0" onClick={() => router.push("/")}/>
      <SRightContainer>
        <SProfileIcon src={profileIcon} alt='' /* onClick={() => selectProfileIcon()} */ onClick={!checkLogin ? () => selectProfileIcon() : () => router.push('/perfil')} />
        <SFavorites src={favIcon} alt=''onClick={() => setFavoritos(true)}/>
        <SCartIcon src={cartIcon} alt='' onClick={() => setCarrito(true)}/>
      </SRightContainer>
      {(menu) && (<Menu isActive={menu} onClose={() => setMenu(false)}/>)}
      {(login) && (<Login isActive={login} onClose={() => setLogin(false)}/>)}
      {(favoritos) && (<Favoritos isActive={favoritos} onClose={() => setFavoritos(false)}/>)}
      {(carrito) && (<Carrito isActive={carrito} onClose={() => setCarrito(false)}/>)}
    </SHeader>
  )
}

const SHeader = styled.header`
  width: 100%;
  height: 4.688rem;
  background: ${COLORS.green};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SSidebarIcon = styled(Image)`
  margin-left: 1.25rem;
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
`

const SLogoGrowStyle = styled(Image)`
  margin-left: 7.625rem;
  width: 11.875rem;
  height: 3.438rem;
  cursor: pointer;

  @media (max-width: 700px) {
    margin-left: 5.625rem;
  }

  @media (max-width: 580px) {
    margin-left: 2.625rem;
  }
`

const SRightContainer = styled.div`
  margin-right: 1.25rem;
  width: 7.5rem;
  display: flex;
  justify-content:space-between;
  gap: 0.013rem;
  
`

const SProfileIcon = styled(Image)`
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
`

const SFavorites = styled(Image)`
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
`

const SCartIcon = styled(Image)`
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
`


export default Header