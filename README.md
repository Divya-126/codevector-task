# CodeVector Backend Assignment

## Overview

This project is a backend service built using Node.js, Express.js, and PostgreSQL (Neon).

It allows users to:

- Browse products
- Filter products by category
- Paginate through products efficiently
- Handle large datasets (200,000 products)

The API is designed to provide fast pagination and filtering performance.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Faker.js (for data generation)

---

## Features

### Product Browsing

Retrieve products sorted by newest first.

```http
GET /products
```

### Category Filtering

Filter products by category.

```http
GET /products?category=Books
```

Example categories:

- Electronics
- Books
- Clothing
- Sports
- Home

### Cursor-Based Pagination

Paginate efficiently using a cursor.

```http
GET /products?cursorId=1000
```

This approach avoids the performance issues of OFFSET-based pagination and provides consistent results while browsing.

---

## Database Design

### Products Table

| Column     | Type               |
| ---------- | ------------------ |
| id         | SERIAL PRIMARY KEY |
| name       | TEXT               |
| category   | TEXT               |
| price      | INTEGER            |
| created_at | TIMESTAMP          |
| updated_at | TIMESTAMP          |

---

## Performance Optimizations

### Batch Inserts

Instead of inserting records one by one, products are generated and inserted in batches.

This significantly improves seeding performance for large datasets.

### Indexes

Indexes were added to improve query performance.

```sql
CREATE INDEX idx_products_id
ON products(id DESC);

CREATE INDEX idx_products_category
ON products(category);
```

---

## Data Generation

The database contains approximately 200,000 generated products.

A seed script was created using Faker.js to generate:

- Product Name
- Category
- Price
- Created Time
- Updated Time

---

## Running Locally

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_connection_string
PORT=5000
```

### Start Server

```bash
node server.js
```

Server will run on:

```txt
http://localhost:5000
```

---

## API Examples

### Get Products

```http
GET /products
```

### Get Products By Category

```http
GET /products?category=Books
```

### Get Next Page

```http
GET /products?cursorId=1000
```

### Category + Pagination

```http
GET /products?category=Books&cursorId=1000
```

---

## Deployment

### Live API

https://codevector-task-guk8.onrender.com/products

### GitHub Repository

https://github.com/Divya-126/codevector-task

---

## AI Usage

AI tools were used for:

- Learning cursor pagination concepts
- Debugging deployment issues
- Understanding PostgreSQL optimization strategies

All code was reviewed, tested, and modified manually before submission.

---

## Future Improvements

- Add product search
- Add API validation
- Add caching layer
- Add automated testing
- Add API documentation using Swagger

---

## Author

Divya Dhote
