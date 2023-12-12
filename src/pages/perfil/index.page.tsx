import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const Perfil = () => {
  return (
    <div>Perfil</div>
  )
}
Perfil.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Perfil