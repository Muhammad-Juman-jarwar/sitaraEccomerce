// src/components/Checkout.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectSubtotal,
  selectShipping,
  selectTotal,
  clearCart,
  increase,
  decrease,
  removeItem,
} from "@/app/slices/cartSlice";
import ShippingForm from "./ShippingForm";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);

  const [showForm, setShowForm] = useState(false);

  // Only clear cart here after shipping form handles validation
  const handlePlaceOrder = () => {
    if (items.length === 0) return alert("Your cart is empty!");
    // This can be called from ShippingForm after validation
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/"); // Redirect to Home after order
  };

  if (items.length === 0) {
    return (
      <div className="checkout-container max-w-7xl mx-auto p-6 text-center text-gray-500">
        Your cart is empty.{" "}
        <Link to="/shop" className="text-blue-500 underline">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {/* Left: Cart Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">PKR {item.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrease(item.id))}
                    className="h-8 w-8 rounded-md border"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => dispatch(increase(item.id))}
                    className="h-8 w-8 rounded-md border"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="ml-auto text-sm underline text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Shipping & Billing Form
        </button>
      </div>

      {/* Right: Order Summary or Shipping Form */}
      <div>
        {!showForm ? (
          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500">
              Click "Add Shipping & Billing Form" to complete your order.
            </p>
          </div>
        ) : (
          <ShippingForm />
        )}
      </div>
    </div>
  );
}
