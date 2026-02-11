import React, { useState, useEffect } from "react";
import { products as staticProducts } from "../data/products";
import Filter from "./Filter";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice";
import { Link, useSearchParams } from "react-router-dom";

function Shop() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

  // Update selected category when URL changes
  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setSelectedCategory(category);
  }, [searchParams]);

  const fetchDatabaseProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (response.ok) {
        const data = await response.json();
        setDbProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products from database:", error);
    } finally {
      setLoading(false);
    }
  };

  // Combine static and database products
  const allProducts = [
    ...staticProducts,
    ...dbProducts.map((product) => ({
      id: `db-${product._id}`,
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
      image: product.image.startsWith("/uploads/")
        ? `http://localhost:5000${product.image}`
        : product.image,
      stock: product.stock,
      featured: product.featured,
      isFromDB: true,
    })),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      }),
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="flex">
      {/* LEFT FILTER (STICKY) */}
      <div className="w-1/4 p-4">
        <div className="sticky top-20">
          <Filter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="w-3/4 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg text-center hover:shadow-lg transition"
                >
                  {product.isFromDB && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      New
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-60 w-full object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold">{product.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <p className="font-bold mt-1">PKR {product.price}</p>

                  <div className="mt-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.isFromDB ? product._id : product.id}`}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;
