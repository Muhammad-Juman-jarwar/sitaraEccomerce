const AnnouncementBar = () => {
  const items = [
    "🔥 Flat 40% OFF on Winter Collection",
    "🚚 Free Shipping on Orders Above $50",
    "🆕 New Arrivals Just Dropped",
    "⚡ Limited Time Offers – Shop Now",
  ];

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((text, index) => (
          <span
            key={index}
            className="py-3 px-12 text-sm font-medium flex items-center"
          >
            {text}
            <span className="mx-6">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
