import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation, A11y } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * Sitarayza Hero
 * - Clothing-only background images
 * - Static overlay text (from proposal: browse by category/gender + trending)
 * - Primary CTA "Shop Now" + secondary action
 * - Accessible, mobile-first, high contrast
 */
export default function Hero() {
  // Clothing images (Unsplash) — replace with your own anytime
  const slides = [
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1920&auto=format&fit=crop", // women coats
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop", // menswear
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1920&auto=format&fit=crop", // streetwear
  ];

  return (
    <section
      className="relative isolate"
      aria-label="Sitarayza featured clothing collections"
      aria-live="polite"
    >
      {/* Background carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation, A11y]}
        effect="fade"
        speed={700}
        loop
        autoplay={{ delay: 4800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[60vh] min-h-[420px] sm:h-[68vh] lg:h-[74vh] overflow-hidden rounded-none sm:rounded-2xl bg-black"
        onInit={(swiper) => {
          // Respect reduced motion preference
          const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (prefersReduced && swiper?.autoplay) swiper.autoplay.stop();
        }}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <img
                src={`${src}&sat=-6`}
                alt="" /* decorative; primary content is in overlay */
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Dark veil to preserve contrast over busy clothing images */}
              <div className="absolute inset-0" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static overlay content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto mx-auto max-w-3xl text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80 sm:text-sm">
            Sitarayza • New Season Collections
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
            Shop the <span className="text-pink-300">Latest Trends</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Browse clothing by category and gender, filter by type and size, and discover
            trending picks curated for comfort and style. Elevate your wardrobe today.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {/* Primary CTA (requested) */}
            <a
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Shop Now - explore Sitarayza clothing"
            >
              Shop Now
            </a>
            {/* Secondary action pointing to categories/trending per proposal */}
            <a
              href="/categories"
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Browse categories and genders"
            >
              Browse Categories
            </a>
          </div>

          {/* Small helper text aligned with project scope (optional) */}
          <p className="mt-3 text-xs text-white/80">
            Trending pieces updated regularly • Easy filters • Fast checkout
          </p>
        </div>
      </div>
    </section>
  );
}
