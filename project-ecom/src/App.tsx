import './App.css'
import { products } from "./data/products.ts";
import { ProductCard } from './components/ProductCard'

export default function App() {
  return (
    <div className="container">
      <div className="products-grid">
        {products.map((p)=> (
          <ProductCard key={p.id} product={p}/>
        ))
        }
      </div>
    </div>
  )
}

