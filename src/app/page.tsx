"use client"

import styles from './page.module.css'
import { FilterProducts } from './components/filter-products'
import { ProductsList } from './components/products-list'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}> 
        <main className={styles.main}>
          <FilterProducts/>
          <ProductsList/>
      </main>
    </QueryClientProvider>
  )
}
