# MongoDB Database Application

A RESTful API built with Node.js, Express, and MongoDB for managing users, posts, and comments.

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Users API](#users-api)
  - [Posts API](#posts-api)
  - [Comments API](#comments-api)

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string/your_database_name
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will run on `http://localhost:3000` (or your specified PORT).

---

## API Documentation

### Users API

Base URL: `/api/users`

#### 1. Get All Users

**Endpoint:** `GET /api/users`

**Postman Example:**

- Method: `GET`
- URL: `http://localhost:3000/api/users`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "2026-02-04T10:00:00.000Z",
      "updatedAt": "2026-02-04T10:00:00.000Z"
    }
  ]
}
```

---

#### 2. Get Single User by ID

**Endpoint:** `GET /api/users/:id`

**Postman Example:**

- Method: `GET`
- URL: `http://localhost:3000/api/users/507f1f77bcf86cd799439011`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2026-02-04T10:00:00.000Z",
    "updatedAt": "2026-02-04T10:00:00.000Z"
  }
}
```

---

#### 3. Create User

**Endpoint:** `POST /api/users`

**Postman Example:**

- Method: `POST`
- URL: `http://localhost:3000/api/users`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 25
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "createdAt": "2026-02-04T10:00:00.000Z",
    "updatedAt": "2026-02-04T10:00:00.000Z"
  }
}
```

**Validation Rules:**

- `name`: Required, 2-50 characters
- `email`: Required, unique, valid email format
- `age`: Optional, 0-150

---

#### 4. Update User

**Endpoint:** `PUT /api/users/:id`

**Postman Example:**

- Method: `PUT`
- URL: `http://localhost:3000/api/users/507f1f77bcf86cd799439011`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "age": 31
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 31,
    "createdAt": "2026-02-04T10:00:00.000Z",
    "updatedAt": "2026-02-04T11:00:00.000Z"
  }
}
```

---

#### 5. Delete User

**Endpoint:** `DELETE /api/users/:id`

**Postman Example:**

- Method: `DELETE`
- URL: `http://localhost:3000/api/users/507f1f77bcf86cd799439011`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
}
```

---

### Posts API

Base URL: `/api/posts`

#### 1. Get All Posts (with Query Filters)

**Endpoint:** `GET /api/posts`

**Postman Examples:**

**Basic Request:**

- Method: `GET`
- URL: `http://localhost:3000/api/posts`

**Filter by Category:**

- URL: `http://localhost:3000/api/posts?category=technology`

**Filter by Author:**

- URL: `http://localhost:3000/api/posts?author=john`

**Filter by Published Status:**

- URL: `http://localhost:3000/api/posts?published=true`

**Filter by Tag:**

- URL: `http://localhost:3000/api/posts?tag=javascript`

**Search in Title/Content:**

- URL: `http://localhost:3000/api/posts?search=mongodb`

**Sort by Views (Descending):**

- URL: `http://localhost:3000/api/posts?sortBy=views&order=desc`

**Sort by Title (Ascending):**

- URL: `http://localhost:3000/api/posts?sortBy=title&order=asc`

**Combined Filters:**

- URL: `http://localhost:3000/api/posts?category=technology&published=true&sortBy=views&order=desc`

**Response:**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Getting Started with MongoDB",
      "content": "MongoDB is a NoSQL database...",
      "author": "John Doe",
      "category": "technology",
      "tags": ["mongodb", "database", "javascript"],
      "isPublished": true,
      "views": 150,
      "createdAt": "2026-02-04T10:00:00.000Z",
      "updatedAt": "2026-02-04T10:00:00.000Z"
    }
  ]
}
```

---

#### 2. Get Single Post by ID

**Endpoint:** `GET /api/posts/:id`

**Postman Example:**

- Method: `GET`
- URL: `http://localhost:3000/api/posts/507f1f77bcf86cd799439013`
- Headers: None required

