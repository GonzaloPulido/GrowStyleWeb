import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const AtencionCliente = () => {
  return (
    <div>AtencionCliente</div>
  )
}
AtencionCliente.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default AtencionCliente