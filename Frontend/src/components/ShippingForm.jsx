// src/components/ShippingForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems, selectTotal, selectShipping } from "@/app/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShippingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotal);
  const shipping = useSelector(selectShipping);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    // Validation
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "zip"];
    for (let field of requiredFields) {
      if (!form[field]) return alert(`Please fill ${field}`);
    }

    if (items.length === 0) return alert("Cart is empty!");

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const orderData = {
      customer: form,
      items: items.map((i) => ({
        id: i.id,
        slug: i.slug || "",
        name: i.name || i.title, // ✅ map title to name just in case
        price: i.price,
        qty: i.qty,
        image: i.image,
      })),
      subtotal,
      shipping,
      total: subtotal + shipping,
      payment: {
        method: form.payment,
        status: "pending", // ✅ lowercase to match Mongoose enum
      },
    };

    try {
      const res = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("Order saved:", res.data);
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert("Failed to place order. Try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Your cart is empty.{" "}
        <button onClick={() => navigate("/shop")} className="text-blue-500 underline">
          Go to Shop
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p>Thank you, {form.name}! Your order has been received.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Shipping & Billing Information</h2>
      <div className="grid gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border px-3 py-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border px-3 py-2 rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border px-3 py-2 rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border px-3 py-2 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border px-3 py-2 rounded" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border px-3 py-2 rounded" />
        </div>
        <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip / Postal Code" className="border px-3 py-2 rounded" />

        <div className="mt-2">
          <label className="font-medium">Payment Method:</label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={handleChange} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={handleChange} />
              Card Payment
            </label>
          </div>
        </div>

        <button onClick={handlePlaceOrder} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Place Order
        </button>
      </div>
    </div>
  );
}
