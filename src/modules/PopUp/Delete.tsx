import dynamic from "next/dynamic"
import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import close from "../../../public/icons/closeIcon.svg"
import useAuthStore from "../../store/loginStore"
import { customToast } from "../../share/notifications"
import router from "next/router"
import { fetchDeleteUsuario } from "../../api/utils/usuariosFunctions"

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface DeleteProps {
    isActive: boolean,
    onClose: () => void
}

const Login: React.FC<DeleteProps> = ({onClose, isActive}) => {
    const usuarioLogueado = useAuthStore.getState().loggedUser

    
    const  deleteUser =  async () => {
        await fetchDeleteUsuario(usuarioLogueado.id)
        customToast("Usuario eliminado", {
            type: "success",
            position: "top-left",
            autoClose: 3000,
            theme: "colored",
        })
        useAuthStore.getState().logout()
        setTimeout(() => {
            onClose()
            router.push('/')
        }, 3000);
        
    }

    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="popup">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Borrar Usuario</STitle>
                            <SDescription>¿Estas seguro de borrar tu usuario?</SDescription>
                            <SButtonsContainer>
                                <SButton onClick={onClose}>NO</SButton>
                                <SButton onClick={() => deleteUser()}>SI</SButton>
                            </SButtonsContainer>
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
    width: 28.5rem;
    height: 15rem;
    background-color: ${COLORS.backgroundWhite};
    border-radius: 0.375rem;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    display: inline-flex;
    z-index: 2000;
    position: absolute;
    border: 0.125rem solid ${COLORS.black};
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

const SButtonsContainer = styled.div`
    display: flex;
    margin: auto;
    gap: 20px;
`

const SButton = styled.button`
    font-size: 1.25rem;
    height: 2.5rem;
    color: ${COLORS.white};
    background-color: ${COLORS.darkGreen};
    border: 2px solid ${COLORS.black};
    align-self: center;
    width: 10rem;
    cursor: pointer;
`

export default Login