import { ShoppingBag, Dumbbell } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar({ onOpenCart }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Dumbbell className="text-blue-500" size={32} />
          <span className="text-2xl font-bold tracking-tighter">
            IRON<span className="text-blue-500">STORE</span>
          </span>
        </div>

        {/* Menu (Desktop) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">
            INÍCIO
          </a>
          <a href="#" className="hover:text-white transition-colors">
            SUPLEMENTOS
          </a>
          <a href="#" className="hover:text-white transition-colors">
            VESTUÁRIO
          </a>
          <a href="#" className="hover:text-white transition-colors">
            ACESSÓRIOS
          </a>
        </nav>

        {/* Carrinho */}
        <button
          onClick={onOpenCart}
          className="relative p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <ShoppingBag size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
