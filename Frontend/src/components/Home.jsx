import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  BadgeCheck,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice";
import { openCart } from "@/app/slices/uiSlice";
import ShalwarKameezSlider from "./ShalwarKameezSlider";
import { products as staticProducts } from "@/data/products";

export default function Home() {
  const dispatch = useDispatch();
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

  const fetchDatabaseProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (response.ok) {
        const data = await response.json();
        // Get featured products or latest 4
        const featuredProducts = data.filter((p) => p.featured).slice(0, 4);
        setDbProducts(
          featuredProducts.length > 0 ? featuredProducts : data.slice(0, 4),
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
      {/* HERO (single bg image) */}
      <section className="relative h-[70vh] md:h-[80vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="Fashion apparel banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-2xl text-[var(--on-brand)]">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Shop the Latest Trends
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90">
              Curated styles for every season. Discover new arrivals,
              essentials, and limited drops—crafted for comfort and made to
              last.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShalwarKameezSlider />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
          <Link
            to="/categories"
            className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Trending Now</h2>
            <Link
              to="/shop"
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] underline"
            >
              See more
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Show database products first with "New" badge, then static trending products */}
            {dbProducts.map((product) => (
              <TrendingCard
                key={`db-${product._id}`}
                id={product._id}
                title={product.title}
                price={product.price}
                size={product.sizes}
                href={`/product/${product._id}`}
                img={
                  product.image.startsWith("/uploads/")
                    ? `http://localhost:5000${product.image}`
                    : product.image
                }
                isNew={true}
                dispatch={dispatch}
              />
            ))}
            {/* Show static trending products */}
            {trending.slice(0, 4 - dbProducts.length).map((item) => (
              <TrendingCard
                key={`static-${item.id}`}
                {...item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="sr-only">Store features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<BadgeCheck className="h-6 w-6" />}
            title="Premium Quality"
            desc="Fabric and stitching you can feel—built to last."
          />
          <FeatureCard
            icon={<Truck className="h-6 w-6" />}
            title="Fast Delivery"
            desc="Dispatch within 24–48 hours on most orders."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Latest Trends"
            desc="Fresh drops weekly. Stay ahead of the curve."
          />
          <FeatureCard
            icon={<RotateCcw className="h-6 w-6" />}
            title="Easy Returns"
            desc="Hassle-free returns within 7–14 days."
          />
        </div>
      </section>
    </main>
  );
}

/* ---------- Subcomponents ---------- */

function CategoryCard({ title, desc, size, href, img, cta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-[var(--surface)] shadow-sm hover:shadow-md transition border-[var(--border)]">
      <div className="relative h-56">
        <img
          src={img}
          alt={`${title} category`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-white/90">{desc}</p>
          <p className="mt-1 text-sm text-white/90">{size}</p>
          <Link
            to={href}
            className="mt-3 inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-white"
          >
            {cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TrendingCard({ id, title, price, size, img, href, dispatch, isNew }) {
  return (
    <article className="group rounded-2xl border bg-[var(--surface)] shadow-sm hover:shadow-md transition overflow-hidden border-[var(--border)]">
      <div className="relative aspect-[4/5]">
        {isNew && (
          <span className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            New
          </span>
        )}
        <img
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-medium text-[var(--text)]">{title}</h3>
        <p className="line-clamp-1 font-medium text-[var(--text)]">{size}</p>
        <p className="mt-1 text-[var(--text-muted)]">
          PKR {price.toLocaleString()}
        </p>
        <div className="mt-3 flex gap-2">
          <Link
            to="/shop"
            className="flex-1 inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--tint)]"
          >
            Go to Shop
          </Link>
          <button
            onClick={() => {
              dispatch(
                addItem({
                  id,
                  slug: href.replace("/product/", ""),
                  name: title,
                  price,
                  image: img,
                  qty: 1,
                }),
              );
              dispatch(openCart());
            }}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-3 py-1.5 text-sm text-white hover:bg-[var(--accent-hover)]"
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-[var(--surface)] p-5 shadow-sm border-[var(--border)]">
      <div
        className="rounded-xl bg-[var(--muted)] p-2 text-[var(--brand)]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{desc}</p>
      </div>
    </div>
  );
}

/* ---------- Mock Data ---------- */
const categories = [
  {
    slug: "men",
    title: "Men",
    desc: "From everyday essentials to statement fits.",
    size: ["Md"],
    cta: "Shop Men",
    href: "/shop?category=men",
    img: "/src/assets/images/manshirts.png",
  },
  {
    slug: "women",
    title: "Women",
    desc: "Elegant silhouettes and modern staples.",
    size: ["Lg"],
    cta: "Shop Women",
    href: "/shop?category=women",
    img: "/src/assets/images/W1.jpg",
  },
  {
    slug: "kids",
    title: "Kids",
    desc: "Play-ready outfits for little trendsetters.",
    size: ["Sm"],
    cta: "Shop Kids",
    href: "/shop?category=child",
    img: "/src/assets/images/C1.jpg",
  },
];

const trending = [
  {
    id: 1,
    title: "Oversized Cotton T-Shirt",
    price: 1999,
    size: ["Sm"],
    href: "/product/oversized-cotton-tee",
    img: "/src/assets/images/cottonShirt.png",
  },
  {
    id: 2,
    title: "Jeans Paint",
    price: 2499,
    size: ["Md"],
    href: "/product/relaxed-denim-jacket",
    img: "/src/assets/images/jeans.png",
  },
  {
    id: 3,
    title: "Women Everday Wear",
    price: 3299,
    size: ["Md"],
    href: "/product/everyday-chinos",
    img: "/src/assets/images/women2.png",
  },
  {
    id: 4,
    title: "Kids Wear",
    price: 3599,
    size: ["Lg"],
    href: "/product/minimal-sneakers",
    img: "/src/assets/images/kids.jpg",
  },
];
