import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Admin from "./Admin";
import "../styles/products.css";

const API_BASE = "https://audiophile-store-backend.onrender.com/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (!showAdmin) fetchProducts();
  }, [showAdmin]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="products-page">
      {/* Hero-like Header */}
      <div className="products-banner">
        <div className="banner-content">
          <h1>{showAdmin ? "Product Management" : "Explore Our Collection"}</h1>
          <p>
            {showAdmin
              ? "Add, edit, or delete your products from the store inventory."
              : "Browse premium audio products crafted for the perfect sound experience."}
          </p>
          <button className="toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
            {showAdmin ? "View Products" : "Manage Products"}
          </button>
        </div>
      </div>

      {/* Products or Admin Section */}
      <div className="products-container">
        {showAdmin ? (
          <Admin />
        ) : (
          <div className="products-list">
            {products.length === 0 ? (
              <p className="no-products">No products available yet.</p>
            ) : (
              products.map((p) => <ProductCard key={p._id} product={p} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
