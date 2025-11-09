import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Removed: api.get(`/products/${id}`).then(res => setProduct(res.data));
    // Placeholder for fetching product data
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.brand}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product._id)} className="add-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
