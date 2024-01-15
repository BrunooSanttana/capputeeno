"use client"

import styles from './page.module.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterProducts } from './components/filter-products';
import { ProductsList } from './components/products-list';


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
