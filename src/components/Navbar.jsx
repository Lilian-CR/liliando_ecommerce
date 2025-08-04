import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import StoreLogo from "../images/LILIANDO_store_logo.png";
import { useState } from "react";

function Navbar({ cartCount }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    setMenuOpen(false); // close mobile menu after click
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Accessories", id: "accessories" },
    { label: "Clothing", id: "clothing" },
    { label: "Shoes", id: "shoes" },
    { label: "All Products", href: "/products" },
    { label: "About", id: "about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white text-primary shadow-md">
      <div className="flex justify-between items-center px-4 py-3 md:px-32">
        {/* Logo + Search */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div onClick={(e) => handleScroll(e, "home")} className="cursor-pointer">
            <img
              src={StoreLogo}
              alt="LILIANDO Store Logo"
              className="h-16"
            />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-primary px-4 py-2 w-full max-w-xs hidden sm:block"
          />
        </div>

        {/* Cart + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            aria-label="View cart"
            className="relative cursor-pointer"
          >
            <ShoppingCart size={28} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-wrap justify-center gap-4 font-bold text-sm uppercase px-4 pb-3">
        {menuItems.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `px-2 py-1 rounded transition ${
                    isActive ? "text-primary font-bold underline" : "hover:bg-contrastHover"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="hover:bg-contrastHover px-2 py-1 rounded transition"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 font-bold text-sm uppercase bg-white shadow-inner">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-primary px-4 py-2 w-full"
          />
          {menuItems.map((item) =>
            item.href ? (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-2 py-1 rounded transition ${
                    isActive ? "text-primary font-bold underline" : "hover:bg-contrastHover"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="hover:bg-contrastHover px-2 py-1 rounded transition"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
