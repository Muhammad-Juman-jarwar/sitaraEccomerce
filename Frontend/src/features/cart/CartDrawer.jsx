import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { closeCart } from "@/app/slices/uiSlice";
import {
  selectCartItems,
  selectSubtotal,
  selectShipping,
  selectTotal,
  increase,
  decrease,
  removeItem,
} from "@/app/slices/cartSlice";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.cartOpen);

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && dispatch(closeCart());
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dispatch]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => dispatch(closeCart())}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="absolute right-0 top-0 h-full w-[92%] sm:w-[420px] bg-[var(--surface)] text-[var(--text)] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h3 className="font-semibold">Your Cart</h3>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 rounded-md hover:bg-[var(--muted)] focus:outline-none"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
          {items.length === 0 ? (
            <div className="p-6 text-sm text-[var(--text-muted)]">
              Your cart is empty.
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 p-4">
                <img
                  src={it.image}
                  alt={it.name}
                  className="h-20 w-20 rounded-lg object-cover border border-[var(--border)]"
                />
                <div className="flex-1">
                  <Link to={`/product/${it.slug}`} className="font-medium hover:underline">
                    {it.name}
                  </Link>
                  <p className="text-sm text-[var(--text-muted)]">
                    PKR {it.price.toLocaleString()}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decrease(it.id))}
                      className="h-8 w-8 rounded-md border border-[var(--border)]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{it.qty}</span>
                    <button
                      onClick={() => dispatch(increase(it.id))}
                      className="h-8 w-8 rounded-md border border-[var(--border)]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <button
                      onClick={() => dispatch(removeItem(it.id))}
                      className="ml-auto text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary + Actions */}
        <div className="border-t border-[var(--border)] p-4">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)]">Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-[var(--text-muted)]">Shipping</span>
            <span>{shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between font-semibold mt-3">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              to="/checkout"
              className="flex-1 inline-flex justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
              onClick={() => dispatch(closeCart())}
            >
              Proceed to Checkout
            </Link>
            <button
              className="flex-1 rounded-full border border-[var(--border)] px-4 py-2 text-sm"
              onClick={() => dispatch(closeCart())}
            >
              Continue Shopping
            </button>
          </div>

          <Link
            to="/cart"
            className="mt-3 block text-center text-sm underline"
            onClick={() => dispatch(closeCart())}
          >
            View full cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
