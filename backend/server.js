const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "https://projectbook.onrender.com", // Your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Static files for frontend
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
);

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/book-sets', require('./routes/bookSetRoutes'));
app.use('/api/copies', require('./routes/copyRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
