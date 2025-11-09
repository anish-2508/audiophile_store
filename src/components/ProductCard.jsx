import React from "react";
import { Link } from "react-router-dom";
import "../styles/productcard.css";

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.brand}</p>
    <p>${product.price}</p>
    <Link to={`/products/${product._id}`} className="details-btn">Details</Link>
  </div>
);

export default ProductCard;
