import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ import context

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCart(); // ✅ use values directly
  const [showMessage, setShowMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      setShowMessage("Your cart is now empty.");
    }
  }, [cartItems]);

  const handleRemove = (index) => {
    const itemName = cartItems[index].name;
    removeFromCart(index); // ✅ using context method
    setShowMessage(`Removed: ${itemName}`);
    setTimeout(() => setShowMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Cart</h1>

      {showMessage && (
        <div className="mb-4 text-primary font-medium text-center sm:text-left">
          {showMessage}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.
          <Link to="/products" className="text-primary underline ml-2">
            Go to All Products →
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item, index) => (
              <li
                key={item.id || index} // ✅ updated to use unique key if available
                className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-primary font-bold">
                      €{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <label htmlFor={`quantity-${index}`}>Qty:</label>
                      <input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(index, parseInt(e.target.value))
                        }
                        className="w-16 px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-sm text-black underline hover:text-primary self-start sm:self-auto"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-lg sm:text-xl font-bold text-center sm:text-left">
            Total Damage: €{total.toFixed(2)}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-start">
            <Link
              to="/products"
              className="text-primary underline hover:text-primary"
            >
              ← Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/50 hover:text-black transition-colors text-center"
            >
              Go to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/50 hover:text-black transition-colors text-center"
            >
              Remove All
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
