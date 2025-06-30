import Layout from '@/components/layout'
import ProductGrid from '@/components/ProductGrid'
import React from 'react'

const page = () => {
  return (
    <Layout>
      <div className='bg-green-50 '>

        <ProductGrid />
      </div>
    </Layout>
  )
}

export default page