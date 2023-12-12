import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const Rebajas = () => {
  return (
    <div>Rebajas</div>
  )
}
Rebajas.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default Rebajas