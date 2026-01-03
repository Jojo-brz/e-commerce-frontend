import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { CartSidebar } from "./components/CartSidebar";
import { products } from "./data/products";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos"); // <--- Estado da categoria

  // Extrair categorias únicas dos produtos automaticamente
  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  // Filtrar produtos
  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            SUPERE SEUS LIMITES
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Os melhores equipamentos e performance.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
            VER OFERTAS
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        {/* --- ÁREA DE FILTROS (NOVA) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">
            Nossos Produtos
          </h2>

          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Produtos (Filtrados) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensagem se não houver produtos (Opcional, mas boa prática) */}
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 text-center border-t border-slate-800">
        <p>&copy; 2024 IronStore Sports. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
