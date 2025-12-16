import type { Product } from "../types/Product";
import "../styles/modal.css";
import { useEffect } from "react";

interface Props {
  product: Product;
  onClose: () => void;
}

export function Modal({ product, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-btn" onClick={onClose}>
          <svg
            className="close-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            stroke="#333"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <img className="modal__img" src={product.image} />
        <h2 className="modal__title">{product.title}</h2>
        <p className="modal__description">{product.description}</p>
        <p className="modal__price">{product.price} ₽</p>
        <button className="modal__buy-btn">Купить</button>
      </div>
    </div>
  );
}
