import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    const { name, email, password, phone } = form;
    if (!name || !email || !password) return alert("Please fill all required fields");

    // Send form without role (the role will be set by default on the backend)
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password, phone });
      console.log("Signed up:", res.data);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow mt-8 mb-5">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone (optional)"
        className="border p-2 rounded w-full mb-3"
      />
      <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </div>
  );
}
