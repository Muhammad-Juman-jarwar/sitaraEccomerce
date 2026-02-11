// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <>
      <ContactForm />
      <footer className="bg-[var(--brand)] text-white border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Stay in Touch</h3>
            <p className="text-sm text-white/80 mb-4">
              Stay connected with Sitarayza for the latest arrivals, offers, and style inspiration.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="Twitter / X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories/men" className="hover:text-blue-400 transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/categories/women" className="hover:text-blue-400 transition">
                  Women
                </Link>
              </li>
            </ul>
            <p className="text-xs text-white/60 mt-4">
              Explore our curated collections and find your perfect style.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[var(--border)] py-4">
          <p className="text-center text-xs text-white/70">
            © 2025 Sitarayza ·{" "}
            <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link> ·{" "}
            <Link to="/refund-exchange-policy" className="hover:text-blue-400">Refund and Exchange Policy</Link> ·{" "}
            <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link>
          </p>
        </div>
        
      </footer>
    </>
  );
}
