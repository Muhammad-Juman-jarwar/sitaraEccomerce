import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "@/app/slices/cartSlice";
import { openCart } from "@/app/slices/uiSlice";
import { products as staticProducts } from "@/data/products";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);

  const close = () => setOpen(false);

  // Load auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(adminFlag);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  // Fetch database products for search
  useEffect(() => {
    const fetchDbProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((product) => ({
            ...product,
            image: product.image.startsWith("/uploads/")
              ? `http://localhost:5000${product.image}`
              : product.image,
          }));
          setDbProducts(formattedData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchDbProducts();
  }, []);

  // Handle search query changes
  useEffect(() => {
    if (q.trim() === "") {
      setSearchResults([]);
      return;
    }

    const allProducts = [
      ...staticProducts,
      ...dbProducts.map((p) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
        isFromDB: true,
      })),
    ];

    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(q.toLowerCase()) ||
        product.description.toLowerCase().includes(q.toLowerCase()) ||
        product.category.toLowerCase().includes(q.toLowerCase()),
    );

    setSearchResults(filteredProducts.slice(0, 5));
  }, [q, dbProducts]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleProductClick = (productId) => {
    setQ("");
    setSearchResults([]);
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setQ("");
      setSearchResults([]);
    }
  };

  // Simple nav handler — uses navigate() directly
  const goTo = (path) => {
    navigate(path);
    close();
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  const navCls = (path) =>
    `px-3 py-2 text-sm font-medium rounded-md transition cursor-pointer ${
      isActive(path)
        ? "text-[var(--accent)] bg-[var(--tint)]"
        : "text-white hover:text-blue-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--brand)] text-white border-[var(--border)]/0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-[var(--tint)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <span
              onClick={() => goTo("/")}
              className="flex items-center gap-2 font-semibold tracking-tight text-white cursor-pointer"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[var(--brand)]">
                S
              </span>
              <span className="text-lg">Sitarayza</span>
            </span>
          </div>

          {/* Middle: Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <span className={navCls("/")} onClick={() => goTo("/")}>
              Home
            </span>
            <span className={navCls("/shop")} onClick={() => goTo("/shop")}>
              Shop
            </span>
            <span
              className={navCls("/shop?category=men")}
              onClick={() => goTo("/shop?category=men")}
            >
              Men
            </span>
            <span
              className={navCls("/shop?category=women")}
              onClick={() => goTo("/shop?category=women")}
            >
              Women
            </span>
            {isLoggedIn && isAdmin && (
              <span className={navCls("/admin")} onClick={() => goTo("/admin")}>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Dashboard
                </span>
              </span>
            )}
          </nav>

          {/* Right: search + cart + auth buttons */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <div className="relative hidden md:block" ref={searchRef}>
              <button
                type="button"
                onClick={toggleSearch}
                className="p-2 rounded-md hover:bg-[var(--tint)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Search"
                title="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Animated search input */}
              <div
                className={`absolute right-0 top-full mt-2 transition-all duration-300 ease-in-out ${
                  searchOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-lg shadow-xl border border-[var(--border)] overflow-hidden min-w-[320px]">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                    <Search className="h-4 w-4 text-[var(--text-muted)]" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)] text-[var(--text)]"
                      autoFocus
                    />
                  </div>

                  {/* Search results dropdown */}
                  {searchResults.length > 0 && (
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          type="button"
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-[var(--text)] truncate">
                              {product.title}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] truncate">
                              {product.description}
                            </p>
                            <p className="text-sm font-semibold text-[var(--accent)] mt-1">
                              Rs. {product.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No results message */}
                  {q.trim() !== "" && searchResults.length === 0 && (
                    <div className="px-4 py-8 text-center text-[var(--text-muted)]">
                      <p className="text-sm">No products found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className="relative p-2 rounded-md hover:bg-[var(--tint)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Open cart"
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth buttons */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <span
                  onClick={() => goTo("/login")}
                  className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-hover)] cursor-pointer"
                >
                  Login
                </span>
                <span
                  onClick={() => goTo("/signup")}
                  className="px-3 py-1 rounded-full bg-[var(--tint)] text-white text-sm hover:bg-[var(--tint-hover)] cursor-pointer"
                >
                  Signup
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={close}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-[var(--brand)] text-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3 border-[var(--border)]">
              <span className="font-semibold">Menu</span>
              <button
                type="button"
                onClick={close}
                className="p-2 rounded-md hover:bg-[var(--tint)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-white/10 border-white/20">
                <Search className="h-4 w-4 text-white/70" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/50 text-white"
                />
              </div>

              {/* Mobile search results */}
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-[300px] overflow-y-auto bg-white rounded-lg">
                  {searchResults.map((product) => (
                    <button
                      type="button"
                      key={product.id}
                      onClick={() => {
                        handleProductClick(product.id);
                        close();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-[var(--text)] truncate">
                          {product.title}
                        </p>
                        <p className="text-xs font-semibold text-[var(--accent)]">
                          Rs. {product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {q.trim() !== "" && searchResults.length === 0 && (
                <p className="text-xs text-white/70 mt-2 text-center">
                  No products found
                </p>
              )}
            </div>

            <nav className="flex flex-col gap-1 px-2">
              <span className={navCls("/")} onClick={() => goTo("/")}>
                Home
              </span>
              <span className={navCls("/shop")} onClick={() => goTo("/shop")}>
                Shop
              </span>
              <span
                className={navCls("/shop?category=men")}
                onClick={() => goTo("/shop?category=men")}
              >
                Men
              </span>
              <span
                className={navCls("/shop?category=women")}
                onClick={() => goTo("/shop?category=women")}
              >
                Women
              </span>
              {isLoggedIn && isAdmin && (
                <span
                  className={navCls("/admin")}
                  onClick={() => goTo("/admin")}
                >
                  Dashboard
                </span>
              )}

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    close();
                  }}
                  className="px-3 py-1 mt-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <span
                    onClick={() => goTo("/login")}
                    className="px-3 py-1 mt-2 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-hover)] cursor-pointer"
                  >
                    Login
                  </span>
                  <span
                    onClick={() => goTo("/signup")}
                    className="px-3 py-1 mt-2 rounded-full bg-[var(--tint)] text-white text-sm hover:bg-[var(--tint-hover)] cursor-pointer"
                  >
                    Signup
                  </span>
                </>
              )}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
