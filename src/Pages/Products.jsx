import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // 👈 Added useSelector
import { openDetailModal } from "../Slices/uiSlice";
import { addToCart } from "../Slices/cartSlice";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const dispatch = useDispatch();

  // 1. Read API data & status metrics straight from our dynamic Redux slice
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories dynamically from database items
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  // Compute filter logic loops on live dataset
  const filteredProducts = allProducts.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  console.log(filteredProducts);

  // Render a clean structural loader skeleton if network is pending
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
        <div
          className="spinner"
          style={{ fontSize: "40px", marginBottom: "12px" }}
        >
          🔄
        </div>
        Loading the premium FFKITCHEN collection...
      </div>
    );
  }

  // Render network fallback alert block if server errors out
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", color: "red" }}>
        <h3>⚠️ Server Connectivity Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="page-products">
      <div className="products-page">
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "32px",
              marginBottom: "6px",
            }}
          >
            Our Collection
          </h2>
          <p style={{ color: "var(--slate-mid)" }}>
            {filteredProducts.length} premium pieces available
          </p>
        </div>

        <div className="products-toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search crockery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="cat-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "var(--slate-light)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
            <h3>No items match your criteria</h3>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id} // Supports MongoDB object ids (_id) natively
                product={product}
                onOpenDetail={(p) => dispatch(openDetailModal(p))}
                onAddToCart={(p) => dispatch(addToCart(p))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
