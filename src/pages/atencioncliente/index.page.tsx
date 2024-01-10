import React, { ReactElement, useEffect } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import { FieldValues, useForm } from 'react-hook-form'
import { customToast } from '../../share/notifications'
import router from 'next/router'

const AtencionCliente = () => {
  const {register, formState: {errors}, handleSubmit, getValues} = useForm()

  useEffect(() => {
      if (errors.nombre != null || errors.apellidos != null || errors.email != null || 
          errors.comentario != null) {
          customToast("Credenciales incorrectas", {
              type: "error",
              position: "top-left",
              //toastId: "" 
              autoClose: 3000,
              theme: "colored",
          })
      }

  }, [errors.nombre, errors.apellidos, errors.email, errors.comentario])

  const redirect = () => {
    router.push("/")
  }

  const onSubmit = (data: FieldValues) => {
    customToast("Mensaje enviado correctamente", {
      type: "success",
      position: "top-center",
      //toastId: "" 
      autoClose: 3000,
      theme: "colored",
    })

    setTimeout(redirect, 3000);

    console.log(data);
  }


  return (
    <SContactoContainer>
      <SUpContainer>
        <STitle>Contacto</STitle>
        <SDescription>Dejanos un mensaje y te leeremos lo antes posible</SDescription>
      </SUpContainer>
      <SForm>
        <SBlock1>
          <SInput type='text' placeholder="Nombre" autoComplete="off"
          {...register('nombre',{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                message: "Formato de nombre incorrecto"
              },
          })}
          />
          <SInput type='text' placeholder="Apellidos" autoComplete="off"
          {...register('apellidos',{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/,
                message: "Formato de apellidos incorrecto"
              },
          })}
          />  
        </SBlock1>
        
        <SInput type='text' placeholder="Email" autoComplete="off"
        {...register('email',{
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Tu email no es correcto"
            },
        })}
        />  
        <STextArea
        id="nombre"
        placeholder="Escribe aqui tu incidencia"
        autoComplete="off"
        {...register('comentario', {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^(?:(?![ ]{2,})[a-zA-Z0-9.,; ])*(?:[.](?![. ])|[;](?![; ])|[ ](?![ ]|$))*$/,
            message: "Formato de comentario no válido",
          },
        })}
        rows={7}
        cols={50}
      />
    </SForm>
    <SButton onClick={handleSubmit(onSubmit)}>Enviar</SButton>
    </SContactoContainer>
  )
}

const SContactoContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 1.875rem;
  background-color: ${COLORS.green};
  height: 50rem;
`

const SUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const STitle = styled.h1`
  font-size: 40px;
  color: ${COLORS.black};
`

const SDescription = styled.h2`
  font-size: 20px;
  color: ${COLORS.black};
`

const SForm = styled.form`
  width: 50rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.125rem;
  margin-bottom: 40px;
`

const SInput = styled.input`
  font-size: 1.25rem;
  height: 4rem;
  border: 0;
  border-bottom: 0.063rem solid ${COLORS.black};
  background-color: ${COLORS.green};
  &:focus-visible{
      outline: none;
  }
`

const SBlock1 = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`
const SButton = styled.button`
  font-size: 1.25rem;
  height: 2.5rem;
  color: ${COLORS.white};
  background-color: ${COLORS.darkGreen};
  border: 2px solid ${COLORS.black};
  align-self: center;
  width: 25rem;
  cursor: pointer;
`

const STextArea = styled.textarea`
  font-size: 1.25rem;
  //height: 4rem;
  border: 0;
  border-bottom: 0.063rem solid ${COLORS.black};
  background-color: ${COLORS.green};
  &:focus-visible{
      outline: none;
  }
  resize: none;
`


AtencionCliente.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default AtencionCliente