import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import useAuthStore from '../../store/loginStore'
import { FieldValues, useForm } from 'react-hook-form'
import { getUserById } from '../../api/services/usuariosServices'

const Cuenta = () => {
    const {register, formState: {errors}, handleSubmit, getValues} = useForm()
    const usuarioLogueado = useAuthStore.getState().loggedUser
    const onSubmit = async (data: FieldValues) => {
        
    } // Siguiente trabajo
  return (
    <SData>
        <SDataTitle>
            Datos Personales
        </SDataTitle>
        <SDataInputs>
            <SBlock1>
                <SDataInput placeholder='Nombre' defaultValue={usuarioLogueado?.nombre}
                {...register('nombre',{
                    required: "Este campo es obligatorio",
                    pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                        message: "Letras, longitud 3 a 15"
                    },
                })}
                />
                {errors.nombre && <SError>{errors.nombre.message as string}</SError>}
                <SDataInput placeholder='Apellidos' defaultValue={usuarioLogueado?.apellidos}
                {...register('apellidos',{
                    required: "Este campo es obligatorio",
                    pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                        message: "Letras, longitud 3 a 15"
                    },
                })}
                />
                {errors.apellidos && <SError>{errors.apellidos.message as string}</SError>}  
            </SBlock1>
            <SBlock2>
                <SDataInput placeholder='Telefono' defaultValue={usuarioLogueado?.telefono}
                {...register('telefono',{
                    required: "Este campo es obligatorio",
                    pattern: {
                        value: /^\+?[0-9\s-]+$/ ,
                        message: "Formato de telefono no valido"
                    },
                })}
                />
                {errors.telefono && <SError>{errors.telefono.message as string}</SError>} 
                <SDataInput placeholder='Email' defaultValue={usuarioLogueado?.email}
                {...register('email',{
                    required: "Este campo es obligatorio",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Formato de email incorrecto"
                    },
                })}
                />
                {errors.email && <SError>{errors.email.message as string}</SError>}
            </SBlock2>
            <SBlock3>
                <SDataInput type='text' defaultValue={usuarioLogueado?.contrasenya} placeholder="Contraseña" autoComplete="off" className='last'
                {...register('contrasenya',{
                    required: "Este campo es obligatorio",
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/,
                        message: "Minus. y mayus. con simbolos y longitud 5 a 10"
                    },
                })}
                />
                {errors.contrasenya && <SError>{errors.contrasenya.message as string}</SError>}
            </SBlock3>
            
        </SDataInputs>
        <SButtons>
            <SUpdateButton onClick={handleSubmit(onSubmit)}>Actualizar Cuenta</SUpdateButton>
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
const SBlock3 = styled.div`
    display: flex;
    gap: 15px;
    margin: auto;
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

const SError = styled.span`
    height: 0px;
    color: ${COLORS.darkRed};
    font-size: 15px;
`
export default Cuenta