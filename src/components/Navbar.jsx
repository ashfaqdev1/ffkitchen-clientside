import React, { useState } from "react";
import logo from "@assets/logo.svg";

export default function Navbar({
  currentView,
  onNavigate,
  onOpenCart,
  cartCount,
}) {
  // Simple state to track if mobile menu is slide open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (view) => {
    onNavigate(view);
    setIsMenuOpen(false); // Close menu automatically when a link is clicked
  };

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Logo stays firmly on the left */}
      <div className="logo" onClick={() => handleLinkClick("home")}>
        <img className="logo-ffkitchen-svg" src={logo} alt="FFKITCHEN" />
      </div>

      {/* MIDDLE/RIGHT: Nav Links list (Toggles 'open' class based on state) */}
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {/* Mobile-only Cross (X) Close Button inside the drawer */}
        <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
          ✕
        </button>

        <button
          className={`nav-link ${currentView === "home" ? "active" : ""}`}
          onClick={() => handleLinkClick("home")}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentView === "products" ? "active" : ""}`}
          onClick={() => handleLinkClick("products")}
        >
          Products
        </button>
        <button className="nav-link" onClick={() => handleLinkClick("about")}>
          About
        </button>
        <button className="nav-link" onClick={() => handleLinkClick("contact")}>
          Contact
        </button>
      </div>

      {/* RIGHT SIDE SECTION: Houses Cart and Hamburger */}
      <div className="navbar-right-controls">
        <button className="cart-btn" onClick={onOpenCart}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        {/* Hamburger Icon button (Only shows up below 768px) */}
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>
      </div>
    </nav>
  );
}
