import Image from "next/image"
import styled from "styled-components"

import {
  CloseButtonProps,
  Id,
  ToastContent,
  ToastOptions,
  TypeOptions,
  toast,
} from "react-toastify"
import toastCloseIcon from "../../public/icons/closeIconToast.svg"
import toastSuccessIcon from "../../public/icons/closedEyeIcon.svg" // Icono no valido (Hay que cambiarlo en caso de necesitar una notificacion succesfull )
import toastErrorIcon from "../../public/icons/ErrorIcon.svg"

type ToastOptionsWithoutType = Omit<ToastOptions<{}>, "type">
interface ToastOptionsWithRequiredType extends ToastOptionsWithoutType {
    type: TypeOptions
}

const SToastCloseIcon = styled(Image)`
    width: 1.5rem;
    height: 1.5rem;
`


const ToastSuccessIcon = styled(Image).attrs({
    alt: "",
    src: toastSuccessIcon,
})`
    width: 1.5rem;
    height: 1.5rem; 
`

const ToastErrorIcon = styled(Image).attrs({
  alt: "",
  src: toastErrorIcon,
})`
    width: 1.5rem;
    height: 1.5rem;  
`
  

export const ToastCloseButton: React.FC<CloseButtonProps> = ({
  closeToast,
}) => <SToastCloseIcon src={toastCloseIcon} alt="" onClick={closeToast} />

export const customToast = <T,>(
  content: ToastContent<T>,
  config: ToastOptionsWithRequiredType,
): Id => {
  const icon =
    config.type === "error" || config.type === "warning" ? (
      <ToastErrorIcon />
    ) : (
      <ToastSuccessIcon />
    )
  return toast<T>(content, {
    icon,
    hideProgressBar: true,
    ...config,
  })
}