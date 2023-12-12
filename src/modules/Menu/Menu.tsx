import dynamic from "next/dynamic";
import styled from "styled-components";
import { COLORS } from "../../share/colors";
import Image from "next/image";
import close from "../../../public/icons/closeIcon.svg"
import router from "next/router";
import { useEffect } from "react";

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface MenuProps {
    isActive: boolean,
    onClose: () => void
}

const Menu: React.FC<MenuProps> = ({onClose, isActive}) => {
    
    useEffect(() => {
        router.events.on("routeChangeStart", onClose);
        return () => {
          router.events.off("routeChangeStart", onClose);
        };
      }, [router, onClose]);

    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="menu">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <SOption onClick={() => router.push("/rebajas")}>
                                <SOptionTitle id="first">Rebajas</SOptionTitle>
                            </SOption>
                            <SOption onClick={() => router.push("/catalogo")}>
                                <SOptionTitle>Catálogo</SOptionTitle>
                            </SOption>
                            <SOption onClick={() => router.push("/tarjetaregalo")}>
                                <SOptionTitle>Tarjeta Regalo</SOptionTitle>
                            </SOption>
                            <SOption onClick={() => router.push("/aboutus")}>
                                <SOptionTitle>Sobre nosotros</SOptionTitle>
                            </SOption>
                            <SOption id="last" onClick={() => router.push("/atencioncliente")}>
                                <SOptionTitle>Atencion al cliente</SOptionTitle>
                            </SOption>
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
    width: 32rem;
    height: 32rem;
    background-color: ${COLORS.backgroundWhite};
    border-bottom-right-radius: 0.375rem;
    overflow: hidden;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: inline-flex;
    z-index: 2000;
    position: absolute;
    top: 0;
    left: 0;
    border-right: 0.125rem solid ${COLORS.black};
    border-bottom: 0.125rem solid ${COLORS.black};
    transition: width 0.5s;
`

const SOption = styled.div`
    width: 100%;
    height: 6.375rem;
    border-bottom: 0.188rem solid ${COLORS.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    cursor: pointer; 
    &#last{
        border-bottom: 0;
    }
`

const SOptionTitle = styled.h2`
    font-size: 2.625rem;
    cursor: pointer;
    &#first{
        color: ${COLORS.darkRed};
    }

    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
    }
`

const SCloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1.8rem;
    margin-right: 2rem;
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

export default Menu