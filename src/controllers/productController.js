const { getProductsFromFile, writeProductsToFile } = require('../utils/jsonHandler');

// Controller function to create a new product
function createProduct(req, res) {
    const { productId, productName, productDescription, productImage, isActive } = req.body;

    // Read existing products data
    let products = getProductsFromFile();

    // Check if product with the same productId already exists
    const existingProduct = products.find(product => product.productId === productId);
    if (existingProduct) {
        return res.status(400).json({ error: 'Product with the same ID already exists' });
    }

    // Add new product to the products array
    const newProduct = {
        productId,
        productName,
        productDescription,
        productImage,
        isActive
    };
    products.push(newProduct);

    // Write updated products data to JSON file
    writeProductsToFile(products);

    res.status(201).json(newProduct);
}

// Controller function to get product by productId
function getProductById(req, res) {
    const productId = req.params.productId;

    // Read existing products data
    const products = getProductsFromFile();

    // Find product by productId
    const product = products.find(product => product.productId === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
}

// Controller function to get a list of active products with pagination
function getActiveProducts(req, res) {
    const productsPerPage = 10;
    const page = parseInt(req.query.page) || 1;

    // Read existing products data
    const products = getProductsFromFile();

    // Filter active products
    const activeProducts = products.filter(product => product.isActive);

    // Calculate pagination values
    const totalProducts = activeProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const offset = (page - 1) * productsPerPage;

    // Get paginated active products
    const paginatedActiveProducts = activeProducts.slice(offset, offset + productsPerPage);

    res.json({
        totalProducts,
        totalPages,
        currentPage: page,
        products: paginatedActiveProducts
    });
}



// Controller function to update product by productId
function updateProduct(req, res) {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    // Read existing products data
    let products = getProductsFromFile();

    // Find index of product with the given productId
    const productIndex = products.findIndex(product => product.productId === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Update product data
    products[productIndex] = { ...products[productIndex], ...updatedProductData };

    // Write updated products data to JSON file
    writeProductsToFile(products);

    res.json(products[productIndex]);
}

// Controller function to delete product by productId
function deleteProduct(req, res) {
    const productId = req.params.productId;

    // Read existing products data
    let products = getProductsFromFile();

    // Filter out the product with the given productId
    products = products.filter(product => product.productId !== productId);

    // Write updated products data to JSON file
    writeProductsToFile(products);

    res.status(204).send();
}

module.exports = {
    createProduct,
    getProductById,
    getActiveProducts,
    updateProduct,
    deleteProduct
};
