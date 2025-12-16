import type { Product } from "../types/Product";
import '../styles/product-card.css'

interface Props {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  return (
    <div className="product-card" onClick={onClick}>
      <img className="product-card__img" src={product.image} alt={product.title} />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">{product.price} ₽</p>
    </div>
  );
}
