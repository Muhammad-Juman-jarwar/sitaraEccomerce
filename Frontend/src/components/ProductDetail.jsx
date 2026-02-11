// src/components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products as staticProducts } from "../data/products"; // Import your product data
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice"; // Redux action for cart

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // Check if it's a static product (numeric ID)
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        const staticProduct = staticProducts.find(
          (item) => item.id === numericId,
        );
        if (staticProduct) {
          setProduct(staticProduct);
          setSelectedSize(staticProduct.sizes ? staticProduct.sizes[0] : null);
          setLoading(false);
          return;
        }
      }

      // Otherwise, fetch from database
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setSelectedSize(data.sizes ? data.sizes[0] : null);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add selected size info to product before dispatching
    const productWithSize = {
      id: product._id || product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
      selectedSize,
    };
    dispatch(addItem(productWithSize));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Product not found
          </h2>
          <p className="text-gray-600 mt-2">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-130 object-cover rounded-2xl"
          />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-sm text-gray-500 mt-2">{product.category}</p>

            {/* Sizes Section */}
            <div className="mt-2 flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 text-sm rounded-md cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Selected Size Display */}
            <p className="text-sm text-gray-500 mt-2">
              Selected Size: <span className="font-medium">{selectedSize}</span>
            </p>

            <p className="text-lg font-bold mt-4">PKR {product.price}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 hover:scale-105 transition-transform duration-200 
               cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
