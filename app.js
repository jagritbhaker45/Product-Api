const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Log __dirname
console.log('__dirname:', __dirname); // Add this line

// Routes
const productRoutes = require('./src/routes/productRoutes');
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
