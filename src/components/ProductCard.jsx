function ProductCard({ image, name, brand, price, onClick, onAddToCart }) {
  if (!image || !name || price == null) return null; 

  return (
    <div
      className="bg-white p-4 rounded shadow text-center cursor-pointer hover:shadow-lg transition w-full max-w-xs mx-auto"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="mb-2 mx-auto h-48 sm:h-56 md:h-64 w-full object-contain"
      />
      <p className="text-sm font-semibold">{name}</p>
      {brand && <p className="text-xs text-gray-500">{brand}</p>}
      <p className="text-sm font-bold text-primary">€{price}</p>

      {onAddToCart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="mt-2 px-4 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80 hover:text-black transition-colors duration-300"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
