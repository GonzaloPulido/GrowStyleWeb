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
import Register from "../Register/Register"
import { fetchAllUsuarios } from "../../api/utils/usuariosFunctions"
import useAuthStore from "../../store/loginStore"

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface LoginProps {
    isActive: boolean,
    onClose: () => void
}

const Login: React.FC<LoginProps> = ({onClose, isActive}) => {
    const [registerPopUp, setRegisterPopUp] = useState(false)
    const [visiblePassword, setvisiblePassword] = useState(false)
    const {register, formState: {errors}, handleSubmit, control} = useForm()
    const [errorAlertShown, setErrorAlertShown] = useState(false)


    useEffect(() => {
        if (errors.email != null || errors.password != null && !errorAlertShown) {
            customToast("Credenciales incorrectas", {
                type: "error",
                position: "top-left",
                //toastId: "", 
                autoClose: 3000,
                theme: "colored",
            })
        } else if (!errors.email && !errors.password ){
            setErrorAlertShown(false);
        }

    }, [errors.email, errors.password])
    

    const onSubmit = async (data: FieldValues) => {
        try {
            const usuarios = await fetchAllUsuarios();
            const { email, contrasenya } = data;
            const usuario = usuarios?.find((usuario: any) => usuario.email === email);
            if (usuario) {
                if (usuario.contrasenya === contrasenya) {
                    useAuthStore.getState().login(usuario);
                    onClose();
                    router.push("/");
                } else {
                    if (!errorAlertShown) {
                        customToast("Email o contraseña incorrectos", {
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
            } else {
                if (!errorAlertShown) {
                    customToast("Email o contraseña incorrectos", {
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
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    }
      
    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="login">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Iniciar sesión</STitle>
                            <SDescription>Regístrate y no te pierdas ninguna promoción, oferta o descuento</SDescription>
                            <SForm>
                                <SInput type='text' placeholder="Email" autoComplete="off"
                                {...register('email',{
                                    required: "Este campo es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Tu email no es correcto"
                                    },
                                })}
                                />
                                {errors.email && <SError>{errors.email.message as string}</SError>}
                                <SInput type={visiblePassword ? 'text' : 'password'} placeholder="Contraseña" autoComplete="off"
                                {...register('contrasenya',{
                                    required: "Este campo es obligatorio",
                                    pattern: {
                                        value: /^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/,
                                        message: "Tu contraseña no es correcta"
                                    },
                                })}
                                />  
                                {errors.contrasenya && <SError>{errors.contrasenya.message as string}</SError>} 
                                <SPasswordToggle src={visiblePassword ? openEye : closedEye} alt="" onClick={() => setvisiblePassword(!visiblePassword)}/>
                            </SForm>
                            <SButtonsContainer>
                                <SButton onClick={handleSubmit(onSubmit)}>Iniciar Sesión</SButton>
                                <SButton onClick={() => {setRegisterPopUp(true)}}>Crear Cuenta</SButton>
                            </SButtonsContainer>
                            
                            {registerPopUp && (<Register onCloseLogin={onClose} isActive={registerPopUp} onClose={() => setRegisterPopUp(false)} />)}
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
    height: 36rem;
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
    height: 4rem;
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
    margin-top: 0.625rem;
    margin-top: 7.625rem;
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

const SButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default Login