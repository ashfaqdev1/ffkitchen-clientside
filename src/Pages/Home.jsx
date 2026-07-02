import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavigate, openDetailModal } from "../Slices/uiSlice";
import { addToCart } from "../Slices/cartSlice";
import ProductCard from "../components/ProductCard";
import hero from "@assets/hero.png";

// Nayi categories ke liye placeholders aur images links
const customCategories = ["Kitchen Gadgets", "Home Decor", "Kids", "Fashion"];

const catImages = {
  "Kitchen Gadgets":
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",
  "Home Decor":
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
  Kids: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&auto=format&fit=crop&q=80",
  Fashion:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80",
};

export default function Home() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 1. Read API data & network metrics straight from the backend Redux store slice
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Category click handler - filters local view instead of immediate navigation
  const handleCategoryClick = (catName) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null); // Clear filter if clicked again
    } else {
      setSelectedCategory(catName);
    }
  };

  // Filter products based on selected category, or slice first 4 for featured view
  const displayedProducts = selectedCategory
    ? allProducts.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : allProducts.slice(0, 4);

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

      {/* CATEGORIES SECTION (UPDATED TO SQUARE WITH TEXT OVERLAY) */}
      <section className="section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find exactly what you're looking for</p>
        </div>
        <div
          className="cats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {customCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <div
                className={`cat-card ${isSelected ? "active" : ""}`}
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1", // 🛠️ Makes the card a perfect square
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",

                  transform: isSelected ? "scale(0.98)" : "none",
                }}
              >
                {/* Image Container that fills the square */}
                <img
                  src={catImages[cat]}
                  alt={cat}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 🛠️ Fits image without stretching
                    transition: "transform 0.3s ease",
                  }}
                />

                {/* Dark Semi-Transparent Overlay & Centered White Text */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: isSelected
                      ? "rgba(0, 0, 0, 0.4)" // Slightly darker when active
                      : "rgba(0, 0, 0, 0.3)", // Tint overlay to make white text readable
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff", // 🛠️ White text
                      fontWeight: "700", // 🛠️ Bold text
                      fontSize: "22px",
                      textAlign: "center",
                      textShadow: "1px 1px 4px rgba(0,0,0,0.6)", // Text safety shadow
                      letterSpacing: "0.5px",
                    }}
                  >
                    {cat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED / FILTERED RETAIL GRID */}
      <section
        className="section"
        style={{
          background: "white",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="section-header">
          <h2>
            {selectedCategory
              ? `${selectedCategory} Products`
              : "Featured Products"}
          </h2>
          <p>
            {selectedCategory
              ? `Showing items from ${selectedCategory}`
              : "Our most loved pieces this season"}
          </p>
        </div>

        {displayedProducts.length > 0 ? (
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onOpenDetail={(p) => dispatch(openDetailModal(p))}
                onAddToCart={(p) => dispatch(addToCart(p))}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              background: "#f9f9f9",
              borderRadius: "12px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>📦</div>
            <h4 style={{ color: "var(--slate)" }}>No Products Found</h4>
            <p style={{ color: "var(--slate-mid)", fontSize: "14px" }}>
              We don't have any items in the "{selectedCategory}" category right
              now.
            </p>
            <button
              className="btn-secondary"
              style={{
                marginTop: "12px",
                padding: "6px 16px",
                fontSize: "13px",
              }}
              onClick={() => setSelectedCategory(null)}
            >
              Clear Filter
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "36px" }}>
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
