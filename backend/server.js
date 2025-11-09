import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors({
  origin: "https://audiophile-store.onrender.com", // your frontend Render URL
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));  // ✅ increased limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'audiophile_store';
let db;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => console.error(err));

// CRUD Endpoints
app.get('/api/products', async (req, res) => {
  const products = await db.collection('products').find().toArray();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', async (req, res) => {
  const { name, brand, price, image, description } = req.body;
  const result = await db.collection('products').insertOne({ name, brand, price, image, description });
  res.json({ _id: result.insertedId, name, brand, price, image, description });
});

app.put('/api/products/:id', async (req, res) => {
  const { name, brand, price, image, description } = req.body;
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, brand, price, image, description } }
  );
  if (result.matchedCount === 0) return res.status(404).json({ error: 'Product not found' });
  const updated = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
  res.json(updated);
});

app.delete('/api/products/:id', async (req, res) => {
  const result = await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
