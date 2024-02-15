import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'

const Cuenta = () => {
  return (
    <SData>
        <SDataTitle>
            Datos Personales
        </SDataTitle>
        <SDataInputs>
            <SBlock1>
                <SDataInput placeholder='Nombre'/>
                <SDataInput placeholder='Apellidos'/>
            </SBlock1>
            <SBlock2>
                <SDataInput placeholder='Telefono'/>
                <SDataInput placeholder='Email'/>
            </SBlock2>
            <SDataInput placeholder='Password' className='last'/>
        </SDataInputs>
        <SButtons>
            <SUpdateButton>Actualizar Cuenta</SUpdateButton>
            <SDeleteButton>Eliminar Cuenta</SDeleteButton>
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

const SButtons = styled.div`
    display: flex;
    gap: 60px;
    justify-content: center;
    margin-top: 20px;
    @media (max-width: 1180px) {
        flex-direction: column;
        gap: 30px;
    }
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
    color: ${COLORS.white};
    background-color: ${COLORS.darkGreen};
`
export default Cuenta