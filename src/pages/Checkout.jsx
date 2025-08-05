import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; 

function Checkout({ cartItems = [] }) {
  const [name, setName] = useState(localStorage.getItem("checkoutName") || "");
  const [email, setEmail] = useState(localStorage.getItem("checkoutEmail") || "");
  const [street, setStreet] = useState(localStorage.getItem("checkoutStreet") || "");
  const [zip, setZip] = useState(localStorage.getItem("checkoutZip") || "");
  const [country, setCountry] = useState(localStorage.getItem("checkoutCountry") || "");
  const [payment, setPayment] = useState(localStorage.getItem("checkoutPayment") || "");
  const [showModal, setShowModal] = useState(false);

  const { cartItems: items, clearCart } = useCart();

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    localStorage.setItem("checkoutName", name);
    localStorage.setItem("checkoutEmail", email);
    localStorage.setItem("checkoutStreet", street);
    localStorage.setItem("checkoutZip", zip);
    localStorage.setItem("checkoutCountry", country);
    localStorage.setItem("checkoutPayment", payment);

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setName("");
    setEmail("");
    setStreet("");
    setZip("");
    setCountry("");
    setPayment("");

    // ✅ Clear only specific items from localStorage
    localStorage.removeItem("liliando_cart");
    localStorage.removeItem("checkoutName");
    localStorage.removeItem("checkoutEmail");
    localStorage.removeItem("checkoutStreet");
    localStorage.removeItem("checkoutZip");
    localStorage.removeItem("checkoutCountry");
    localStorage.removeItem("checkoutPayment");

    // ✅ Clear cart from context too
    clearCart();
  };

  return (
    <div className="min-h-screen bg-stone-100 text-primary py-12 px-4">
      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="max-w-lg mx-auto mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Cart Summary</h3>
          <ul className="text-sm space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                {item.name} – {item.quantity} × €{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checkout Form */}
      <form
        onSubmit={handlePlaceOrder}
        className="max-w-lg mx-auto space-y-4 bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Checkout</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        {/* ZIP + Country in 1 row on larger screens */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div className="text-sm font-semibold mt-2">Payment Method</div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={payment === "credit"}
              onChange={(e) => setPayment(e.target.value)}
              required
            />
            Credit Card
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="debit"
              checked={payment === "debit"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Debit
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={payment === "paypal"}
              onChange={(e) => setPayment(e.target.value)}
            />
            PayPal
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded w-full"
        >
          Place Order
        </button>
      </form>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl text-center">
            <h2 className="text-xl font-bold mb-2 text-primary">
              Thanks for testing, {name.trim()}!
            </h2>
            <p className="text-sm mb-4">
              This is just a test page. No real orders will be placed. But if you really urge to spend some money, I can share my PayPal address.
            </p>
            <button
              onClick={handleModalClose}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 hover:text-black transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
