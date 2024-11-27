# Trezzar - E-commerce Platform

Trezzar is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and TailwindCSS. The platform allows users to browse and purchase products from 13 different categories. The application also features an admin panel for managing products, users, and orders.

## Features

- **User Authentication**: Secure login system with JWT-based authentication.
- **Product Management**: Dynamic product uploads and category-based filtering.
- **Shopping Cart**: Add to cart, manage cart, and checkout features.
- **Order Tracking**: Real-time order tracking to keep users updated on their purchases.
- **Admin Dashboard**: Admins can manage products, users, and track orders in real-time.
- **Admin Access**: Only admins can view all users, products, and orders.

## Folder Structure

- **frontend/**: Contains the frontend code of the application built with React, Vite, and TailwindCSS.
- **backend/**: Contains the backend code built with Node.js, Express.js, and MongoDB.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trezzar.git
```

### 2. Install Dependencies for Frontend

Navigate to the `frontend/` folder and install dependencies:

```bash
cd frontend
npm install
```

### 3. Install Dependencies for Backend

Navigate to the `backend/` folder and install dependencies:

```bash
cd backend
npm install
```

### 4. Run the Project

- For the frontend, run:

```bash
npm run dev
```

- For the backend, run:

```bash
npm start
```

## Admin Panel Access

Only **admins** can access the full features like viewing all users, products, and orders.

To access the **admin panel**, use the following credentials:

- **Email**: testadmin@gmail.com
- **Password**: 1212

Once logged in as an admin, you can access and manage:

- All **users**
- All **products**
- All **orders**

Admins can make changes, monitor orders in real-time, and handle user management directly from the admin panel.

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Razorpay

## Usage

1. Once the backend and frontend servers are running, you can access the application via your browser.
2. Users can register, login, browse products by categories, add products to the cart, and place orders.
3. Admins can use the admin credentials (`testadmin@gmail.com`, `1212`) to access the admin panel for product management, user management, and order tracking.

## Contributing

Feel free to fork the repository, make changes, and submit a pull request if you'd like to contribute.
