import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSuccess, setNavigate } from "../Slices/uiSlice";

export default function SuccessModal({ orderDetails }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSuccessOpen);

  if (!isOpen) return null;

  return (
    <div id="success-modal-container">
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-box" style={{ position: "relative", zIndex: 1 }}>
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h2>Order Placed!</h2>
            <p>
              Thank you, <strong>{orderDetails.name || "Customer"}</strong>!
              Your order has been received.
              <br />
              We'll contact you on <strong>{orderDetails.phone}</strong> to
              confirm delivery.
            </p>
            <p style={{ marginTop: "12px" }}>
              Estimated delivery: <strong>2–4 business days</strong>
            </p>
            <button
              className="success-btn"
              onClick={() => {
                dispatch(closeSuccess());
                dispatch(setNavigate("home"));
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
