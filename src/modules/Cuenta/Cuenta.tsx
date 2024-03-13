import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import useAuthStore from '../../store/loginStore'
import { FieldValues, useForm } from 'react-hook-form'
import { getUserById } from '../../api/services/usuariosServices'
import { fetchAllUsuarios, fetchCreateUsuario, fetchUpdateUsuario } from '../../api/utils/usuariosFunctions'
import { customToast } from '../../share/notifications'
import Delete from '../PopUp/Delete'

const Cuenta = () => {
    const {register, formState: {errors}, handleSubmit, getValues} = useForm()
    const usuarioLogueado = useAuthStore.getState().loggedUser
    const [errorAlertShown, setErrorAlertShown] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)

    useEffect(() => {
        if ((errors.nombre || errors.apellidos || errors.telefono || errors.email || errors.password || errors.checkPassword) &&
            !errorAlertShown) {
            customToast("Credenciales incorrectas", {
                type: "error",
                position: "top-left",
                autoClose: 3000,
                theme: "colored",
            });
            setErrorAlertShown(true);
        } else if (!errors.nombre && !errors.apellidos && !errors.telefono && !errors.email && !errors.password && !errors.checkPassword) {
            setErrorAlertShown(false);
        }
    }, [errors.nombre, errors.apellidos, errors.telefono, errors.email, errors.password, errors.checkPassword, errorAlertShown]);

    const onSubmit = async (data: FieldValues) => {
        try{
            const usuarios = await fetchAllUsuarios()
            const {nombre,apellidos,telefono,email,contrasenya} = data
            const emailEnUso = usuarios?.some((usuario: any) => usuario.email === email);
            if (email != usuarioLogueado?.email) {
                if (emailEnUso) {
                    if (!errorAlertShown) {
                        customToast("Email en uso", {
                            type: "error",
                            position: "top-left",
                            autoClose: 3000,
                            theme: "colored",
                        });
                        setErrorAlertShown(true);
                    } else{
                        setErrorAlertShown(false);
                    }
                }
            }
            const myUser = {rol: usuarioLogueado.rol, nombre: nombre, apellidos: apellidos, telefono:telefono, email:email, contrasenya:contrasenya, 
                calle: usuarioLogueado.calle, numero: usuarioLogueado.numero, ciudad: usuarioLogueado.ciudad, 
                codigo_postal: usuarioLogueado.codigo_postal, provincia: usuarioLogueado.provincia}
            const id = usuarioLogueado?.id
            fetchUpdateUsuario(id, myUser)
            customToast("Usuario Actualizado", {
                type: "success",
                position: "top-left",
                autoClose: 3000,
                theme: "colored",
            });
        }catch (error){
            console.log(error)
        }
    }

  return (
    <SData>
        <SDataTitle>
            Datos Personales
        </SDataTitle>
        <SDataInputs>
            <SBlock1>
                <InputContainer>
                    <SDataInput placeholder='Nombre' defaultValue={usuarioLogueado?.nombre} autoComplete="off"
                    {...register('nombre',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                            message: "Letras, longitud 3 a 15"
                        },
                    })}
                    />
                    {errors.nombre && <SError>{errors.nombre.message as string}</SError>}
                </InputContainer>
                <InputContainer>
                    <SDataInput placeholder='Apellidos' defaultValue={usuarioLogueado?.apellidos} autoComplete="off"
                    {...register('apellidos',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                            message: "Letras, longitud 3 a 15"
                        },
                    })}
                    />
                    {errors.apellidos && <SError>{errors.apellidos.message as string}</SError>}  
                </InputContainer>
            </SBlock1>
            <SBlock2>
                <InputContainer>
                    <SDataInput placeholder='Telefono' defaultValue={usuarioLogueado?.telefono} autoComplete="off"
                    {...register('telefono',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^(?:\d{3}\s?\d{3}\s?\d{3}|34\s?\d{3}\s?\d{3}\s?\d{3})$/,
                            message: "Formato de telefono no valido"
                        },
                    })}
                    />
                    {errors.telefono && <SError>{errors.telefono.message as string}</SError>} 
                </InputContainer>
                <InputContainer>
                    <SDataInput placeholder='Email' defaultValue={usuarioLogueado?.email} autoComplete="off"
                    {...register('email',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Formato de email incorrecto"
                        },
                    })}
                    />
                    {errors.email && <SError>{errors.email.message as string}</SError>}
                </InputContainer>
            </SBlock2>
            <SBlock3>
                <InputContainer>
                    <SDataInput type='text' defaultValue={usuarioLogueado?.contrasenya} placeholder="Contraseña" autoComplete="off" className='last'
                    {...register('contrasenya',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/,
                            message: "Minus. y mayus. con simbolos y longitud minima 5"
                        },
                    })}
                    />
                    {errors.contrasenya && <SError>{errors.contrasenya.message as string}</SError>}
                </InputContainer>
            </SBlock3>
        </SDataInputs>
        <SButtons>
            <SUpdateButton onClick={handleSubmit(onSubmit)}>Actualizar Cuenta</SUpdateButton>
            <SDeleteButton onClick={handleSubmit(() => setDeletePopUp(true))}>Eliminar Cuenta</SDeleteButton>
        </SButtons>
        {(deletePopUp) && (<Delete isActive={deletePopUp} onClose={() => setDeletePopUp(false)}/>)}
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
    height: 30px;
    color: ${COLORS.darkRed};
    font-size: 15px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column; 
`
export default Cuenta