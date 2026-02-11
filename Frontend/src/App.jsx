import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import CartDrawer from "./features/cart/CartDrawer";
import Checkout from "./components/Checkout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import AnnouncementBar from "./components/AnnouncementBar";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProductsManagement from "./components/admin/ProductsManagement";
import UsersManagement from "./components/admin/UsersManagement";
import OrdersManagement from "./components/admin/OrdersManagement";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Public layout wrapper
function PublicLayout() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <Outlet />
      <Footer />
    </>
  );
}

// Admin layout wrapper
function AdminWrapper() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<ContactForm />} />
      </Route>

      {/* Admin routes */}
      <Route path="admin" element={<AdminWrapper />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="users" element={<UsersManagement />} />
      </Route>

      {/* Optional 404 */}
      {/* <Route path="*" element={<div>Not Found</div>} /> */}
    </Routes>
  );
}
