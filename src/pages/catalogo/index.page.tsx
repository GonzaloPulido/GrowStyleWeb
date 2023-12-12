import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const Catalogo = () => {
  return (
    <div>Catalogo</div>
  )
}
Catalogo.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Catalogo