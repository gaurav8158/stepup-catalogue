import Footer from '@/components/footer'
import Header from '@/components/header'
import Layout from '@/components/layout'
import ProductGrid from '@/components/ProductGrid'
import React, { Suspense } from 'react'

const page = () => {
  return (

    <div className='bg-white pb-12 sm:pb-0'>
      <Header />
      <Suspense>
        <ProductGrid /></Suspense>
      <Footer />
    </div>

  )
}

export default page