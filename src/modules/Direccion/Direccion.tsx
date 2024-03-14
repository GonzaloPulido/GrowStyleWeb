import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import useAuthStore from '../../store/loginStore'
import { fetchUpdateUsuario, fetchUserById } from '../../api/utils/usuariosFunctions'
import { FieldValues, useForm } from 'react-hook-form'
import { customToast } from '../../share/notifications'

const Direccion = () => {
    const {register, formState: {errors}, handleSubmit, getValues} = useForm()
    const usuarioLogueado = useAuthStore.getState().loggedUser
    const checkLogged = useAuthStore.getState().isLogged
    const [loggedUserId, setLoggedUserId] = useState(0)

    useEffect( () => {
        if (checkLogged) {
          const fetchUsuario = async () => {
            try {
              const data = await fetchUserById(usuarioLogueado.id);
              if (data) {
                const userId = data.id
                setLoggedUserId(userId);
              } else {
                console.error('Error: Datos de productos no válidos.');
              }
            } catch (error) {
              console.error('Error fetching productos:', error);
            }
          };
          fetchUsuario();
        }
      }, []);

      const onSubmit = async (data: FieldValues) => {
        try{
            const {direccion,informacion,codigoPostal,ciudad,provincia} = data
            const objetoActualizar = {
                rol: usuarioLogueado.rol,
                nombre: usuarioLogueado.nombre,
                apellidos: usuarioLogueado.apellidos,
                telefono: usuarioLogueado.telefono,
                email: usuarioLogueado.email,
                contrasenya: usuarioLogueado.contrasenya,
                calle: direccion,
                numero: informacion,
                ciudad: ciudad,
                codigo_postal: codigoPostal,
                provincia: provincia,
            }
            fetchUpdateUsuario(loggedUserId,objetoActualizar)
            customToast("Direccion actualizada", {
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
            Direccion de Facturacion
        </SDataTitle>
        <SDataInputs>
            <SBlock1>
                <InputContainer>
                    <SDataInput placeholder='Direccion' defaultValue={usuarioLogueado?.calle}
                    {...register('direccion',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,18}[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}$/,
                            message: "Letras, longitud 3 a 20"
                        },
                    })}
                    />
                    {errors.direccion && <SError>{errors.direccion.message as string}</SError>}
                </InputContainer>
                <InputContainer>
                    <SDataInput placeholder='Mas informacion' defaultValue={usuarioLogueado?.numero}
                    {...register('informacion',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]{1,10}$/,
                            message: "Numeros, letras o º"
                        },
                    })}
                    />
                    {errors.informacion && <SError>{errors.informacion.message as string}</SError>}
                </InputContainer>
            </SBlock1>
            <SBlock2>
                <InputContainer>
                    <SDataInput placeholder='Codigo Postal' defaultValue={usuarioLogueado?.codigo_postal}
                    {...register('codigoPostal',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^\d{5}$/,
                            message: "Longitud 5"
                        },
                    })}
                    />
                    {errors.codigoPostal && <SError>{errors.codigoPostal.message as string}</SError>}
                </InputContainer>
                <InputContainer>
                    <SDataInput placeholder='Ciudad' defaultValue={usuarioLogueado?.ciudad}
                    {...register('ciudad',{
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,18}[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}$/,
                            message: "Letras, longitud 3 a 20"
                        },
                    })}
                    />
                    {errors.ciudad && <SError>{errors.ciudad.message as string}</SError>}
                </InputContainer>
            </SBlock2>
            <SBlock3>
                <InputContainer>
                    <SDataInput placeholder='Provincia' defaultValue={usuarioLogueado?.provincia} className='last'
                        {...register('provincia',{
                            required: "Este campo es obligatorio",
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,18}[a-zA-ZáéíóúÁÉÍÓÚüÜ]{1}$/,
                                message: "Letras, longitud 3 a 20"
                            },
                        })}
                        />
                        {errors.provincia && <SError>{errors.provincia.message as string}</SError>}
                </InputContainer>
            </SBlock3>
        </SDataInputs>
        <SButtons>
            <SUpdateButton onClick={handleSubmit(onSubmit)}>Actualizar Direccion</SUpdateButton>
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

const SError = styled.span`
    height: 30px;
    color: ${COLORS.darkRed};
    font-size: 15px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column; 
`
export default Direccion