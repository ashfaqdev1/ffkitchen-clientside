import React, { useState, useEffect } from "react"; // 👈 Added useEffect
import { useSelector, useDispatch } from "react-redux";
import { setNavigate, openCart } from "./Slices/uiSlice";
import { fetchProducts } from "./Slices/productSlice"; // 👈 Import async action

// Import Pages & Components
import Home from "./pages/Home";
import Products from "./pages/Products";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import SuccessModal from "./components/SuccessModal";

export default function App() {
  const dispatch = useDispatch();

  // Trigger API network handshake immediately on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const currentView = useSelector((state) => state.ui.currentView);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const [orderDetails, setOrderDetails] = useState({ name: "", phone: "" });

  return (
    <>
      <Topbar />
      <Navbar
        currentView={currentView}
        onNavigate={(view) => dispatch(setNavigate(view))}
        onOpenCart={() => dispatch(openCart())}
        cartCount={totalCartQty}
      />

      <main id="main-content">
        {currentView === "home" && <Home />}
        {currentView === "products" && <Products />}
      </main>

      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal setOrderDetails={setOrderDetails} />
      <SuccessModal orderDetails={orderDetails} />

      <footer>
        <div className="footer-grid">
          <div>
            <h4>🫖 FFKITCHEN</h4>
            <p>
              Pakistan's premier destination for premium crockery and
              kitchenware.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 FFKITCHEN. All rights reserved.
        </div>
      </footer>
    </>
  );
}
