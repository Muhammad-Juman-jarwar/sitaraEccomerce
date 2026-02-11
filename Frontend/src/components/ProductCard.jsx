// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("/uploads/")
      ? `http://localhost:5000${imagePath}`
      : imagePath;
  };

  return (
    <div className="product-card bg-white p-4 border border-gray-200 rounded-lg shadow-md">
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">PKR {product.price}</span>
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="text-blue-500 underline"
          >
            View Details
          </Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
