import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const TarjetaRegalo = () => {
  return (
    <div>TarjetaRegalo</div>
  )
}
TarjetaRegalo.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default TarjetaRegalo