import Footer from '@/components/footer'
import Header from '@/components/header'
import Layout from '@/components/layout'
import ProductGrid from '@/components/ProductGrid'
import React from 'react'

const page = () => {
  return (

    <div className='bg-white pb-12 sm:pb-0'>
      <Header />
      <ProductGrid />
      <Footer />
    </div>

  )
}

export default page