**Note:** This endpoint automatically increments the view count.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Getting Started with MongoDB",
    "content": "MongoDB is a NoSQL database...",
    "author": "John Doe",
    "category": "technology",
    "tags": ["mongodb", "database", "javascript"],
    "isPublished": true,
    "views": 151,
    "createdAt": "2026-02-04T10:00:00.000Z",
    "updatedAt": "2026-02-04T10:00:00.000Z"
  }
}
```

---

#### 3. Create Post

**Endpoint:** `POST /api/posts`

**Postman Example:**

- Method: `POST`
- URL: `http://localhost:3000/api/posts`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "title": "Introduction to Express.js",
  "content": "Express is a minimal and flexible Node.js web application framework...",
  "author": "Jane Smith",
  "category": "technology",
  "tags": ["express", "nodejs", "javascript"],
  "isPublished": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Introduction to Express.js",
    "content": "Express is a minimal and flexible Node.js web application framework...",
    "author": "Jane Smith",
    "category": "technology",
    "tags": ["express", "nodejs", "javascript"],
    "isPublished": true,
    "views": 0,
    "createdAt": "2026-02-04T11:00:00.000Z",
    "updatedAt": "2026-02-04T11:00:00.000Z"
  }
}
```

**Field Options:**

- `category`: `technology`, `lifestyle`, `education`, `entertainment`, `general`
- `isPublished`: `true` or `false` (default: `true`)
- `views`: Automatically set to `0`

---

#### 4. Update Post (Partial Update)

**Endpoint:** `PATCH /api/posts/:id`

**Postman Example:**

- Method: `PATCH`
- URL: `http://localhost:3000/api/posts/507f1f77bcf86cd799439013`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "title": "Updated Title: Getting Started with MongoDB",
  "isPublished": false
}
```

**Note:** You can update only the fields you want to change.

**Response:**

```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Updated Title: Getting Started with MongoDB",
    "content": "MongoDB is a NoSQL database...",
    "author": "John Doe",
    "category": "technology",
    "tags": ["mongodb", "database", "javascript"],
    "isPublished": false,
    "views": 151,
    "createdAt": "2026-02-04T10:00:00.000Z",
    "updatedAt": "2026-02-04T12:00:00.000Z"
  }
}
```

---

#### 5. Delete Post

**Endpoint:** `DELETE /api/posts/:id`

**Postman Example:**

- Method: `DELETE`
- URL: `http://localhost:3000/api/posts/507f1f77bcf86cd799439013`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "title": "Updated Title: Getting Started with MongoDB",
    "author": "John Doe"
  }
}
```

---

### Comments API

Base URL: `/api/comments`

#### 1. Get All Comments

**Endpoint:** `GET /api/comments`

**Postman Example:**

- Method: `GET`
- URL: `http://localhost:3000/api/comments`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "text": "Great article!",
      "postId": "507f1f77bcf86cd799439013",
      "author": "Alice Johnson",
      "createdAt": "2026-02-04T10:30:00.000Z",
      "updatedAt": "2026-02-04T10:30:00.000Z"
    }
  ]
}
```

---

#### 2. Get Comments for Specific Post

**Endpoint:** `GET /api/comments/post/:postId`

**Postman Example:**

- Method: `GET`
- URL: `http://localhost:3000/api/comments/post/507f1f77bcf86cd799439013`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "text": "Great article!",
      "postId": "507f1f77bcf86cd799439013",
      "author": "Alice Johnson",
      "createdAt": "2026-02-04T10:30:00.000Z",
      "updatedAt": "2026-02-04T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439016",
      "text": "Very informative, thanks!",
      "postId": "507f1f77bcf86cd799439013",
      "author": "Bob Williams",
      "createdAt": "2026-02-04T11:00:00.000Z",
      "updatedAt": "2026-02-04T11:00:00.000Z"
    }
  ]
}
```

---

#### 3. Create Comment

**Endpoint:** `POST /api/comments`

**Postman Example:**

- Method: `POST`
- URL: `http://localhost:3000/api/comments`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "text": "This is a very helpful post!",
  "postId": "507f1f77bcf86cd799439013",
  "author": "Charlie Brown"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "text": "This is a very helpful post!",
    "postId": "507f1f77bcf86cd799439013",
    "author": "Charlie Brown",
    "createdAt": "2026-02-04T12:00:00.000Z",
    "updatedAt": "2026-02-04T12:00:00.000Z"
  }
}
```

---

#### 4. Update Comment

**Endpoint:** `PATCH /api/comments/:id`

**Postman Example:**

- Method: `PATCH`
- URL: `http://localhost:3000/api/comments/507f1f77bcf86cd799439015`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "text": "Updated comment: Excellent article!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Comment updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "text": "Updated comment: Excellent article!",
    "postId": "507f1f77bcf86cd799439013",
    "author": "Alice Johnson",
    "createdAt": "2026-02-04T10:30:00.000Z",
    "updatedAt": "2026-02-04T13:00:00.000Z"
  }
}
```

---

#### 5. Delete Comment

**Endpoint:** `DELETE /api/comments/:id`

**Postman Example:**

- Method: `DELETE`
- URL: `http://localhost:3000/api/comments/507f1f77bcf86cd799439015`
- Headers: None required

**Response:**

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Name is required", "Email must be valid"]
}
```

**404 Not Found:**

```json
{
  "success": false,
  "error": "User not found"
}
```

**500 Internal Server Error:**

```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Database Indexes

The application uses the following indexes for optimized queries:

### User Schema

- CreatedAt (descending)

### Post Schema

- Category
- CreatedAt (descending)
- Author

### Comment Schema

- PostId

---

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management

---
