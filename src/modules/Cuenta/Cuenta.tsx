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
`

const SDataTitle = styled.div`
  font-size: 25px;
  text-decoration: underline;
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
    background-color: ${COLORS.backgroundWhite};
    &:focus-visible{
        outline: none;
    }
    &.last{
        align-self: center;
    }
`

const SBlock1 = styled.div`
    display: flex;
    gap: 15px;
`

const SBlock2 = styled.div`
    display: flex;
    gap: 15px;
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
`

const SDeleteButton = styled.button`
    width: 350px;
    border: 2px solid  ${COLORS.black};
    padding: 5px;
    font-size: 25px;
    cursor: pointer;
`
export default Cuenta