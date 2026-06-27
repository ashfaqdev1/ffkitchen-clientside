import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../Slices/cartSlice";
import { closeCheckout, openSuccess, closeCart } from "../Slices/uiSlice";

export default function CheckoutModal({ setOrderDetails }) {
  const dispatch = useDispatch();

  // 1. Connect to global Redux state selectors
  const isOpen = useSelector((state) => state.ui.isCheckoutOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const isOrderLoading = useSelector((state) => state.cart.loading);

  // 2. Local form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Conditional early return if modal is not active
  if (!isOpen) return null;

  // 3. Calculate order cash subtotal values
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  // 4. Form submission routing logic
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !email)
      return alert("Please complete all delivery fields");

    const fullOrderPayload = {
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      city: city,
      deliveryAddress: address,
      items: cartItems.map((item) => ({
        productId: item._id || item.id,
      })),
    };

    // Execute backend posting thunk routine
    const resultAction = await dispatch(placeOrder(fullOrderPayload));

    if (placeOrder.fulfilled.match(resultAction)) {
      // Hydrate local text states on parent App container
      setOrderDetails({ name, phone });

      // CRITICAL UI LAYOUT CLEANUPS
      dispatch(closeCart()); // Instantly slides the empty CartDrawer back away
      dispatch(closeCheckout()); // Hides this form overlay window using your sliced action
      dispatch(openSuccess()); // Displays the completion window view
    } else {
      alert(resultAction.payload || "An unexpected error occurred.");
    }
  };

  return (
    <div className="modal">
      {/* Click-away backdrop shadow element */}
      <div className="overlay" onClick={() => dispatch(closeCheckout())}></div>

      {/* Content modal surface card structure */}
      <div className="modal-box">
        <div className="modal-header">
          <button
            className="close-btn"
            onClick={() => dispatch(closeCheckout())}
          >
            ×
          </button>
          <h2>Checkout Details</h2>
          <p>
            Please fill in your delivery parameters to confirm your
            cash-on-delivery order.
          </p>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email addrress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g. 03001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Complete Delivery Address</label>
              <textarea
                className="form-input"
                placeholder="Enter your residential or commercial shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ height: "90px", resize: "none" }}
                required
              />
            </div>

            {/* Subtotal Display Box */}
            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="order-total">
                <span>Total Amount:</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Execution Submit Action Trigger Hook */}
            <button
              type="submit"
              className="place-btn"
              disabled={isOrderLoading}
            >
              {isOrderLoading ? "Processing Order... 🔄" : "Confirm Order 📦"}
            </button>

            <button
              type="button"
              className="cancel-link"
              onClick={() => dispatch(closeCheckout())}
            >
              Cancel & Return
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
