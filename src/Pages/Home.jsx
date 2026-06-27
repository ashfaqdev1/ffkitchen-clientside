import React from "react";
import { useSelector, useDispatch } from "react-redux"; // 👈 Added useSelector
import { setNavigate, openDetailModal } from "../Slices/uiSlice";
import { addToCart } from "../Slices/cartSlice";
import ProductCard from "../components/ProductCard";
import { catEmojis, categories } from "../data/products"; // 👈 Removed static products array import
import hero from "@assets/hero.png";

export default function Home() {
  const dispatch = useDispatch();

  // 1. Read API data & network metrics straight from the backend Redux store slice
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Grab the first 4 items from the dynamic database array to show on the feature row
  const featuredProducts = allProducts.slice(0, 4);

  const handleCategoryClick = (catName) => {
    dispatch(setNavigate("products"));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // 2. Render clean loader skeleton if API handshake is pending
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
          fontSize: "18px",
          color: "var(--slate-mid)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔄</div>
        Loading the premium FFKITCHEN collection...
      </div>
    );
  }

  // 3. Render clean layout fallback notice if server connection drops
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", color: "red" }}>
        <h3>⚠️ Server Connectivity Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="page-home">
      {/* HERO SECTION */}
      <section className="hero">
        <img src={hero} alt="" />
      </section>

      {/* FEATURE STRIP */}
      <div className="features">
        <div className="feature-item">
          <span>🚚 Free delivery over Rs.5000</span>
        </div>
        <div className="feature-item">
          <span>✅ 100% Authentic Products</span>
        </div>
        <div className="feature-item">
          <span>↩️ Easy 7-day Returns</span>
        </div>
        <div className="feature-item">
          <span>💳 Secure Payment</span>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      {/* <section className="section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find exactly what you're looking for</p>
        </div>
        <div className="cats-grid">
          {categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <div
                className="cat-card"
                key={cat}
                onClick={() => handleCategoryClick(cat)}
              >
                <div className="em">{catEmojis[cat] || "🍽️"}</div>
                <div className="cat-card-label">{cat}</div>
              </div>
            ))}
        </div>
      </section> */}

      {/* FEATURED RETAIL GRID */}
      <section
        className="section"
        style={{
          background: "white",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Our most loved pieces this season</p>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id} // Supports MongoDB object ids (_id) naturally
              product={product}
              onOpenDetail={(p) => dispatch(openDetailModal(p))}
              onAddToCart={(p) => dispatch(addToCart(p))}
            />
          ))}
        </div>
        <div
          style={{ textAlign: "center", marginTo: "36px", marginTop: "36px" }}
        >
          <button
            className="btn-primary"
            onClick={() => dispatch(setNavigate("products"))}
          >
            View All Products →
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section" id="about">
        <div className="about-grid">
          <div className="about-img-box">🏺</div>
          <div className="about-content">
            <h2>Crafted with Passion, Served with Pride</h2>
            <p>
              FFKITCHEN has been Pakistan's trusted source for premium crockery
              since 2010. We curate only the finest bone china, ceramic, and
              crystal pieces from renowned manufacturers.
            </p>
            <p>
              Every item in our collection is chosen for its quality, elegance,
              and durability — because we believe your table deserves the best.
            </p>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-num">500+</div>
                <div className="stat-label">Premium Products</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">14+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">5★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section" id="contact" style={{ background: "white" }}>
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you</p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "14px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>📍</div>
            <div
              style={{
                fontWeight: "700",
                marginBottom: "6px",
                color: "var(--slate)",
              }}
            >
              Address
            </div>
            <div style={{ color: "var(--slate-mid)", fontSize: "14px" }}>
              Shop 12, Tariq Road, Karachi
            </div>
          </div>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "14px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>📞</div>
            <div
              style={{
                fontWeight: "700",
                marginBottom: "6px",
                color: "var(--slate)",
              }}
            >
              Phone
            </div>
            <div style={{ color: "var(--slate-mid)", fontSize: "14px" }}>
              +92 300 123 4567
            </div>
          </div>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "14px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>✉️</div>
            <div
              style={{
                fontWeight: "700",
                marginBottom: "6px",
                color: "var(--slate)",
              }}
            >
              Email
            </div>
            <div style={{ color: "var(--slate-mid)", fontSize: "14px" }}>
              info@ffkitchen.pk
            </div>
          </div>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "14px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🕐</div>
            <div
              style={{
                fontWeight: "700",
                marginBottom: "6px",
                color: "var(--slate)",
              }}
            >
              Hours
            </div>
            <div style={{ color: "var(--slate-mid)", fontSize: "14px" }}>
              Mon–Sat: 10am – 9pm
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
