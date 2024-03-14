import dynamic from "next/dynamic"
import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import close from "../../../public/icons/closeIcon.svg"
import router from "next/router"
import openEye from "../../../public/icons/openEyeIcon.svg"
import closedEye from "../../../public/icons/closedEyeIcon.svg"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { customToast } from "../../share/notifications"
import { fetchAllUsuarios, fetchCreateUsuario, fetchUserById } from "../../api/utils/usuariosFunctions"
import useAuthStore from "../../store/loginStore"


const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface RegisterProps {
    isActive: boolean,
    onClose: () => void,
    onCloseLogin: () => void
}

const Login: React.FC<RegisterProps> = ({onClose, isActive, onCloseLogin}) => {
    const [visiblePassword, setvisiblePassword] = useState(false)
    const {register, formState: {errors}, handleSubmit, getValues} = useForm()
    const [errorAlertShown, setErrorAlertShown] = useState(false)

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
        try {
            const usuarios = await fetchAllUsuarios()
            const {nombre,apellidos,telefono,email,contrasenya} = data
            const emailEnUso = usuarios?.some((usuario: any) => usuario.email === email);
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
            }else {
                const myUser = {nombre: nombre, apellidos: apellidos, telefono:telefono, email:email, contrasenya:contrasenya}
                const createdUserId = await fetchCreateUsuario(myUser)
                const createdUser = await fetchUserById(createdUserId?.id)
                if (createdUser){
                    useAuthStore.getState().login(createdUser);
                }
                
                customToast(`Bienvenido ${myUser.nombre}`, {
                    type: "success",
                    position: "top-left",
                    autoClose: 3000,
                    theme: "colored",
                });
                onCloseLogin()
                onClose()
                router.push("/")
            }
        } catch (error) {
            console.log("Error");
        }
    }

    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="register">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={() => {onClose(); onCloseLogin() }}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Registrate</STitle>
                            <SDescription>Regístrate y no te pierdas ninguna promoción</SDescription>
                            <SForm>
                                <InputContainer>
                                    <SInput type="text" placeholder="Nombre" autoComplete="off"
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
                                    <SInput type="text" placeholder="Apellidos" autoComplete="off"
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
                                <InputContainer>
                                    <SInput type="text" placeholder="Telefono" autoComplete="off"
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
                                    <SInput type='text' placeholder="Email" autoComplete="off"
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
                                <InputContainer>
                                    <SInput type={visiblePassword ? 'text' : 'password'} placeholder="Contraseña" autoComplete="off"
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
                                <InputContainer>
                                    <SInput type={visiblePassword ? 'text' : 'password'} placeholder="Repetir Contraseña" autoComplete="off"
                                    {...register('checkPassword', {
                                        required: "Este campo es obligatorio",
                                        validate: value => value === getValues('contrasenya') || "Las contraseñas no coinciden"
                                    })}
                                    />
                                    {errors.checkPassword && <SError>{errors.checkPassword.message as string}</SError>}
                                    <SPasswordToggle src={visiblePassword ? openEye : closedEye} alt="" onClick={() => setvisiblePassword(!visiblePassword)}/>
                                </InputContainer>
                            </SForm>
                            <SButton onClick={handleSubmit(onSubmit)}>Crear Cuenta</SButton>
                        </SPopUpContainer>
                    </SShader>
                </DynamicPortal>
            )}
        </>
    )
}

const SShader = styled.div`
    width: 100%;
    height: 100%;
    //background-color: #00000077;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10000;
    top: 0;
`

const SPopUpContainer = styled.div`
    width: 30.5rem;
    height: 52rem;
    background-color: ${COLORS.backgroundWhite};
    border-bottom-left-radius: 0.375rem;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    display: inline-flex;
    z-index: 2000;
    position: absolute;
    top: 0;
    right: 0;
    border-left: 0.125rem solid ${COLORS.black};
    border-bottom: 0.125rem solid ${COLORS.black};
    padding-top: 1.25rem;
    padding-bottom: 1.875rem;
`

const SCloseButton = styled.div`
    position: absolute;
    margin-left: 0.75rem;
    cursor: pointer;
    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
    }
`

const SCloseImage = styled(Image)`
    width: 2.5rem;
    height: 2.5rem;
`

const STitle = styled.h2`
    width: 100%;
    font-size: 2.625rem;
    text-align: center;
`

const SDescription = styled.h3`
    text-align: center; 
    width: 25rem;
    align-self: center;
`

const SForm = styled.form`
    width: 25rem;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 2.125rem;
`

const SInput = styled.input`
    font-size: 1.25rem;
    height: 3rem;
    border: 0;
    border-bottom: 0.063rem solid ${COLORS.black};
    background-color: ${COLORS.backgroundWhite};
    &:focus-visible{
        outline: none;
    }
`

const SPasswordToggle = styled(Image)`
    width: 1.875rem;
    height: 1.875rem;
    position: absolute;
    right: 0;
    top: 245px;
    margin-top: 25.625rem;
    margin-right: 4.063rem;
    cursor: pointer;
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

const SError = styled.span`
    height: 0px;
    color: ${COLORS.darkRed};
    font-size: 15px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column; 
`

export default Login