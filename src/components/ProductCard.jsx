import React from "react";

export default function ProductCard({ product, onOpenDetail, onAddToCart }) {
  // Base server domain path to fetch uploaded files
  const backendBaseUrl = "http://localhost:5000";

  // Safeguard formatting to handle potential zero ratings gracefully
  const starsCount = Math.floor(product.rating || 5);
  const starsStr = "★".repeat(starsCount) + "☆".repeat(5 - starsCount);

  // Compute image path correctly
  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${backendBaseUrl}${product.imageUrl}`
    : "https://placehold.co/300x300?text=🍽️";

  return (
    <div className="product-card" onClick={() => onOpenDetail(product)}>
      <div
        className="product-img"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          background: "#f9f9f9",
        }}
      >
        {/* 🚀 REAL-TIME SERVER IMAGE CARRIER */}
        <img
          src={imageSrc}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://placehold.co/300x300?text=🍽️";
          }}
        />

        <span className="product-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name">{product.title}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-rating">
          {/* <span className="stars">{starsStr}</span> */}
        </div>
        <div className="product-footer">
          <div className="product-price">
            Rs. {product.price.toLocaleString()} <span>/ item</span>
          </div>
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation(); // Stops modal popup from opening when clicking button
              onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
