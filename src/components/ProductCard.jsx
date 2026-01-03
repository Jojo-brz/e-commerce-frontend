import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-slate-900 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-slate-800 font-semibold text-lg truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">Alta performance</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-900">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-slate-900 hover:bg-blue-900 text-white p-2 rounded-full transition-colors flex items-center justify-center"
            title="Adicionar ao Carrinho"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
