// src/utils/jsonHandler.js

const fs = require('fs');
const path = require('path');

// Path to the JSON file storing products data
const productsFilePath = path.join(__dirname, '..', '..', 'data', 'products.json');




// Function to read products data from JSON file
function getProductsFromFile() {
    try {
        const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        // If the file doesn't exist or is empty, return an empty array
        return [];
    }
}

// Function to write products data to JSON file
function writeProductsToFile(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
}

module.exports = {
    getProductsFromFile,
    writeProductsToFile
};
