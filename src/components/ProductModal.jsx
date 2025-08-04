import { useState } from "react";
import { X } from "lucide-react";

function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-200 shadow-lg max-w-lg w-full relative rounded-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Product details modal" 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-primary transition-colors duration-300 p-2"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(product.images || [product.image]).map((img, i) => (
              <div key={i} className="w-full aspect-[9/16] overflow-hidden">
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-1 font-semibold">Brand: {product.brand}</p>
          <p className="text-lg font-semibold text-primary mb-4">€{product.price}</p>

          <button
            onClick={() => {
              onAddToCart({ ...product, quantity });
              onClose();
            }}
            className="mt-2 px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/80 hover:text-black transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
