import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setSearchTerm(search);
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      product.category === filter ||
      product.brand === filter;

    return matchesSearch && matchesFilter;
  });

  const uniqueFilters = [
    "all",
    ...new Set(products.map((p) => p.brand).concat(products.map((p) => p.category))),
  ];

  return (
    <div className="min-h-screen bg-white text-primary px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          {uniqueFilters.map((f) => (
            <option key={f} value={f}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                brand={product.brand}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-primary mt-10">
          No products found for <strong>“{searchTerm || filter}”</strong>. Try a different keyword.
        </div>
      )}
    </div>
  );
}

export default Products;
