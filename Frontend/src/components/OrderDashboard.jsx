// src/components/OrderDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 md:overflow-x-auto"
            >
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="min-w-full border border-gray-300 table-auto md:table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-2 border">Order ID</th>
                      <th className="px-2 py-2 border">Customer</th>
                      <th className="px-2 py-2 border">Address</th>
                      <th className="px-2 py-2 border">Items</th>
                      <th className="px-2 py-2 border">Total</th>
                      <th className="px-2 py-2 border">Payment</th>
                      <th className="px-2 py-2 border">Status</th>
                      <th className="px-2 py-2 border">Date</th>
                      <th className="px-2 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 border">{order._id.slice(-6)}</td>
                      <td className="px-2 py-2 border">
                        {order.customer.name}<br/>
                        {order.customer.email}<br/>
                        {order.customer.phone}
                      </td>
                      <td className="px-2 py-2 border">
                        {order.customer.address}<br/>
                        {order.customer.city}, {order.customer.state} - {order.customer.zip}
                      </td>
                      <td className="px-2 py-2 border">
                        {order.items.map((item) => (
                          <div key={item.id}>
                            {item.name} x {item.qty} (PKR {item.price})
                          </div>
                        ))}
                      </td>
                      <td className="px-2 py-2 border">PKR {order.total.toLocaleString()}</td>
                      <td className="px-2 py-2 border">{order.payment.method} ({order.payment.status})</td>
                      <td className="px-2 py-2 border">{order.orderStatus}</td>
                      <td className="px-2 py-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="px-2 py-2 border flex flex-col gap-1">
                        {order.orderStatus === "pending" && (
                          <button
                            onClick={() => updateStatus(order._id, "delivered")}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card */}
              <div className="md:hidden space-y-2 text-sm">
                <div className="flex justify-between"><span className="font-semibold">Order ID:</span> <span>{order._id.slice(-6)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Customer:</span> <span>{order.customer.name}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Email:</span> <span>{order.customer.email}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Phone:</span> <span>{order.customer.phone}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Address:</span> <span>{order.customer.address}</span></div>
                <div className="flex justify-between"><span className="font-semibold">City/State/ZIP:</span> <span>{order.customer.city}, {order.customer.state} - {order.customer.zip}</span></div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Items:</span>
                  {order.items.map((item) => (
                    <span key={item.id} className="ml-2">{item.name} x {item.qty} (PKR {item.price})</span>
                  ))}
                </div>
                <div className="flex justify-between"><span className="font-semibold">Total:</span> <span>PKR {order.total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Payment:</span> <span>{order.payment.method} ({order.payment.status})</span></div>
                <div className="flex justify-between"><span className="font-semibold">Status:</span> <span>{order.orderStatus}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Date:</span> <span>{new Date(order.createdAt).toLocaleString()}</span></div>
                <div className="flex gap-2 mt-2">
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm flex-1"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
