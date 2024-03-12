import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import useAuthStore from '../../store/loginStore'

const Direccion = () => {
    const usuarioLogueado = useAuthStore.getState().loggedUser


  return (
    <SData>
        <SDataTitle>
            Direccion de Facturacion
        </SDataTitle>
        <SDataInputs>
            <SBlock1>
                <SDataInput placeholder='Direccion' defaultValue={usuarioLogueado?.calle}/>
                <SDataInput placeholder='Mas informacion' defaultValue={usuarioLogueado?.numero}/>
            </SBlock1>
            <SBlock2>
                <SDataInput placeholder='Codigo Postal' defaultValue={usuarioLogueado?.codigo_postal}/>
                <SDataInput placeholder='Ciudad' defaultValue={usuarioLogueado?.ciudad}/>
            </SBlock2>
            <SBlock3>
                <SDataInput placeholder='Provincia' defaultValue={usuarioLogueado?.provincia} className='last'/>
            </SBlock3>
        </SDataInputs>
        <SButtons>
            <SUpdateButton>Actualizar Direccion</SUpdateButton>
        </SButtons>
    </SData>
  )
}

const SData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1180px) {
    margin: auto;
  }
`

const SDataTitle = styled.div`
  font-size: 25px;
  text-decoration: underline;
  @media (max-width: 1180px) {
    text-align: center;
  }
`

const SDataInputs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SDataInput = styled.input`
    width: 350px;
    font-size: 1.25rem;
    height: 4rem;
    border: 0;
    border-bottom: 0.063rem solid ${COLORS.black};
    background-color: ${COLORS.green};
    &:focus-visible{
        outline: none;
    }
    &.last{
        align-self: center;
    }
    @media (max-width: 1180px) {
        &.last{
            align-self: flex-start;
        }
    }
`

const SBlock1 = styled.div`
    display: flex;
    gap: 15px;
    @media (max-width: 1180px) {
    flex-direction: column;
    }
`

const SBlock2 = styled.div`
    display: flex;
    gap: 15px;
    @media (max-width: 1180px) {
    flex-direction: column;
  }
`

const SBlock3 = styled.div`
    margin: auto;
    @media (max-width: 1180px) {
        flex-direction: column;
    }
`

const SButtons = styled.div`
    display: flex;
    gap: 60px;
    justify-content: center;
    margin-top: 20px;
`

const SUpdateButton = styled.button`
    width: 350px;
    border: 2px solid  ${COLORS.black};
    padding: 5px;
    font-size: 25px;
    cursor: pointer;
    color: ${COLORS.white};
    background-color: ${COLORS.darkGreen};
`

const SDeleteButton = styled.button`
    width: 350px;
    border: 2px solid  ${COLORS.black};
    padding: 5px;
    font-size: 25px;
    cursor: pointer;
`
export default Direccion