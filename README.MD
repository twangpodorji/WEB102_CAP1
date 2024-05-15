# Product Management Server

This project is a simple Node.js server application designed to manage a list of products through HTTP RESTful APIs. It allows for creating, reading, updating, and deleting products, with each product represented as a JSON object in a `products.json` file.

## Features

- **CRUD Operations**: Perform basic CRUD operations on products.
- **HTTP Methods Support**: Supports GET, POST, PUT, PATCH, and DELETE methods.
- **JSON Data Format**: Uses JSON for data exchange between client and server.

## Prerequisites

- Node.js installed on your machine.
- Basic understanding of JavaScript and Node.js.

## Installation

To set up the server locally:

1. Clone the repository or download the project files.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage

Start the server by running: `node server.js`.

The server will start listening on port 3000.

### API Documentation

#### Base URL

All API endpoints are relative to the base URL `http://localhost:3000`.

#### Endpoints

##### GET All Products

- **URL**: `/`
- **Method**: `GET`
- **Response**: A list of all products in JSON format will be displayed.

##### GET Single Product

- **URL**: `/product/:id`
- **Method**: `GET`
- **Parameters**: `:id` - The ID of the product to retrieve.
- **Response**: The requested product in JSON format will be displayed, or a 404 error if not found.

##### POST New Product

- **URL**: `/product`
- **Method**: `POST`
- **Body**: A JSON object representing the new product.
- **Response**: The newly created product in JSON format will be displayed, or a 400 error if invalid data was provided.

##### PUT Update Product

- **URL**: `/product/:id`
- **Method**: `PUT`
- **Parameters**: `:id` - The ID of the product to update.
- **Body**: A JSON object with the updated product details.
- **Response**: The updated product in JSON format will be displayed, or a 404 error if the product does not exist, or a 400 error if invalid data was provided.

##### PATCH Partially Update Product

- **URL**: `/product/:id`
- **Method**: `PATCH`
- **Parameters**: `:id` - The ID of the product to partially update.
- **Body**: A JSON object with the fields to update.
- **Response**: The updated product in JSON format will be displayed, or a 404 error if the product does not exist, or a 400 error if invalid data was provided.

##### DELETE Product

- **URL**: `/product/:id`
- **Method**: `DELETE`
- **Parameters**: `:id` - The ID of the product to delete.
- **Response**: A 204 No Content status if successful, or a 404 error if the product does not exist.

## Contributing

Contributions to this project are welcome. Please feel free to submit pull requests or open issues for discussion.


