import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
import homeimg from "../home.jpg"

const API_BASE = "https://audiophile-store-backend.onrender.com/api";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        const data = res.data.filter(p => p.featured).slice(0, 3);
        setFeatured(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Immerse in Pure Sound</h1>
          <p>Discover high-fidelity headphones, speakers, and accessories designed for audio perfectionists.</p>
          <a href="/products" className="shop-btn">Explore Collection</a>
        </div>
        <div className="hero-image">
          <img src={homeimg} alt="Headphones" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>🔥 Featured Products</h2>
        <div className="featured-list">
          {featured.length === 0 ? (
            <p>No featured products yet. Add some from Admin!</p>
          ) : (
            featured.map((p) => <ProductCard key={p._id} product={p} />)
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-image">
          <img src="/images/about-sound.jpg" alt="About Audio" />
        </div>
        <div className="about-content">
          <h2>About Audiophile Store</h2>
          <p>
            At <strong>Audiophile Store</strong>, we blend art and technology to deliver sound that moves your soul. 
            From precision-built headphones to immersive speakers, every product is engineered for clarity, depth, and passion.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>"Absolutely blown away by the quality! My new headphones redefine what music should sound like."</p>
            <h4>— Raj Mehta</h4>
          </div>
          <div className="testimonial">
            <p>"The bass is crisp, the design is elegant. Feels like I’m in the studio with my favorite artist."</p>
            <h4>— Neha Kapoor</h4>
          </div>
          <div className="testimonial">
            <p>"Finally, an online store that actually cares about true sound quality. 10/10!"</p>
            <h4>— Aman Rao</h4>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Stay Tuned</h2>
        <p>Subscribe for exclusive launches and audio deals.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Join Now</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
