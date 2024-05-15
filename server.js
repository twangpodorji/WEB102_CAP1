const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = 'product.json';

// Read product data from the JSON file
function readProductData() {
  try {
    const data = fs.readFileSync(path.join(__dirname, DATA_FILE), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading product data:', err);
    return [];
  }
}

// Write product data to the JSON file
function writeProductData(data) {
  try {
    fs.writeFileSync(path.join(__dirname, DATA_FILE), JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing product data:', err);
  }
}

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // Parse the URL to get the resource ID (if present)
  const [, resourceId] = url.split('/').filter(Boolean);

  // Handle CRUD operations
  switch (method) {
    case 'GET':
      if (resourceId) {
        // Get a specific product by its id 
        const products = readProductData();
        const product = products.find((p) => p.id === resourceId);
        if (product) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(product));
        } else {
          res.statusCode = 404;
          res.end('Product not found');
        }
      } else {
        // Get all products
        const products = readProductData();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
      }
      break;

    case 'POST':
      // Create a new product
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const newProduct = JSON.parse(body);
          const products = readProductData();
          products.push({ id: String(products.length + 1), ...newProduct });
          writeProductData(products);
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(newProduct));
        } catch (err) {
          res.statusCode = 400;
          res.end('Invalid request body');
        }
      });
      break;

    case 'PUT':
      // Update a product
      if (resourceId) {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const updatedProduct = JSON.parse(body);
            const products = readProductData();
            const index = products.findIndex((p) => p.id === resourceId);
            if (index === -1) {
              res.statusCode = 404;
              res.end('Product not found');
            } else {
              products[index] = { id: resourceId, ...updatedProduct };
              writeProductData(products);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(products[index]));
            }
          } catch (err) {
            res.statusCode = 400;
            res.end('Invalid request body');
          }
        });
      } else {
        res.statusCode = 400;
        res.end('Product ID is required');
      }
      break;

    case 'PATCH':
      // updateing  a product
      if (resourceId) {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const updateData = JSON.parse(body);
            const products = readProductData();
            const index = products.findIndex((p) => p.id === resourceId);
            if (index === -1) {
              res.statusCode = 404;
              res.end('Product not found');
            } else {
              products[index] = { ...products[index], ...updateData };
              writeProductData(products);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(products[index]));
            }
          } catch (err) {
            res.statusCode = 400;
            res.end('Invalid request body');
          }
        });
      } else {
        res.statusCode = 400;
        res.end('Product ID is required');
      }
      break;

    case 'DELETE':
      if (resourceId) {
        const products = readProductData();
        const index = products.findIndex((p) => p.id === resourceId);
        if (index === -1) {
          res.statusCode = 404;
          res.end('Product not found');
        } else {
          products.splice(index, 1);
          writeProductData(products);
          res.statusCode = 204;
          res.end();
        }
      } else {
        res.statusCode = 400;
        res.end('Product ID is required');
      }
      break;

    default:
      res.statusCode = 404;
      res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


