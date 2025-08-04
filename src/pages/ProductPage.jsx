import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { useState } from "react";

function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image || ""
  );

  if (!product)
    return (
      <div className="text-center p-8 text-black">
        Sorry! Product not found. Send us a suggestion and we will look into it.
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-primary px-4 py-8 md:px-10 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left - Main Image + Thumbnails */}
        <div className="w-full">
          <div className="aspect-[9/16] max-h-[500px] shadow-md overflow-hidden mx-auto">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x400?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {product.images.map((img) => (
                <img
                  key={img} // ✅ changed from key={i} to key={img}
                  src={img}
                  alt={`Thumbnail`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 aspect-[9/16] object-contain border cursor-pointer p-1 rounded ${
                    selectedImage === img
                      ? "border-primary border-2"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">Brand: {product.brand}</p>
          <p className="text-xl font-semibold text-primary">€{product.price}</p>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-primary/80 hover:text-black text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Add to Cart
          </button>

          <Link
            to="/products"
            className="text-sm text-primary underline hover:text-green-700 mt-4"
          >
            ← Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
