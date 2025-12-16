import type { Product } from "../types/Product";
import '../App.css'

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">{product.price} ₽</p>
    </div>
  );
}
