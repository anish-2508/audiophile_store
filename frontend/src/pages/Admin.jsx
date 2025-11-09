import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const API_BASE = "https://audiophile-store-backend.onrender.com/api";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle image upload (convert to Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price || !formData.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/products`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setFormData({ name: "", brand: "", price: "", description: "", image: "" });
      setImagePreview(null);
      await fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setImagePreview(product.image);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${API_BASE}/products/${editingId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
      setFormData({ name: "", brand: "", price: "", description: "", image: "" });
      setImagePreview(null);
      await fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", brand: "", price: "", description: "", image: "" });
    setImagePreview(null);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* FORM */}
      <form className="admin-form" onSubmit={editingId ? handleUpdate : handleAddProduct}>
        <h3>{editingId ? "✏️ Edit Product" : "➕ Add New Product"}</h3>

        <div className="form-grid">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="preview" className="admin-preview" />}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* PRODUCT LIST */}
      <div className="admin-products">
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p className="empty">No products yet.</p>
        ) : (
          <div className="admin-grid">
            {products.map((p) => (
              <div className="admin-card" key={p._id}>
                <img src={p.image} alt={p.name} />
                <div className="admin-info">
                  <h4>{p.name}</h4>
                  <p>{p.brand}</p>
                  <p>${p.price}</p>
                </div>
                <div className="admin-buttons">
                  <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
