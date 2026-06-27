import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDetailModal } from "../Slices/uiSlice";
import { addToCart } from "../Slices/cartSlice";

export default function ProductDetailModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ui.selectedProduct);
  const backendBaseUrl = "http://localhost:5000";

  if (!product) return null;

  const starsCount = Math.floor(product.rating || 5);
  const starsStr = "★".repeat(starsCount) + "☆".repeat(5 - starsCount);

  const waBusinessNumber = "923001234567";
  const productName = product.title || product.name || "Product";

  const messageText = `Assalam-o-Alaikum FFKITCHEN, I am interested in ordering your "${productName}" (Rs. ${(product.price || 0).toLocaleString()}). Could you tell me if it is in stock?`;
  const whatsappLink = `https://wa.me/${waBusinessNumber}?text=${encodeURIComponent(messageText)}`;

  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${backendBaseUrl}${product.imageUrl}`
    : "https://placehold.co/400x400?text=🍽️";

  return (
    <div
      id="product-detail-modal-container"
      className="pdm-overlay"
      onClick={() => dispatch(closeDetailModal())}
    >
      <div className="pdm-window" onClick={(e) => e.stopPropagation()}>
        {/* Close Icon Trigger Button */}
        <button
          className="pdm-close-btn"
          onClick={() => dispatch(closeDetailModal())}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Left Side: Product Image Display Panel */}
        <div className="pdm-image-pane">
          <img
            src={imageSrc}
            alt={productName}
            className="pdm-main-image"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x400?text=🍽️";
            }}
          />
        </div>

        {/* Right Side: Informational Context & Checkout Core */}
        <div className="pdm-info-pane">
          <span className="pdm-category-badge">
            {product.category || "General"}
          </span>

          <h2 className="pdm-product-title">{productName}</h2>

          <div className="pdm-rating-row">
            <span className="pdm-status-tag-active">● In Stock</span>
          </div>

          <div className="pdm-divider"></div>

          <p className="pdm-description">
            {product.desc ||
              "No description available for this premium kitchenware product item."}
          </p>

          <div className="pdm-price-tag">
            <span className="pdm-currency">Rs.</span>
            <span className="pdm-amount">
              {(product.price || 0).toLocaleString()}
            </span>
          </div>

          {/* Action Footer Buttons Grid Block */}
          <div className="pdm-actions-grid">
            <button
              className="pdm-btn-cart"
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(closeDetailModal());
              }}
            >
              🛒 Add to Cart
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pdm-btn-whatsapp"
            >
              💬 Chat via WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
