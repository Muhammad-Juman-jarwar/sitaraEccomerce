import React, { useState, useEffect } from "react";
import Image1 from "../assets/images/shirt.png";
import Image2 from "../assets/images/men1.png";
import Image3 from "../assets/images/women1.png";
import Image4 from "../assets/images/c5.jpg";
import Image5 from "../assets/images/women2.png";
import Image6 from "../assets/images/kids.jpg";

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

const ShalwarKameezSlider = ({ className = "" }) => {
  const visibleSlides = 3;
  const maxIndex = images.length - visibleSlides;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div className={`relative max-w-6xl mx-auto mt-12 ${className}`}>
      <div className="relative overflow-hidden rounded-xl shadow-lg h-[360px] md:h-[420px] lg:h-[480px]">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Shalwar Kameez ${index + 1}`}
              className="w-1/3 h-full object-contain px-2"
            />
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          &lt;
        </button>

        {/* Right Button */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ShalwarKameezSlider;
