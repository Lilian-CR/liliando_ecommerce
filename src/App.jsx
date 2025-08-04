import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useCart } from "./context/CartContext";

function App() {
  const { cartItems, addToCart } = useCart();

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/products" element={<Products onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div className="text-center p-8 text-gray-600">404 – Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
