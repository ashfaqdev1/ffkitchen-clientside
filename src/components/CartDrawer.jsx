import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart, openCheckout, setNavigate } from "../Slices/uiSlice";
import { updateQuantity, removeFromCart } from "../Slices/cartSlice";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isCartOpen);
  const cartItems = useSelector((state) => state.cart.items);

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div id="cart-drawer-container">
      <div className="overlay" onClick={() => dispatch(closeCart())}></div>
      <div className="cart-drawer">
        <div className="drawer-header">
          <h3>Your Cart ({totalCount})</h3>
          <button className="close-btn" onClick={() => dispatch(closeCart())}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="e">🛒</div>
            <h3 style={{ marginBottom: "8px" }}>Your cart is empty</h3>
            <p>Add some beautiful pieces to your cart</p>
            <button
              className="btn-primary"
              style={{ marginTop: "20px" }}
              onClick={() => {
                dispatch(closeCart());
                dispatch(setNavigate("products"));
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-emoji">{item.image}</div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>Rs. {(item.price * item.qty).toLocaleString()}</p>
                    <div className="qty-ctrl">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, delta: -1 }))
                        }
                      >
                        −
                      </button>
                      <span className="qty-num">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, delta: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="rm-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>Rs. {totalCost.toLocaleString()}</strong>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  dispatch(closeCart());
                  dispatch(openCheckout());
                }}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
