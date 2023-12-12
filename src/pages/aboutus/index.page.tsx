import React, { ReactElement } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

const AboutUs = () => {
  return (
    <div>AboutUs</div>
  )
}
AboutUs.getLayout = (page: ReactElement) => {
    return <AppLayout title={''}>{page}</AppLayout>
  }

export default AboutUs