import { useRef, useState } from "react";
import SkaterGirl1 from "../images/skater-girl-01.jpg";
import SkaterGirl2 from "../images/skater-girl-02.jpeg";
import AboutPreview from "../images/about-preview.jpg";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Footer from "../components/Footer";

function Home({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categorySections = [
    { id: "accessories", title: "ACCESSORIES", bg: "bg-primary/50" },
    { id: "clothing", title: "CLOTHING", bg: "bg-stone-300" },
    { id: "shoes", title: "SHOES", bg: "bg-primary/90" },
  ];

  const scrollRefs = useRef({});

  const scroll = (id, direction) => {
    const container = scrollRefs.current[id];
    if (container) {
      container.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Welcome Section */}
      <section
        id="home"
        className="scroll-mt-24 py-6 bg-primary text-black px-4 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0"
      >
        <div className="md:col-span-1 text-center md:text-left md:px-12 lg:px-32">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to LILIANDO</h1>
          <p className="text-lg text-white">Diverse. Ethical. Bold.</p>
          <p className="text-lg text-white">Your Street Wear.</p>
          <p className="text-lg text-white">Alternative Fashion Universe.</p>
          <a
            href="/products"
            className="inline-block mt-6 text-primary font-bold bg-black px-5 py-2 rounded hover:bg-white hover:text-black transition-colors duration-200"
          >
            Shop Now <span className="text-lg ml-1">→</span>
          </a>
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 md:gap-0">
          <img
            src={SkaterGirl1}
            alt="Skater Girl 01"
            className="aspect-[3/4] shadow-lg w-full sm:w-1/2 object-cover"
          />
          <img
            src={SkaterGirl2}
            alt="Skater Girl 02"
            className="aspect-[3/4] shadow-lg w-full sm:w-1/2 object-cover"
          />
        </div>
      </section>

      <div className="h-1 bg-white/30" />

      {/* Zalando-style Product Sections */}
      {categorySections.map(({ id, title, bg }) => (
        <div key={id}>
          <section id={id} className={`scroll-mt-24 py-8 px-4 text-black ${bg}`}>
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

            <div className="relative">
              {/* Left Arrow */}
              <button
                aria-label="Scroll left"
                onClick={() => scroll(id, "left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 items-center justify-center shadow hover:bg-primary hover:text-white transition"
              >
                ←
              </button>

              {/* Product Row */}
              <div
                ref={(el) => (scrollRefs.current[id] = el)}
                className="flex gap-4 overflow-x-auto pb-4 px-6 sm:px-10 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              >
                {products
                  .filter((product) => product.category === id)
                  .map((product) => (
                    <div key={product.id} className="flex-none w-[260px] snap-start">
                      <ProductCard
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        brand={product.brand}
                        onClick={() => setSelectedProduct(product)}
                      />
                    </div>
                  ))}
              </div>

              {/* Right Arrow */}
              <button
                aria-label="Scroll right"
                onClick={() => scroll(id, "right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 items-center justify-center shadow hover:bg-primary hover:text-white transition"
              >
                →
              </button>
            </div>
          </section>
          <div className="h-1 bg-white/30" />
        </div>
      ))}

      {/* About */}
      <section id="about" className="scroll-mt-24 py-8 px-4 bg-gray-100 text-primary">
        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-left md:ml-32">ABOUT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-6xl mx-auto">
          <div className="text-justify md:pl-12 px-2 md:px-0">
            <p className="leading-relaxed text-sm sm:text-base">
              <strong>LILIANDO</strong> is your indie, alternative, and punk-rock-rooted gateway to ethical fashion.
              Born from rebellion against fast fashion, LILIANDO celebrates diversity, attitude, and timeless streetwear aesthetics — powered by brands like{" "}
              <span className="font-semibold">Dickies</span>,{" "}
              <span className="font-semibold">Hell Bunny</span> and{" "}
              <span className="font-semibold">Vans</span>.
              <br /><br />
              This project is the continuation of Lilian Rodrigues’{" "}
              <a
                href="https://codepen.io/Lilian-Rodrigues/pen/XWQGJbB"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                first-ever HTML/CSS website
              </a>
              , built in June 2024 at ReDI School. It now evolves into a modern, React-powered experience.
              <br /><br />
              Built with <span className="font-semibold">React</span>,{" "}
              <span className="font-semibold">Tailwind CSS</span>, and{" "}
              <span className="font-semibold">Vite</span> — LILIANDO is more than code. It’s design. It’s growth. It’s boldness.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={AboutPreview}
              alt="About Me"
              className="shadow-md w-full max-w-[300px] sm:max-w-xs h-auto object-cover rounded"
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      <Footer />
    </>
  );
}

export default Home;
