import "./App.css";
import { fetchProducts } from "./api/mockApi.ts";
import { ProductCard } from "./components/ProductCard";
import { Modal } from "./components/Modal";
import { useEffect, useState } from "react";
import type { Product } from "./types/Product.ts";
import { Loader } from "./components/Loader.tsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Не удалось загрузить товары. Попробуйте позже.");
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProduct) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [selectedProduct]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    alert("Произошла ошибка");
  }

  return (
    <div className="container">
      <input
        className="input-field"
        placeholder="Поиск по названию"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="products-grid">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onClick={() => setSelectedProduct(p)}
          />
        ))}
      </div>

      {filtered.length === 0 && query && (
        <div className="no-products">
          По запросу "{query}" товары не найдены
        </div>
      )}

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
