import { X, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fundo escuro transparente */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Conteúdo Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Seu Carrinho</h2>
          <button onClick={onClose} className="hover:text-red-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              O carrinho está vazio.
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                  <p className="font-bold text-blue-900">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 h-fit"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-gray-50 border-t">
          <div className="flex justify-between text-xl font-bold mb-4 text-slate-900">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
